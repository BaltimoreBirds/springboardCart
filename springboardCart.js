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
				sessionName: null,
				usingDefaultCart: false,
				minHeight: 30,
				bgColor: '#9d1b31',
				txtColor: 'white',
				secondaryColor: '#d8d8d8',
				brandLogo: 'https://artic.gospringboard.com/files/artic/swan_crop2.png',
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

			$('#productDisplay .innerWrap').append('<div class="cartRow borderBottom"><div class="noStretch span5">'+productName+'</div><div class="noStretch span2">Qty. '+quant+'</div><div class="noStretch span3 txtRight">$'+parseFloat(quant*price).toFixed(2)+'</div></div>');
		});

		//Build a 'total' row
		var total = _total();
		$('#productDisplay .innerWrap').append('<div class="cartRow"><div class="noStretch span7">Total: </div><div class="noStretch span3 txtRight">$'+total+'</div></div>');
	};

	//return total price
	var _total = function(){
		var total = 0;
		Object.keys(products).forEach(function(key){
			total += (products[key].quantity * products[key].price);
		});
		return parseFloat(total).toFixed(2);
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
	};

	//show and hide our Default cart
	var _cartToggle = function(){
		$('#productDisplay').slideToggle();
	};

	//Output help
	var _debug = function(){
		console.log("localStorage", localStorage.getItem(defaults.sessionName));
	};

	//tests if func argument is a function
	var _isFunction = function(func){
		//return callback if callback is kosher
		if(typeof func === "function"){
			return true;
		}else{
			return false;
		}
	};

	var _setSessionDefaults = function(){
		localStorage.setItem(defaults.sessionName.toString(), JSON.stringify(defaults));
	};

	var _getSessionDefaults = function(options){
		defaults = JSON.parse(localStorage.getItem(options.sessionName)) || defaults;
	};

	var _setSessionProducts = function(){
		localStorage.setItem(defaults.sessionName+'Products', JSON.stringify(products));
	};

	var _getSessionProducts = function(){
		products = JSON.parse(localStorage.getItem(defaults.sessionName+'Products')) || products;
	};

	//Public API 
	return {

		//Initialize with or without the default frame (#springboardCartWrap)
		shop: function(options){

			//get defaults from session if they are there
			_getSessionDefaults(options);

			//merge user options with the defaults.
			$.extend(defaults, options);

			//pull products from localStorage object
			_getSessionProducts();
			//Set defaults on localStorage object 'sessionName'
			_setSessionDefaults();

			//Check user wants default cart, and that its not already there
			if(defaults.usingDefaultCart && !$('#springboardCartWrap').length ){

				//Affix shopping Cart bar. HTML in cart.html
				$('body').prepend('<div id="springboardCartWrap" class="affixed"><div class="bar borderBottom"><div class="cartRow"><div id="logoBlock" class="noStretch span5"><p><img  src="'+defaults.brandLogo+'"/> Swan & Son</p></div><a class="clickable" href="#"><div id="cartDropdown" class="noStretch span5 txtRight"><p><img class="iconWidth" src="'+defaults.cartImgUrl+'"/> <span>Shopping Cart <span class="arrowIcon">&#9660;</span></span></p></div></a> </div></div><div id="productDisplay" class="cartRow"><div class="innerWrap span4"></div></div></div>');

				//Style it
				//$('#springboardCartWrap #productDisplay').hide();
				$('#springboardCartWrap .bar, #springboardCartWrap .clickable').css('color', defaults.txtColor);
				$('#springboardCartWrap .bar').css('background-color', defaults.bgColor);
				$('#springboardCartWrap .bar').css('min-height', defaults.minHeight);
				$('#springboardCartWrap .innerWrap').css('background-color',defaults.secondaryColor);
				$('#springboardCartWrap .innerWrap').css('border','15px solid '+defaults.bgColor);

				//Create handler for cart down click
				$('#cartDropdown').on("click", function(){
					_cartToggle();
				});

				//Call view updater function
				_updateCartView();
			}
		},

		//Add a product to the Cart
		add: function(productName, quant, productPrice, callback){

			//Validate the function arguments
			if(typeof productName !== 'string' || typeof quant !== 'number' || typeof productPrice !== 'number'){
				throw new Error('Improper function arguments -> SbCart.add(\'string\',\'number\',\'number\')');
			}

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

			//Set products onto the session
			_setSessionProducts();

			//return callback if callback is kosher
			if( _isFunction(callback) ){
				callback(products);
			}

		},

		remove: function(productName, quant, callback){
			
			//Validate function arguments
			if(typeof productName !== "string" || typeof quant !== "number"){
				throw new Error("Improper Function Arguments -> SbCart.remove(productName, quantity)");
			}

			if(productName in products){
				
				if(products[productName].quantity - quant <= 0 ){
					delete products[productName];
				}else{
					products[productName].quantity -= quant;
				}
				//Update the default view if we're using it
				if(defaults.usingDefaultCart){
					_updateCartView();
				}

				//Set products onto the session
				_setSessionProducts();
			}

			//return callback if callback is kosher
			if( _isFunction(callback) ){
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