# Springboard Shopping Cart  
Shopping Cart module for Springboard

Include this module definition on all pages utilizing the shopping cart. Include the springboardCart.css above your custom styles, and include the springboardCart.js file above your custom scripts. Utilize the SbCart API methods to Initialize, Add, Remove, Checkout, etc., in your custom scripts:   

**Arguments in brackets are [optional]*

Initialize Cart: SbCart.shop({options});  
Dev's option to use the default cart, but you'll have to set and reuse the sessionName on every initilization, aka, on every page in which you hope to use the cart.
```javascript
	SbCart.shop({
		sessionName: 'testSession', //A session name is required
		usingDefaultCart: true,
		brandName: 'Swan & Son',
		txtColor: '#ffffff',
		brandLogo: 'https://artic.gospringboard.com/files/artic/swan_crop2.png',
		bgColor: '#0A004D',
		secondaryColor: '#d8d8d8',
	});
```

Add Products: SbCart.add(productId, productName, quantity, price [,callback]);
```javascript
	SbCart.add('AIC_member_plus_83.68','Member Plus', 1, 83.68);
```

Remove Products: SbCart.remove(productId, productName, quantity [,callback]);
```javascript
	SbCart.remove('AIC_member_plus_83.68', 1, function(data){
		//returns products
		//do something with data
	});
```	

Checkout: SbCart.checkout([callback]);
```javascript
	SbCart.checkout(function(data){
		//returns products
		//do something with data
	});
```	

Return Total:
```javascript
	SbCart.total();
```	

Return Products:
```javascript
	SbCart.products();
```	

Return Quantity of items in Cart:
```javascript
	SbCart.quantTotal();
```	



The key to this thing comes from unique(emphasis on unique) ID's attached to the different products. A 'Member-Plus' Membership, selling at $80.75 for instance, could have an ID of `aic_member_plus_80.75`. This will be sold as a 'Ticket' through a Springboard 'Ticketed Event' E-commerce form. In this case, the 'Checkout' form(Form ID 1451). All possible tickets sold by this organization(AIC for example), should be available through this form. The springboardCart module user will be required to add new options to this checkout form, via Ticketed Event >> Checkout(form) >> Tickets >> Tickets >> Add Ticket Type. 

The module, on `SbCart.checkout()`, will scan these available 'tickets' on the Checkout form, and select all that are in the cart with the proper quantity. The user shouldn't see the available tickets at all, and the module user can display the items in the cart as they see fit, as the product object gets returned to them(Or they can simply keep the defaultCart dropdown open). An example of how the `SbCart.checkout([callback])` return could be utilized can be seen in the AIC DS16xxx_Sb_Checkout_Wrapper project folder. This example is being used on the current Checkout Form(https://artic.gospringboard.com/secure/checkout).  

Examples of the add and remove functions can be seen in the AIC DS16xxx_Sb_Cart_Example project folder. You can find those functions in action at https://artic.gospringboard.com/secure/cart-example.