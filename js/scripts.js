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
});

var controller = new ScrollMagic.Controller({});
$('video').each(function(){
	var currentVideo = this;
	console.log(currentVideo);
	new ScrollMagic.Scene({triggerElement: currentVideo})
		.on("enter", function(e){
			console.log("play");
			$(currentVideo)[0].play();
		})
		// .addIndicators()
		.addTo(controller);
})
new ScrollMagic.Scene({triggerElement: '.chat-ui'})
	.setClassToggle('.chat', 'animate')
	// .addIndicators()
	.addTo(controller);
