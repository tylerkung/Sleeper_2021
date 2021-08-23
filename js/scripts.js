var football_vid = 'https://www.youtube.com/embed/vcpV7IwNp_8';
var basketball_vid = 'https://www.youtube.com/embed/e5vFZCGBXUY';
var lcs_vid = 'https://www.youtube.com/embed/xu_iQr3dhTk';
var viewport;
var vidWidth = 700;
var vidHeight = 400;
var video = document.getElementById('NFL-video');
// var canvas = document.getElementById('exampleCanvas');
// var ctx = canvas.getContext('2d');
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

$(document).ready(function(){
	$('video').each(function(){
		$(this)[0].load();
	});
})

$('.nav-item i').click(function(e){
	e.preventDefault();
	$(this).parents('.has-children').toggleClass('active');
});
$('.mobile-menu-btn').click(function(e){
	$(this).toggleClass('open');
	$('.nav').toggleClass('active');
	$('body').toggleClass('lock-scroll');
});

$('.video-thumbnail').click(function(e){
	var id = $(this).attr('id');
	var currentVid;
	if (id === 'football-tutorial') currentVid = football_vid;
	else if (id === 'basketball-tutorial') currentVid = basketball_vid;
	else if (id === 'lcs-tutorial') currentVid = lcs_vid;

	$('#yt-player').html('<iframe width="1920" height="1080" src="' + currentVid + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="LCS Video"></iframe>');
	$('.tutorial-video').addClass('active');
});
$('.video-bg').click(function(e){
	$('.tutorial-video').removeClass('active');
	$('#yt-player').html('');
})

$('.video-item').click(function(e){
	var yt_link = $(this).attr('aria-video');
	$('#yt-player').html('<iframe width="1920" height="1080" src="' + yt_link + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Sleeper Fantasy"></iframe>');
	$('.tutorial-video').addClass('active');
});

var controller = new ScrollMagic.Controller({});
// $('video').each(function(){
// 	var currentVideo = this;
// 	new ScrollMagic.Scene({triggerElement: currentVideo})
// 		.on("enter", function(e){
// 			$(currentVideo)[0].play();
// 		})
// 		// .addIndicators()
// 		.addTo(controller);
// })

controller.scrollTo(function (newpos){
	TweenMax.to($(window), 0.5, {scrollTo: {y: newpos, offsetY:264}});
});

// controller.scrollFluid(function(ele){
// 	TweenMax.to(ele, 0.5, {scrollTo: {x: 500}});
// })

$('a.anchor').each(function(){
	var currentAnchor = this;
	new ScrollMagic.Scene({
		triggerElement: currentAnchor,
		reverse: true,
		triggerHook: 0,
		offset: -266,
		duration: 40})
		.on("enter", function(e){
			var thisId = $(currentAnchor).attr('id');
			$('.header-anchors a.active').removeClass('active');
			$('.header-anchors a[href="#' + thisId + '"]').addClass('active');
		})
		// .addIndicators()
		.addTo(controller);
});

new ScrollMagic.Scene({triggerElement: '.chat-ui'})
	.setClassToggle('.chat', 'animate')
	// .addIndicators()
	.addTo(controller);

new ScrollMagic.Scene({
	triggerElement: '.page-header-wrapper',
	triggerHook: 0
})
	.setClassToggle('.page-header', 'sticky')
	// .addIndicators()
	.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: '.page-header-wrapper',
		triggerHook: 0
	})
		.setClassToggle('.main', 'sticky-nav')
		.addTo(controller);

$(window).on('load', function(){
	// if(!$('.hermes').length) initSlides();
	if($('.slideshow'.length)){
		if($('.hermes').length) initHermes();
		else if($('.poseidon').length) initPoseidon();
		else initSlides();
	}
	if($('.preview-slideshow').length) initApollo();
});

$(window).resize(function(){
	if(!$('.hermes').length) sizeSlides();
});

function initSlides(){
	console.log('init');
	sizeSlides();
	$('.slideshow-content').attr({'aria-count': 4, 'aria-current': 1});
	var lastClone = $('.slide.last').clone().removeClass('last');
	var firstClone = $('.slide.first').clone().removeClass('first');
	$(lastClone).insertBefore('.slide.first');
	$(firstClone).insertAfter('.slide.last');
	$('.slideshow-content').css('transform', 'translateX(' + (-viewport) + 'px' + ')');
}

