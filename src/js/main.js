var irep = angular.module('irep', ['720kb.socialshare']);

irep.controller('irepCtrl', function($scope, Socialshare){
	var extra_canvas;

	$('.image-editor').cropit({
		onImageLoading: function() {
			$scope.imageLoading = true;
			$scope.$apply();
		},
		onImageLoaded: function() {
			$scope.imageLoaded = true;
			$scope.imageLoading = false;
			$scope.shareMedia = true;
			$scope.$apply();
		}
	});

	var saveImage = function(callback) {
		var w = $('.photo-container').width() * 1,
			h =  $('.photo-container').height() * 1;

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
				saveAs(blob, "irep-this.jpg");
			});
		});
	};

	$scope.fbShare = function() {
		saveImage(function() {
			var imgData = extra_canvas.toDataURL("image/jpeg");
			Socialshare.share({
				'provider': 'facebook',
				'attrs': {
					'socialshareUrl': window.location.href,
					'socialshareText': "I Represent This"
				}
			});
		});
	};
	$scope.twitterShare = function() {
		saveImage(function() {
			var imgData = extra_canvas.toDataURL('image/jpeg');
			Socialshare.share({
				'provider': 'twitter',
				'attrs': {
					'socialshareUrl': window.location.href,
					'socialshareText': "I Represent This"
				}
			});
		});
	};
	$scope.whatsappShare = function() {
		saveImage(function() {
			var imgData = extra_canvas.toDataURL('image/jpeg');
			Socialshare.share({
				'provider': 'whatsapp',
				'attrs': {
					'socialshareUrl': window.location.href,
					'socialshareText': "I Represent This"
				}
			});
		});
	};
	

});
