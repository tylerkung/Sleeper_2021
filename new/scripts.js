var football_vid = 'https://www.youtube.com/embed/vcpV7IwNp_8';
var basketball_vid = 'https://www.youtube.com/embed/e5vFZCGBXUY';
var lcs_vid = 'https://www.youtube.com/embed/xu_iQr3dhTk';

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
	console.log($(this).attr('id'));
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

var controller = new ScrollMagic.Controller({});
$('video').each(function(){
	var currentVideo = this;
	new ScrollMagic.Scene({triggerElement: currentVideo})
		.on("enter", function(e){
			$(currentVideo)[0].play();
		})
		// .addIndicators()
		.addTo(controller);
})
new ScrollMagic.Scene({triggerElement: '.chat-ui'})
	.setClassToggle('.chat', 'animate')
	// .addIndicators()
	.addTo(controller);