function sizeSlides(){
	viewport = parseInt($('.slideshow').css('width'),10);
	// console.log(viewport);
	// if (viewport === 0){
	// 	setTimeout(function(){
	// 		viewport = parseInt($('.slideshow').css('width'),10);
	// 	}, 1000)
	// }
	var currentSlide = parseInt($('.slideshow-content').attr('aria-current'),10);
	$('.slideshow-content').css({'width': viewport*6, 'transform': 'translateX(' + (-viewport * currentSlide) + 'px' + ')'});
	$('.slide').each(function(){
		$(this).css('width', viewport);
	})
}

// $('.next').click(slideNext);
// $('.prev').click(slidePrev);
// $('.slideshow.poseidon .page').click(selectSlide);
function slideNext(){
	sizeSlides();
	var current = parseInt($('.slideshow-content').attr('aria-current'), 10);
	var max = parseInt($('.slideshow-content').attr('aria-count'),10);
	var curTransform;
	var matrix = $('.slideshow-content').css('transform');
	var values = matrix.split('(')[1].match(/-?[\d\.]+/g);
	curTransform = parseInt(values[4],10);
	$('.slideshow-content').removeClass('no-anim');
	$('.slideshow').addClass('lock');
	$('.slideshow-content').css('transform', 'translateX(' + (curTransform - viewport) + 'px' + ')');
	current++;
	$('.slideshow-content').attr('aria-current', current);
	// console.log(current++)
	setTimeout(function(){
		$('.slideshow-content').addClass('no-anim');
		$('.slideshow').removeClass('lock');
	}, 400)
	if (max < current){
		setTimeout(function(){
			$('.slideshow-content').css('transform', 'translateX(' + (-viewport) + 'px' + ')');
			$('.slideshow-content').attr('aria-current', 1);
		}, 401)
	}
	var currentPage = $('.slideshow .pagination .active');
	var next = $(currentPage).next();
	if (!next.length) next = $('.slideshow .page-1');
	$(currentPage).removeClass('active');
	$(next).addClass('active');
}

function slidePrev(){
	sizeSlides();
	var current = parseInt($('.slideshow-content').attr('aria-current'), 10);
	var max = parseInt($('.slideshow-content').attr('aria-count'),10);
	var curTransform;
	var matrix = $('.slideshow-content').css('transform');
	var values = matrix.split('(')[1].match(/-?[\d\.]+/g);
	curTransform = parseInt(values[4],10);
	$('.slideshow-content').removeClass('no-anim');
	$('.slideshow').addClass('lock');
	$('.slideshow-content').css('transform', 'translateX(' + (curTransform + viewport) + 'px' + ')');
	current--;
	$('.slideshow-content').attr('aria-current', current);
	setTimeout(function(){
		$('.slideshow-content').addClass('no-anim');
		$('.slideshow').removeClass('lock');
	}, 400)
	if (0 === current){
		setTimeout(function(){
			$('.slideshow-content').css('transform', 'translateX(' + (-viewport * 4) + 'px' + ')');
			$('.slideshow-content').attr('aria-current', 4);
		}, 401)
	}

	var currentPage = $('.pagination .active');
	var prev = $(currentPage).prev();
	if (!prev.length) prev = $('.pagination div').siblings(':last').next();
	$(currentPage).removeClass('active');
	$(prev).addClass('active');
}

function selectSlide(){
	var newId = $(this).attr('aria-id');
	var activeId = $('.pagination .page.active').attr('aria-id');
	console.log(newId + ' ' + activeId);

	if (newId > activeId){
		var i = 0;
		var intervalID = setInterval(function(){
			slideNext();
			if (++i === newId - activeId){
				window.clearInterval(intervalID);
			}
		}, 401);
		// for (let i = 0; i < newId - activeId; i++){
		// 	setTimeout(function(){
		// 		slideNext();
		// 	}, 400);
		// }
	} //swipe right x-difference times
	else if (activeId < newId){} //swipe left y times
	else return;
}

