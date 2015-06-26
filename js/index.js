//// carga webshim, sobreescritura de track y video
webshims.setOptions('mediaelement', {
    replaceUI: 'auto'
});
webshims.setOptions('track', {
    override: 'auto'
});
webshims.polyfill('mediaelement track');

var miniaturas,
    vis = document.getElementById('video1');

//// pulsa play, se muestra video y presentación
$(function() {
	$('#play').on('click', function() {
		$(this).fadeOut('fast', function() {
			$('#panconaceite').removeClass('invisible');
		});
	});


	/// añade elemento track al vídeo
	var track = $('video').addTextTrack('subtitles', 'marcas', 'es');
	/// modo de las marcas /showing/hidden) visible/invisible sobre el vídeo
	track.mode = 'hidden';

	/// Se añaden marcas de tiempo
	track.addCue(new VTTCue(0, 5, "0"));
	track.addCue(new VTTCue(5, 10, "1"));
	track.addCue(new VTTCue(10, 15, "2"));
	track.addCue(new VTTCue(15, 20, "3"));
	track.addCue(new VTTCue(20, 30, "4"));
	track.addCue(new VTTCue(30, 60, "5"));
	track.addCue(new VTTCue(60, 70, "6"));
	track.addCue(new VTTCue(70, 256, "7"));

	/// evento que detecta que el cue cambia
	$(track).on('cuechange', function () {
		var cue = $.prop(this, 'activeCues'); 
		if (cue && cue.length && (cue = cue[0])) {
			var obj = JSON.parse(cue.text);
			$('.presentacion img.visible').removeClass('visible');
			var ladi = $('.presentacion img').get(obj);
			$(ladi).addClass('visible');
			var mini = 1 + obj;
			miniaturas.goToSlide(mini);
		}
	});


	/// Construcción slider miniaturas diapositivas
	miniaturas = $("#miniaturas").lightSlider({
		item: 2,
		loop:true,
		keyPress:true,
		pager: false
	});	


	/// Si se pulsa una miniatura se meuve video
	$('#miniaturas img').on('click', function(e) {
		e.preventDefault();
		var mueve = $(this).data('segundo');
		vis.currentTime = mueve;
	});

}); /// fin function
