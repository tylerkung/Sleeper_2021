$(document).ready(function(){
	$('video').each(function(){
		$(this)[0].load();
	});
})
$('.primary-nav').click(function(e){
	console.log(e.target.className);
	if(e.target.className !== 'nav-item has-children'){
		$(this).toggleClass('active');
	}
});

var controller = new ScrollMagic.Controller({});
$('video').each(function(){
	var currentVideo = this;
	console.log(currentVideo);
	new ScrollMagic.Scene({triggerElement: this})
		.on("enter", function(e){
			console.log("play");
			$(currentVideo)[0].play();
		})
		// .addIndicators()
		.addTo(controller);

})
