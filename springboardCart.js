/*!
 * springboardCart - jQuery Plugin
 * version: 1.0.0 (Fri, 14 Jun 2013)
 *
 * License: MIT License
 *
 * Copyright 2016 Michael Swanson - swansonmr12@gmail.com
 *
 */

;var SbCart = (function($){
	'use strict';

	//Private Vars
	var products = {},
			// validProducts = [], 
			currentPrice = 0, 
			cartWrap,
			error = {
				message: " ",
			},
			defaults = {
				shopping: false,
				usingDefaultCart: false,
				minHeight: 30,
				bgColor: '#9d1b31',
				txtColor: 'white',
				secondaryColor: '#d8d8d8',
				cartImgUrl: 'https://artic.gospringboard.com/files/artic/empty-cart-light-small.png',
			};	

	//Private functions
	var _updateCartView = function(){
		
		//Clear cart innerWrap html 		
		$('#productDisplay .innerWrap')[0].innerHTML = " ";

		//iterate through products, and display them
		Object.keys(products).forEach(function(key){
			var productName = products[key].product,
					price = products[key].price,
					quant = products[key].quantity;

			$('#productDisplay .innerWrap').append('<div class="cartRow borderBottom"><div class="span5">'+productName+'</div><div class="span2">Qty. '+quant+'</div><div class="span3 txtRight">$'+quant*price+'</div></div>');
		});

		//Build a 'total' row
		var total = _total().toString();
		$('#productDisplay .innerWrap').append('<div class="cartRow"><div class="span7">Total: </div><div class="span3 txtRight">$'+total+'</div></div>');
	};

	//return total price
	var _total = function(){
		var total = 0;
		Object.keys(products).forEach(function(key){
			total += (products[key].quantity * products[key].price);
		});
		return total;
	};		

	//return products in cart
	var _products = function(){
		var productArray = [];
		Object.keys(products).forEach(function(key){
			if(products.hasOwnProperty(key)){
					productArray.push(key);
			}
		});
		return productArray;
	}

	//show and hide our Default cart
	var _cartToggle = function(){
		$('#productDisplay').slideToggle();
	}

	//Output help
	var _debug = function(){
		console.log("Defaults", defaults)
	}

	//Public API 
	return {

		//Initialize with or without the default frame (#springboardCartWrap)
		shop: function(options){

			//Only run method if it hasn't been initialized
			if(defaults.shopping){
				return;
			}
			defaults.shopping = true;

			//merge user options with the defaults.
			var userOptions = $.extend(true, {}, defaults, options);
			defaults.usingDefaultCart = userOptions.usingDefaultCart;

			if(userOptions.usingDefaultCart){

				//Affix shopping Cart bar. HTML in cart.html
				$('body').prepend('<div id="springboardCartWrap" class="affixed"><div class="bar"><div class="cartRow"><div id="logoBlock" class="span2"><p>BRAND</p></div><a class="clickable" href="#"><div id="cartDropdown" class="span2 txtRight"><p><img class="iconWidth" src="'+defaults.cartImgUrl+'"/> <span>Shopping Cart <span class="arrowIcon">&#9660;</span></span></p></div></a> </div></div><div id="productDisplay" class="cartRow"><div class="innerWrap span4"></div></div></div>');

				//Style it
				$('#springboardCartWrap #productDisplay').hide();		
				$('#springboardCartWrap .bar, #springboardCartWrap .clickable').css('color', userOptions.txtColor);
				$('#springboardCartWrap .bar').css('background-color', userOptions.bgColor);
				$('#springboardCartWrap .bar').css('min-height', userOptions.minHeight);
				$('#springboardCartWrap .innerWrap').css('background-color',userOptions.secondaryColor);
				$('#springboardCartWrap .innerWrap').css('border','15px solid '+userOptions.bgColor);

				//Create handler for cart down click
				$('#cartDropdown').on("click", function(){
					_cartToggle();
				});

				//Call view updater function
				_updateCartView();

			}
		},

		//Add a product to the Cart
		add: function(productName, quant, productPrice){

			//Check it's a valid product name, return error if it isn't
			//if( validProducts.indexOf(productName) < 0 ){
				//return error
			//}

			//If product is in cart
			if(productName in products){
				//increase quantity
				products[productName].quantity += quant;

			}else{
				//Add to products
				products[productName] = {};
				products[productName].product = productName;
				products[productName].quantity = quant;
				products[productName].price = productPrice;
			}

			if(defaults.usingDefaultCart){
				_updateCartView();
			}

		},

		remove: function(productName, quant, callback){
			if(typeof quant !== "number"){
				throw new Error("Enter a quantity ie) SbCart.remove(productName, quantity)");
			}

			if(productName in products){
				
				if(products[productName].quantity - quant <= 0 ){
					delete products[productName];
				}else{
				  products[productName].quantity -= quant;
				}
				_updateCartView();
			}			

			//return callback if callback is kosher
			if(typeof callback === "function"){
				callback(products);
			}

		},

		total: function(){
			return _total();
		},

		products: function(){
			return _products();
		},

		cartToggle: function(){
			if(defaults.usingDefaultCart){
				_cartToggle();
			}
		}

	};
})(jQuery);