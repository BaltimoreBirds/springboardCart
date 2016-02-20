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
			currentPrice = 0,
			cartWrap,
			checkedOut = false,
			error = {
				message: " ",
			},
			defaults = {
				sessionName: null,
				usingDefaultCart: false,
				brandName: 'Swan & Son',
				minHeight: 30,
				bgColor: '#d8d8d8',
				txtColor: 'black',
				secondaryColor: '#ffffff',
				brandLogo: 'https://artic.gospringboard.com/files/artic/transparent.png',
				cartImgUrl: 'https://artic.gospringboard.com/files/artic/empty-cart-light-small.png',
			};

	//Private functions
	var _updateCartView = function(){
		var quantityTotal = 0;
		
		//Clear cart innerWrap html
		$('#productDisplay .innerWrap')[0].innerHTML = " ";

		//iterate through products, and display them
		Object.keys(products).forEach(function(key){
			var productName = products[key].product,
					price = products[key].price,
					quant = products[key].quantity;

			quantityTotal += quant;
			$('#productDisplay .innerWrap').append('<div class="cartRow borderBottom"><div class="noStretch span5">'+productName+'</div><div class="noStretch span2">Qty. '+quant+'</div><div class="noStretch span3 txtRight">$'+parseFloat(quant*price).toFixed(2)+'</div></div>');
		});

		//Update Cart quantity
		$('.itemCount').text(quantityTotal);

		//Build a 'total' row
		var total = _total();
		$('#productDisplay .innerWrap').append('<div class="cartRow"><div class="noStretch span7">Total: </div><div class="noStretch span3 txtRight">$'+total+'</div></div>');
	};

	var _quantTotal = function(){
		var quantTotal = 0;
		Object.keys(products).forEach(function(key){
			quantTotal += products[key].quantity;
		});
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
				$('body').prepend('<div id="springboardCartWrap" class="affixed"><div class="bar borderBottom"><div class="cartRow"><div id="logoBlock" class="noStretch span5"><p><img src="'+defaults.brandLogo+'"/> '+defaults.brandName+'</p></div><a class="clickable" href="#"><div id="cartDropdown" class="noStretch span5 txtRight"><p><span class="itemCount"></span><img class="iconWidth" src="'+defaults.cartImgUrl+'"/> <span>Shopping Cart <span class="arrowIcon">&#9660;</span></span></p></div></a> </div></div><div id="productDisplay" class="cartRow"><div class="innerWrap span4"></div></div></div>');

				//Style it
				//$('#springboardCartWrap #productDisplay').hide();
				$('#springboardCartWrap .bar, #springboardCartWrap .clickable').css('color', defaults.txtColor);
				$('#springboardCartWrap .bar').css('background-color', defaults.bgColor);
				$('#springboardCartWrap .bar').css('min-height', defaults.minHeight);
				$('#springboardCartWrap .innerWrap').css('background-color', defaults.secondaryColor);
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
		add: function(productId, productName, quant, productPrice, callback){
			//Should we be adding tlc_source/appealID etc. info on the product object?
			//Or maybe it should exist on the springboard Ticket.

			//Validate the function arguments
			if(typeof productId !== 'string' || typeof productName !== 'string' || typeof quant !== 'number' || typeof productPrice !== 'number'){
				
				throw new Error('Improper function arguments -> SbCart.add(\'string\',\'number\',\'number\')');
			}

			productId = productId.toLowerCase();
			//If product is in cart
			if(productId in products){
				//increase quantity
				products[productId].quantity += quant;

			}else{
				//Add to products
				products[productId] = {};
				products[productId].product = productName;
				products[productId].quantity = quant;
				products[productId].price = productPrice;
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
		remove: function(productId, quant, callback){
			
			//Validate function arguments
			if(typeof productId !== "string" || typeof quant !== "number"){
				throw new Error("Improper Function Arguments -> SbCart.remove(productName, quantity)");
			}

			productId = productId.toLowerCase();
			if(productId in products){
				
				if(products[productId].quantity - quant <= 0 ){
					delete products[productId];
				}else{
					products[productId].quantity -= quant;
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
		checkout: function(){
			if( !$('.ticket_box').length ){
				throw new Error('Not on the checkout page! -> https://artic.gospringboard.com/secure/checkout');
			}
			
			var products = _products();
			var $product_selects = $('td.ticket_descriptions');

			//Cycle through options on the springboard checkout ticketing..thing
			$.each($product_selects, function(i, e){
				//Check if product is in cart
				if( products.indexOf($(this).text()) >= 0){
					console.log('it\'s here');
					$(this).prev().find('select.form-select').val(products[ $(this).text() ].quantity);
				}
			});
		},
		total: function(){
			return _total();
		},
		products: function(){
			return _products();
		},
		quanTotal: function(){
			return _quantTotal();
		},
		cartToggle: function(){
			if(defaults.usingDefaultCart){
				_cartToggle();
			}
		}
	};
})(jQuery);