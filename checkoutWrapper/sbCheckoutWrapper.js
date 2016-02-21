//Goes below springboardCart.js
jQuery(document).ready(function($){

	SbCart.shop({
		sessionName: 'testSession',
    usingDefaultCart: true,
    brandName: 'Swan & Son',
    txtColor: '#ffffff',
    brandLogo: 'https://artic.gospringboard.com/files/artic/swan_crop2.png',
    bgColor: '#032856',
    secondaryColor: '#d8d8d8',
  });

	SbCart.checkout(function(products){
		var total = 0;
		Object.keys(products).forEach(function(key){
			var prodName = products[key].product;
			var quantity = products[key].quantity;
			var price = (products[key].price)*(quantity);
			total += price;
			$('div.orderSummary').append('<div class="row-fluid summaryRow"><div class="span6 productName alignLeft">'+prodName+'</div><div class="span3 productQuant alignLeft">Qty. '+quantity+'</div><div class="span3 productTotal alignRight">'+price+'</div></div>');
		});
		$('div.orderSummary').append('<div class="row-fluid summaryRow"><div class="span6 alignLeft">Total</div><div class="span6 totalPrice alignRight">$'+total+'</div></div>');
	});

	//*****************FORMAT EXISTING PAGE ELEMENTS*****************
	$('#webform-component-tickets').hide();
	$('.fieldset-wrapper').wrapInner('<div class="row-fluid"></div>');
	//*****************END FORMAT EXISTING PAGE ELEMENTS*****************


	//*****************MEMBER INFO GRID SETUP*****************	
	$('div#webform-component-member-info--member-id').wrap('<div class="member_id span3"></div>');
	$('div#webform-component-member-info--who-is-this-membership-for').wrap('<div class="gift_membership span3"></div>');
	$('div#webform-component-member-info--person-title').wrap('<div class="member_prefix span2"></div>');
	$('div#webform-component-member-info--person-first-name').wrap('<div class="member_first_name span3"></div>');
	$('div#webform-component-member-info--person-middle-name').wrap('<div class="member_middle_name span2"></div>');
	$('div#webform-component-member-info--person-last-name').wrap('<div class="member_last_name span3"></div>');
	$('div#webform-component-member-info--suffix').wrap('<div class="member_suffix span2"></div>');
	$('div#webform-component-member-info--person-address').wrap('<div class="member_address span7"></div>');
	$('div#webform-component-member-info--person-address-line-2').wrap('<div class="member_address2 span5"></div>');
	$('div#webform-component-member-info--apartment-or-suite').wrap('<div class="member_apt span2"></div>');
	$('div#webform-component-member-info--person-city').wrap('<div class="member_city span3"></div>');
	$('div#webform-component-member-info--person-state').wrap('<div class="member_state span3"></div>');
	$('div#webform-component-member-info--person-zip-postal-code').wrap('<div class="member_zip span3"></div>');
	$('div#webform-component-member-info--person-country').wrap('<div class="member_country span3"></div>');
	$('div#webform-component-member-info--person-email').wrap('<div class="member_email span6"></div>');
	$('div#webform-component-member-info--person-phone').wrap('<div class="member_telephone span6"></div>');
	$('div.member_id, div.gift_membership').wrapAll('<div class="row-fluid"></div>');
	$('div.member_prefix, div.member_first_name, div.member_middle_name, div.member_last_name, div.member_suffix').wrapAll('<div class="row-fluid"></div>');
	$('div.member_address, div.member_address2').wrapAll('<div class="row-fluid"></div>');
	$('div.member_city, div.member_state, div.member_zip, div.member_country').wrapAll('<div class="row-fluid"></div>');
	$('div.member_email, div.member_telephone').wrapAll('<div class="row-fluid"></div>');
	//*****************END MEMBER INFO GRID SETUP*****************

	//**********BEGIN STATE INPUT MANIPULATION***************
	$('input#edit-submitted-member-info-person-state').after('<select class="required" name="member_state_dropdown" id="member_state_dropdown"><option value="" disabled selected>--Select--</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option><option value="AA">Armed Forces (Americas)</option><option value="AP">Armed Forces (Pacific)</option><option value="AE">Armed Forces (Europe, Canada, Middle East, Africa)</option><option value="AS">American Samoa</option><option value="GU">Guam</option><option value="MP">Northern Mariana Islands</option><option value="PW">Palau</option><option value="PR">Puerto Rico</option><option value="UM">United States Minor Outlying Islands</option><option value="VI">Virgin Islands</option></select>');

	$('input#edit-submitted-member-info-person-state').addClass('hide_this');
	//When user changes membership country field
	$('select#edit-submitted-member-info-person-country').bind('keyup change',function(){
		//If United States IS NOT selected
		if( !($('select#edit-submitted-member-info-person-country option:selected').text() == "United States")){
			$('input#edit-submitted-member-info-person-state').removeClass('hide_this'); //hides original state select
			$('select#member_state_dropdown').addClass('hide_this').removeClass('required'); //Shows input and makes it required
			$('label[for="member_state_dropdown"].error').addClass('hide_this'); //Hides validation errors
			$('label[for="edit-submitted-member-info-person-state"].error').removeClass('hide_this'); //Shows validation errors
			$('small[for="edit-submitted-member-info-person-state"]').removeClass('hide_this');
		}else{ //If United States IS seleted
			$('input#edit-submitted-member-info-person-state').addClass('hide_this'); //Shows US State Select
			$('select#member_state_dropdown').removeClass('hide_this').addClass('required'); //Hides Alt State/Province input, removes required attribute
			$('label[for="member_state_dropdown"].error').removeClass('hide_this'); // Shows Validation Errors
			$('label[for="edit-submitted-member-info-person-state"].error').addClass('hide_this'); //Hides Validation Errors
			$('small[for="edit-submitted-member-info-person-state"]').addClass('hide_this');
		}
	});

	//When user enters an alt state/province
	$('select#member_state_dropdown').bind('keyup change blur',function(){
		$('input#edit-submitted-member-info-person-state').val($('select#member_state_dropdown option:selected').text()); //changes state input to dropdown state value
		$.cookie('member_state', $('select#member_state_dropdown option:selected').val() );
	});

	//Reselect US state value after form submission failure
	if( $.cookie('member_state') !== null) {
		$('select#member_state_dropdown option[value="'+$.cookie('member_state')+'"]').prop('selected', true);
		$('select#member_state_dropdown').change();
	}
	//**************END STATE INPUT MANIPULATION****************


	//*****************ADDITIONAL CARD HOLDER GRID SETUP*****************
	$('div#webform-component-member-info--additional-cardholder-title').wrap('<div class="additional_cardholder additional_prefix span2"></div>');
	$('div#webform-component-member-info--additional-cardholder-first-name').wrap('<div class="additional_cardholder additional_cardholder_first_name span3"></div>');
	$('div#webform-component-member-info--additional-cardholder-middle-name').wrap('<div class="additional_cardholder additional_middle_name span2"></div>');
	$('div#webform-component-member-info--additional-cardholder-last-name').wrap('<div class="additional_cardholder additional_cardholder_last_name span3"></div>');
	$('div#webform-component-member-info--spouse-or-joint').wrap('<div class="additional_cardholder spouse_or_joint span2"></div>');
	$('#form-item-submitted-member-info-spouse-or-joint input').wrap('<div class="spouse_or_joint_radio" style="float: left !important;margin: 0 10px 0 0;line-height: 20px;"></div>');
	$('div.additional_cardholder').wrapAll('<div class="row-fluid"></div>');
	$('.additional_cardholder').hide();
	//*****************END ADDITIONAL CARD HOLDER GRID SETUP*****************



	//*****************BILLING INFO GRID SETUP*****************
	$('div#webform-component-billing-information--title').wrap('<div class="billing_title span2"></div>');
	$('div#webform-component-billing-information--first-name').wrap('<div class="billing_first_name span4"></div>');
	$('div#webform-component-billing-information--middle-name').wrap('<div class="billing_middle_name span2"></div>');
	$('div#webform-component-billing-information--last-name').wrap('<div class="billing_last_name span4"></div>');
	$('div#webform-component-billing-information-payment-fields').wrap('<div class="billing_payment span12"></div>');
	$('div.form-item-submitted-billing-information-payment-fields-credit-card-number').wrap('<div class="billing_card_number span6"></div>');
	$('div.expiration-date-wrapper').wrap('<div class="billing_exp_date span3"></div>');
	$('div.form-item-submitted-billing-information-payment-fields-credit-card-cvv').wrap('<div class="billing_cvv span3"></div>');
	$('div#webform-component-billing-information--address').wrap('<div class="billing_address span6"></div>');
	$('div#webform-component-billing-information--address-line-2').wrap('<div class="billing_address2 span6"></div>');
	$('div#webform-component-billing-information--city').wrap('<div class="billing_city span3"></div>');
	$('div#webform-component-billing-information--country').wrap('<div class="billing_country span3"></div>');
	$('div#webform-component-billing-information--state').parent().wrap('<div class="billing_state span3"></div>');
	$('div#webform-component-billing-information--zip').wrap('<div class="billing_zip span3"></div>');
	$('div#webform-component-billing-information--phone').wrap('<div class="billing_phone span6"></div>');
	$('div#webform-component-billing-information--mail').wrap('<div class="billing_email span6"></div>');
	$('input[type="submit"]').wrap('<div class="form_submit_btn span4"></div>');
	$('div.billing_title, div.billing_first_name, div.billing_middle_name, div.billing_last_name').wrapAll('<div class="row-fluid"></div>');
	$('div.billing_payment').wrapAll('<div class="row-fluid"></div>');
	$('div.billing_address, div.billing_address2').wrapAll('<div class="row-fluid"></div>');
	$('div.billing_city, div.billing_state, div.billing_zip, div.billing_country').wrapAll('<div class="row-fluid"></div>');
	$('div.billing_email, div.billing_phone').wrapAll('<div class="row-fluid"></div>');
	//Fixes Jackson River Credit Card field update error
	$('div#ecomm_panel_4').css({
		'margin':'0px',
		'padding':'0px'
	});
	$('#edit-submitted-billing-information-payment-fields-credit-expiration-date-card-expiration-month').addClass('span6');
	$('#edit-submitted-billing-information-payment-fields-credit-expiration-date-card-expiration-year').addClass('span6');
	//*****************END BILLING INFO GRID SETUP*****************
	
	//*****************FORM VALIDATION*****************
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Please check your input."
	);
	$('form').validate({
		ignore: ":hidden",		
		rules: {
			'submitted[member_info][person_phone_primary]'/*Member Phone*/: {
				required: true,
				regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
				// usFormat: true,
				minlength: 12
			},
			'submitted[billing_information][billing_phone_primary]'/*Billing Phone*/: {
				required: true,
				regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
				// usFormat: true,
				minlength: 12
			}
		},
		messages: {
			'submitted[member_info][person_phone_primary]'/*Member Phone*/: {
				required: "Please enter your telephone",
				regex: "Enter a valid phone number xxx-xxx-xxxx",
				minlength: "Check format and/or length"
			},
			'submitted[billing_information][billing_phone_primary]'/*Billing Phone*/: {
				required: "Please enter your telephone",
				regex: "Enter a valid phone number xxx-xxx-xxxx",
				minlength: "Check format and/or length"
			}
		},
		errorElement: "small",
		errorPlacement: function(error, element) {
			var name = element.attr('name');
			if(name == 'submitted[member_info][spouse_or_joint]'){
				error.insertAfter( ( element.parent().parent() ) );
			}else{
				error.insertAfter(element);
			}
		},
		submitHandler: function(form) {
			/* disable button if valid and then submit */
			// $("#form_submit").addClass("submitting").attr("disabled", true);
			$("#overlay").removeClass("hide_this");
			form.submit();
			
		}
	});
	//*****************END FORM VALIDATION*****************
});