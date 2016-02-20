# springboardCart  
Shopping Cart plugin for Springboard  

Initialize Cart: SbCart.shop({options}); Dev's option to use the default cart.
```
	SbCart.shop({
		usingDefaultCart: true,
		exposed: true,
		bgColor: 'teal', 
	});
```

Add Products: SbCart.add(productName, quantity, price [,callback]);
```
	SbCart.add('Member Plus', 1, 83.68);
```
Remove Products: SbCart.remove(productName, quantity [,callback]);
```
	SbCart.remove('Member Plus', 1, function(data){
		//returns products
		//do something with data
	});
```	