function initPoseidon(){
	initSlides();
	var timer = setInterval(function(){
		slideNext();
	}, 6000);

	$('.poseidon .pagination .page').click(function(){
		var selectedPage = $(this).attr('aria-id')
		console.log(selectedPage);
		$('.poseidon .pagination .page.active').removeClass('active');
		$('.poseidon .pagination .page.page-' + selectedPage).addClass('active');
		clearInterval(timer);
		timer = setInterval(function(){
			slideNext();
		}, 6000);

		var current = parseInt($('.poseidon .slideshow-content').attr('aria-current'), 10);
		var max = parseInt($('.poseidon .slideshow-content').attr('aria-count'),10);
		var curTransform;
		var matrix = $('.poseidon .slideshow-content').css('transform');
		var values = matrix.split('(')[1].match(/-?[\d\.]+/g);
		console.log(viewport);
		curTransform = parseInt(values[4],10);
		console.log(curTransform);

		$('.poseidon .slideshow-content').removeClass('no-anim');
		$('.poseidon .slideshow').addClass('lock');
		$('.poseidon .slideshow-content').css('transform', 'translateX(' + (selectedPage * (-1 * viewport)) + 'px' + ')');
		$('.slideshow-content').attr('aria-current', selectedPage);
		// console.log(current++)
		setTimeout(function(){
			$('.slideshow-content').addClass('no-anim');
			$('.slideshow').removeClass('lock');
		}, 400);
	});
}

function initHermes(){
	setInterval(cycleSlides, 6000);
	// console.log(video);
	var bg = $('.hermes');
	if (!isMac) setVideoBgColor(video, bg);
	// canvas.width = 700;
	// canvas.height = 400;
	// canvas.style.width = "700px";
	// canvas.style.height = "400px";
	// ctx.drawImage(video, 0, 0, 700, 400, 0, 0, 700, 400);

	// drawingLoop();
}

function initApollo(){
	setInterval(cyclePSlides, 4000);
}

function cycleSlides(){
	var currentPage = $('.pagination .active');
	var next = $(currentPage).next();
	if (!next.length) next = $('.page-1');
	$(currentPage).removeClass('active');
	$(next).addClass('active');

	var currentSlide = $('.slide.active');
	var nextS = $(currentSlide).next();
	if (!nextS.length) nextS = $('.slide.first');
	$(currentSlide).removeClass('active');
	$(nextS).addClass('active');
	// currentSlide = nextS;
}

function cyclePSlides(){
	var currentPage = $('.preview-slideshow .pagination .active');
	var next = $(currentPage).next();
	if (!next.length) next = $('.preview-slideshow .page-1');
	$(currentPage).removeClass('active');
	$(next).addClass('active');

	var currentSlide = $('.preview-slideshow .p-slide.active');
	var nextS = $(currentSlide).next();
	if (!nextS.length) nextS = $('.preview-slideshow .p-slide.first');
	$(currentSlide).removeClass('active');
	$(nextS).addClass('active');
	// currentSlide = nextS;
}

$('.header-anchors a').click(function(e){
	e.preventDefault();
	var ele = $(this).attr('href');
	var elePos = $('a' + ele).offset().top;
	// $(window).scrollTop(elePos);
	controller.scrollTo('a' + ele);
	// console.log()
})

$('.fluid-container .next').click(function(){
	var container = $(this).parents('.fluid-container').children('.row');
	var curPos = container.scrollLeft();
	TweenMax.to(container, 0.4, {scrollTo: {x: curPos + $(window).width() / 3}});
	// controller.scrollFluid(container);
})
$('.fluid-container .prev').click(function(){
	var container = $(this).parents('.fluid-container').children('.row');
	var curPos = container.scrollLeft();
	TweenMax.to(container, 0.4, {scrollTo: {x: curPos - $(window).width() / 3}});
	// controller.scrollFluid(container);
})

function drawingLoop() {
    requestId = window.requestAnimationFrame(drawingLoop)
    ctx.drawImage(video, 0, 0, vidWidth, vidHeight, 0, 0, canvas.width, canvas.height);
		video.remove();
}

function setVideoBgColor(vid, backgroundElement) {
    // draw first four pixel of video to a canvas
    // then get pixel color from that canvas
    var newCanvas = document.createElement("canvas");
		console.log(vid);
    newCanvas.width = 8;
    newCanvas.height = 8;

    var ctx = newCanvas.getContext("2d");
    ctx.drawImage(vid, 0, 0, 8, 8);

    var p = ctx.getImageData(0, 0, 8, 8).data;
		console.log(p);
    //dont take the first but fourth pixel [r g b a]
    backgroundElement.css('backgroundColor', "rgb(" + p[60] + "," + p[61] + "," + p[62] + ")");
}
