var irep = angular.module('irep', []);

irep.controller('irepCtrl', function($scope){
	$('.image-editor').cropit({
		exportZoom: 2,
		imageBackground: false,
		onImageLoaded: function() {
			$scope.uploaded = true;
			$scope.$apply();
		}
	});

	$scope.rotateCW = function() {
		$('.image-editor').cropit('rotateCW');
	};
	$scope.rotateCCW = function() {
		$('.image-editor').cropit('rotateCCW');
	};

	$scope.updateImage = function() {
		$('.cropit-image-input').click();
	};

	// $(function() {
	// 	$('.image-editor').cropit({
	// 		exportZoom: 1,
	// 		imageBackground: false
	// 	});
	// 	$('.update').click(function() {
	// 	  	$('.cropit-image-input').click();
	// 	});
	// 	$('.rotate-cw').click(function() {
	// 		$('.image-editor').cropit('rotateCW');
	// 	});
	// 	$('.rotate-ccw').click(function() {
	// 		$('.image-editor').cropit('rotateCCW');
	// 	});
	// });

	$scope.saveImage = function() {
		html2canvas($(".photo-container"), {
			allowTaint: true,
			logging: true,
			useCORS: true,
			proxy: "",
			onrendered: function(canvas) {
				// console.log(canvas);
		        var image = canvas.toDataURL("image/jpeg");
		  //       console.log(image);
		        window.open(image);
		        // Canvas2Image.saveAsJPEG(canvas);
		    }
		});
	};

	// $("#share").jsSocials({
	// 	shares: ["facebook", "twitter", "whatsapp"]
	// });
	
	
});
