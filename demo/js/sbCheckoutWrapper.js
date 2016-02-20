jQuery(document).ready(function($){

	SbCart.shop({
		sessionName: 'testSession',
    usingDefaultCart: true,
  });

	SbCart.checkout();

});