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
			$scope.$apply();
		}
	});

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1241728932608031',
			xfbml      : true,
			version    : 'v2.8'
		});
		FB.AppEvents.logPageView();
	};
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));



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
			var imgData = extra_canvas.toDataURL('image/jpeg');
			Socialshare.share({
				'provider': 'facebook',
				'attrs': {
					// 'socialshareUrl': 'http://colourboxsolutions.com',
					'socialshareMedia': '../img/melcom_logo.png'
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
					'socialshareText': '../img/melcom_logo.png'
				}
			});
		});
	};

	// $("#share").jsSocials({
	// 	shares: ["facebook", "twitter", "whatsapp"]
	// });
	
	
});
