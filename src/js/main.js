var irep = angular.module('irep', []);

irep.controller('irepCtrl', function($scope){
	$('.image-editor').cropit({
		onImageLoading: function() {
			$scope.imageLoading = true;
			$scope.$apply();
		},
		onImageLoaded: function() {
			$scope.uploaded = true;
			$scope.imageLoading = false;
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

	$scope.saveImage = function() {
		var w = $('.photo-container').width() * 3,
			h =  $('.photo-container').height() * 3;

		$('.cropit-preview-image-container').css('overflow', 'visible');
		html2canvas($(".photo-container"), {
			allowTaint: true,
			onrendered: function(canvas) {
				$('.cropit-preview-image-container').css('overflow', 'hidden');
				var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width', w);
                extra_canvas.setAttribute('height', h);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,w,h);
				extra_canvas.toBlob(function(blob) {
					saveAs(blob, "gh@60-melcom.jpg");
				});
			}
		});
	};

	// $("#share").jsSocials({
	// 	shares: ["facebook", "twitter", "whatsapp"]
	// });
	
	
});
