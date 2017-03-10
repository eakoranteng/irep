var irep = angular.module('irep', []);

irep.controller('irepCtrl', function($scope){
	var extra_canvas;

	$('.image-editor').cropit({
		onImageLoading: function() {
			$scope.imageLoading = true;
			$scope.$apply();
		},
		onImageLoaded: function() {
			$scope.imageLoaded = true;
			$scope.imageLoading = false;
			$scope.$apply();
		}
	});

	var saveImage = function(callback) {
		var w = $('.photo-container').width() * 3,
		h =  $('.photo-container').height() * 3;

		$('.cropit-preview-image-container').css('overflow', 'visible');
		html2canvas($(".photo-container"), {
			allowTaint: true,
			onrendered: function(canvas) {
				$('.cropit-preview-image-container').css('overflow', 'hidden');

				extra_canvas = document.createElement("canvas");
				extra_canvas.setAttribute('width', w);
				extra_canvas.setAttribute('height', h);
				var ctx = extra_canvas.getContext('2d');
				ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,w,h);

				// do something with image - extra_canvas
				callback();
			}
		});
	};

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
		saveImage(function() {
			extra_canvas.toBlob(function(blob) {
				saveAs(blob, "gh@60-melcom.jpg");
			});
		});
	};

	$scope.fbShare = function() {
		saveImage(function() {
			var img = extra_canvas.toDataURL("image/jpeg");
			title = "I celebrate Ghana's 60th anniversary with Melcom. http://melcomgroup.com";
			window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(img)+'&t='+encodeURIComponent(title),'sharer','toolbar=0,status=0,width=626,height=436');return false;
		});
	};

	// $("#share").jsSocials({
	// 	shares: ["facebook", "twitter", "whatsapp"]
	// });
	
	
});
