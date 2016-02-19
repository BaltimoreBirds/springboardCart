var sbCart = (function($){
	'use strict';

	//Private Vars
	var products = { thing: 'nerd!'},
			validProducts = [], 
			currentPrice = 0, 
			theCart = $('#springboardCartWrap'),
			defaults = {
				minHeight: 30,
				bgColor: '#9d1b31',
				txtColor: 'white',
				secondaryColor: '#d8d8d8',
			};	

	//Private functions
	var _updateCartView = function(){
		//Clear cart 		
		$('#productDisplay .innerWrap').innerHTML = "";
		//iterate through products, and display them
		Object.keys(products).forEach(function(key){
			var productName = products[key].product,
					price = products[key].price,
					quant = products[key].quantity;

		$('#productDisplay .innerWrap').append('<div class="displayRow"><div class="span7">'+productName+'</div><div class="span2">Qty. '+quant+'</div><div class="span3">$'+quant*price+'</div></div>');
		});
	};			

	//public API 
	//------ Thought about returning stuff like...total price! Or ... Products in cart! 
	// Then the developer using your module could output that ish in his or her own timely fashion you clown.
	return {
		//Initialize the springboardCart
		shop: function(options){

			//merge user options with the defaults.
			var userOptions = $.extend(true, {}, defaults, options);

			//Affix shopping Cart bar. HTML in cart.html
			$('body').prepend('<div id="springboardCartWrap" class="affixed"><div class="bar"><div class="cartRow"><div id="logoBlock" class="span2"><p>BRAND</p></div><div id="cartDropdown" class="span3"><p><img id"cartImg" src=""/><span>Shopping Cart&#9660;</span></p></div></div></div><div id="productDisplay" class="cartRow"><div class="innerWrap"></div></div></div>');

			//Style it
			$('#springboardCartWrap #productDisplay').hide();		
			$('#springboardCartWrap .bar').css('color', userOptions.txtColor);
			$('#springboardCartWrap .bar').css('background-color', userOptions.bgColor);
			$('#springboardCartWrap .bar').css('min-height', userOptions.minHeight);
			$('#springboardCartWrap .innerWrap').css('background-color',userOptions.secondaryColor);
			$('#springboardCartWrap .innerWrap').css('border','15px solid '+userOptions.bgColor);

			//Call view updater function
			this.updateCartView();
		},

		//Add a product to the Cart
		add: function(productName, quant, productPrice){

			//Check it's a valid product name, return error if it isn't
			if( validProducts.indexOf(productName) < 0 ){
				//return error
			}

			//If product is in cart
			if(productName in products){
				//increase quantity by one
				products[productName].quantity += quant;

			}else{
				//Add to products
				products[productName].product = productName;
				products[productName].quantity = quant;
				products[productName].price = productPrice;
			}


		},
		updateCartView: function(){
			_updateCartView();
		}
	};
})(jQuery);
