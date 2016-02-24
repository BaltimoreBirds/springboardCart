# Springboard Shopping Cart  
Shopping Cart module for Springboard

Include this module definition on all pages utilizing the shopping cart. Include the springboardCart.css above your custom styles, and include the springboardCart.js file above your custom scripts. They will not interfere with the existing page's css or scripts(and nothing will happen if you don't initialize it with `.shop()`, as seen below). Utilize the SbCart API methods to Initialize, Add, Remove, Checkout, etc., in your custom scripts:   

<small>**Arguments in brackets are [optional]*</small>

<h5>Initialize Cart: SbCart.shop({options});  </h5>
Dev's option to use the default cart, but you'll have to set and reuse the sessionName on every cart initilization, aka, on every page in which you hope to use the shopping cart.
```javascript
	SbCart.shop({
		sessionName: 'testSession', //A session name is required
		usingDefaultCart: true, 
		brandName: 'Swan & Son',  //I would at least set to blank unless you like my name 
		txtColor: '#ffffff',  
		brandLogo: 'https://artic.gospringboard.com/files/artic/swan_crop2.png',
		bgColor: '#0A004D',
		secondaryColor: '#d8d8d8',
	});
```

<h5>Add Products: SbCart.add(productId, productName, quantity, price [,callback]);</h5>
```javascript
	SbCart.add('aic_member_plus_161.50','Member Plus', 1, 161.50);
```

<h5>Remove Products: SbCart.remove(productId, productName, quantity [,callback]);</h5>
```javascript
	SbCart.remove('aic_member_plus_161.50', 1, function(products){
		//do something with products()
	});
```	

<h5>Checkout: SbCart.checkout([callback]);</h5>
```javascript
	SbCart.checkout(function(products){
		//returns products
		//do something with products
	});
```	

<h5>Empty the Cart:  </h5>
Use this on the thank you page after a successful transaction.
```javascript
	SbCart.emptyCart();
```	

<h5>Return Total:</h5>
```javascript
	SbCart.total();
```	

<h5>Return Products:</h5>
```javascript
	SbCart.products();
```	

<h5>Return quantity of items in Cart:</h5>
```javascript
	SbCart.quantTotal();
```	

<h5>Notes</h5>
See a more detailed description in the TLC fork