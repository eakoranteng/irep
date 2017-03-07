var irep = angular.module('irep', []);

irep.controller('irepCtrl', function($scope){
	$(function() {
		$('.image-editor').cropit({
			exportZoom: 1,
			imageBackground: false
		});
		$('.update').click(function() {
		  	$('.cropit-image-input').click();
		});
		$('.rotate-cw').click(function() {
			$('.image-editor').cropit('rotateCW');
		});
		$('.rotate-ccw').click(function() {
			$('.image-editor').cropit('rotateCCW');
		});
	});

	$scope.saveImage = function() {
		html2canvas($(".photo-container"), {
			onrendered: function(canvas) {
		        var image = canvas.toDataURL("image/jpeg");
		        window.open(image);
	    	},
	    	allowTaint: true,
	    	logging: true
		});
	};

	// $("#share").jsSocials({
 //        shares: ["facebook", "twitter", "whatsapp"]
 //    });
	
	
});
