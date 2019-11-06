import GLOBAL_CONSTANTS from '../constants';
const LabelReducer = (
  state = {
    checkout: {
      bagBonusPoints: {
        referred: null,
        lbl_bonusPoints_usedOn: 'USED ON',
        lbl_bonusPoints_futureUse: 'AVAILABLE FOR FUTURE USE',
        lbl_bonusPoints_ctaApply: 'AVAILABLE TODAY!',
        lbl_bonusPoints_ctaApplied: 'APPLIED TO ORDER',
        lbl_bonusPoints_placeRewardsBonus: 'BONUS',
        lbl_bonusPoints_placeRewardsPoints: 'POINTS',
      },
      pickup: {
        referred: null,
        lbl_pickup_title: 'PICKUP',
        lbl_pickup_titleContact: 'Pickup Contact',
        lbl_pickup_firstName: 'First Name',
        lbl_pickup_govIdText: 'A government issued ID is required to pickup the order.',
        lbl_pickup_email: 'Email Address',
        lbl_pickup_mobile: 'Mobile Number',
        lbl_pickup_alternativeHeading: 'Add an alternative pickup person (optional)',
        lbl_pickup_alternativeSubHeading:
          'Alternate pickup contact will also receive a copy of all Order Pickup emails.',
        lbl_pickup_alternativeFirstName: 'First Name',
        lbl_pickup_alternativeGovIdText: 'A government issued ID is required to pickup the order.',
        lbl_pickup_alternativeLastName: 'Last Name',
        lbl_pickup_alternativeEmail: 'Email Address',
        lbl_pickup_emailSignupHeading: 'Sign up for email today & get $10 off your next purchase!*',
        lbl_pickup_emailSignupSubHeading:
          'I understand I will receive marketing emails from The Children’s Place.',
        lbl_pickup_emailSignupSubSubHeading:
          '*Applies to new email subscribers only. Exclusions apply. Offer valid on your next purchase of $40 or more. You may withdraw your consent at any time.',
        lbl_pickup_emailSignupContact: 'Contact us.',
        lbl_pickup_lastName: 'Last Name',
        lbl_pickup_btn_cancel: 'Cancel',
        lbl_pickup_btn_update: 'Update',
        lbl_pickup_pickup_contact: 'Pickup Contact',
        lbl_pickup_anchor_edit: 'Edit',
        lbl_pickup_returnTo: 'Return to',
        lbl_pickup_nextText: 'NEXT',
        lbl_pickup_buttonText: 'Pickup',
        lbl_pickup_billingText: 'BILLING',
        lbl_pickup_btnSaveUpdate: 'Save Pickup Details',
        lbl_pickup_titleEditPickUp: 'EDIT PICKUP',
        lbl_pickup_venmo_banner:
          'To complete your Venmo payment, we’ll need a little more information.',
        lbl_pickup_reviewText: 'REVIEW',
        lbl_pickup_nextToBilling: 'NEXT: SHIPPING',
      },
      review: {
        referred: null,
        lbl_review_title: 'REVIEW',
        lbl_review_backLinkBilling: 'Return to Billing',
        lbl_review_nextSubmit: 'Submit Order',
        lbl_review_applyConditionPreText: 'By selecting “Submit Order”, I agree to the',
        lbl_review_applyConditionTermsText: 'Terms & Conditions',
        lbl_review_applyConditionAndText: 'and',
        lbl_review_applyConditionPolicyText: 'Privacy Policy.',
        lbl_review_billingSectionTitle: 'Billing',
        lbl_review_shippingSectionTitle: 'Shipping',
        lbl_review_pickupSectionTitle: 'Pickup Contact',
        lbl_review_paymentMethod: 'Payment Method',
        lbl_review_appliedGiftCards: 'Applied Gift Cards',
        lbl_review_billingAddress: 'Billing Address',
        lbl_review_paymentMethodEndingIn: 'ending in',
        lbl_review_appliedGiftCardEndingIn: 'Ending In',
        lbl_review_appliedGiftCardRemainingBal: 'Remaining Balance',
        lbl_review_giftCardHeadsup: 'Heads Up!',
        lbl_review_giftCardMessage:
          'Please keep you Gift Card until you receive the item(s) purchased.',
        lbl_review_billingEdit: 'Edit',
        lbl_review_appliedGiftCardsNone: 'None',
        lbl_review_sectionAnchor: 'Edit',
        lbl_review_sectionPickupText:
          'We will send you an email when your order is ready. A government issued ID is required to pick up the order.',
        lbl_review_sectionPickupItem: 'ITEM',
        lbl_review_sectionPickupItems: 'ITEMS',
        lbl_review_sectionPickupToday: 'Today,',
        lbl_review_sectionPickupAlternateHeading: 'Alternate Pickup Contact',
        lbl_review_sectionShippingAddressTitle: 'Shipping Address',
        lbl_review_sectionShippingMethodTitle: 'Shipping Method',
        lbl_review_sectionShippingGiftServiceTitle: 'Gift Services',
        lbl_review_sectionShippingGiftServiceDefault: 'N/A',
        lbl_review_sectionPickupOrderTitle: 'PICK UP',
        lbl_review_save_venmo: 'Save to my account',
      },
      bagPage: {
        referred: null,
        lbl_header_bag: 'MY BAG',
        lbl_orderledger_items: 'Items',
        lbl_orderledger_coupons: 'Coupons',
        lbl_orderledger_promotions: 'Promotions',
        lbl_orderledger_shipping: 'Shipping',
        lbl_orderledger_tax: 'Estimated Tax',
        lbl_orderledger_total: 'Estimated Total',
        lbl_orderledger_giftcards: 'Gift Card(s)',
        lbl_orderledger_balance: 'Balance',
        lbl_orderledger_totalsavings: 'Total Savings',
        lbl_orderledger_tooltiptext:
          'Total includes any applied promotions or coupons in addition to on sale savings',
        lbl_couponform_placeholder: 'Enter Coupon Code',
        lbl_couponform_submit: 'Apply',
        lbl_cartTile_bopis: 'I’ll pick up in store at #store# Today',
        lbl_orderledger_free: 'FREE',
        lbl_emptyBag_loggedInMsg: 'Uh oh! Looks like you don’t have anything in your cart yet!',
        lbl_emptyBag_notLoggedInMsg: 'Do you have items in your cart?',
        lbl_emptyBag_loginIn: 'LOGIN',
        lbl_emptyBag_shopNow: 'SHOP NOW',
        lbl_emptyBag_inspirationTagLine: 'Need some inspiration?',
        lbl_emptyBag_helperMsg: 'Here are some great items to get your cart started!',
        lbl_couponform_header: 'COUPON CODE',
        lbl_couponform_help: 'Need Help?',
        lbl_couponlist_available: 'AVAILABLE REWARDS & OFFERS',
        lbl_couponlist_applied: 'APPLIED REWARDS & OFFERS',
        lbl_couponlist_helpAppling: 'Help applying Place Cash',
        lbl_couponlist_applyBtn: 'APPLY',
        lbl_couponlist_removeBtn: 'REMOVE',
        lbl_couponlist_detailBtn: 'Details',
        lbl_couponlist_showMoreTxt: 'Show more',
        lbl_couponlist_lessMoreTxt: 'Less more',
        lbl_couponlist_applyTobag: 'Apply to bag',
        lbl_couponlist_printTxt: 'Print',
        lbl_couponlist_useBy: 'Use by',
        lbl_couponlist_modalLongDesc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nunc, interdum ac neque non, blandit accumsan justo. Phasellus aliquam urna ut nisl faucibus, quis pellentesque nulla vulputate. Phasellus bibendum lobortis orci, condimentum convallis sa',
        lbl_couponlist_modalShortDesc: 'By participating in the activity, you agree to ',
        lbl_couponlist_tAndC: 'Terms & Conditions',
        lbl_couponlist_pPolicy: ' Privacy Policy',
        lbl_couponlist_placeCash: 'PLACE CASH',
        lbl_couponlist_rewards: 'REWARDS',
        lbl_couponlist_savings: 'SAVINGS',
        lbl_couponlist_expiring: 'EXPIRING SOON!',
        lbl_sfl_viewsfl: 'View Saved for Later',
        lbl_sfl_actionLink: 'Save for Later',
        lbl_sfl_maxLimitError:
          'Sorry you have reached the max number of items that can be saved for later.',
        lbl_sfl_actionError: 'Sorry we were unable to save your item for later at this time.',
        bl_sfl_actionSuccess: 'Item Saved for later successfully.',
        lbl_sfl_notFoundItem: 'Sorry, we were unable to complete your request. Please try again.',
        lbl_sfl_moveToBag: 'Move To Bag',
        lbl_sfl_savedForLater: 'SAVED FOR LATER',
        lbl_coupon_collapsible_header: 'REWARDS & OFFERS',
        'lbl_sfl_myBagButton ': 'My Bag',
        lbl_sfl_savedLaterButton: 'Saved for Later',
        lbl_sfl_emptySflMsg_1: 'Not ready to buy anything yet?',
        lbl_sfl_emptySflMsg_2:
          'You can save it for later and it will appear in this area. Lorum ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        lbl_itemDelete_modalTitle: 'Want to save it instead?',
        lbl_itemDelete_modalHeading:
          'It’ll be in the Saved For Later section when you’re ready to shop.',
        lbl_itemDelete_modalButtonSFL: 'YES, SAVE FOR LATER',
        lbl_itemDelete_modalButtonConfirmDelete: 'NO THANKS',
        lbl_msg_itemDeleteSuccess: 'Your item has been deleted.',
        lbl_sfl_itemDeleteSuccess: 'Your item has been removed.',
        lbl_PLCCModal_applyNowLink: 'Apply Now',
        lbl_orderledger_title: 'ORDER SUMMARY',
        lbl_orderledger_giftServices: 'Gift Service',
      },
      orderConfirmation: {
        referred: [
          {
            name: 'Update_Order_Details_BOSS',
            contentId: '44a54611-afa2-483c-899a-fa2ccb88a6f3',
            __typename: 'ReferredContent',
          },
          {
            name: 'Update_Order_Details_BOPIS',
            contentId: '30f7eaae-0dda-4a0d-a254-321e5aebb474',
            __typename: 'ReferredContent',
          },
        ],
        lbl_confirmation_heading: 'Thank You for your order!',
        lbl_confirmation_mixOrderMsg1:
          'You’ll receive emails confirming your pickup status and order info at ',
        lbl_confirmation_mixOrderMsg2:
          '.If a different email address was provided for pickup, status updates will be sent to that email instead.',
        lbl_confirmation_orderMsg1: 'You’ll receive an email confirmation shortly with',
        lbl_confirmation_shippingMsg: 'your order',
        lbl_confirmation_pickup: 'pickup',
        lbl_confirmation_orderMsg2: 'info at',
        lbl_confirmation_pendingOrderMsg:
          "Your Children's Place order is currently pending payment approval.",
        lbl_confirmation_pickupAt: 'Pickup at',
        lbl_confirmation_shippingTo: 'Shipping To',
        lbl_confirmation_item: 'ITEM',
        lbl_confirmation_items: 'ITEMS',
        lbl_confirmation_currencySign: '$',
        lbl_confirmation_bopisDate: 'Today, ',
        lbl_confirmation_today: 'Today:',
        lbl_confirmation_tomorrow: 'Tomorrow:',
        lbl_confirmation_phone: 'Phone:',
        lbl_confirmation_orderNumber: 'Order #',
        lbl_confirmation_orderDate: 'Order Date',
        lbl_confirmation_orderTotal: 'Order Total',
        lbl_createAccount_heading: 'Create an account for easier, faster checkout.',
        lbl_confirmation_nextHeading: 'What’s next?',
        lbl_confirmation_nextDetails_boss:
          'Check your email for your order confirmation. We’ll also let you know when this order is ready for pickup. You will receive separate credit card charges for the items being shipped and items being picked up in store.',
        lbl_confirmation_updateOrderHeading: 'Can I update my order?',
        lbl_confirmation_nextDetails:
          "Check your email for your order confirmation. We'll also let you know when your order is ready for pickup. You will receive separate credit card charges for online and pickup orders.",
        lbl_odmCoupons_heading_1: 'Special Coupons just for you!',
        lbl_odmCoupons_heading_2: '(Coupon(s) will also he included in your oder emails.)',
        lbl_odmCoupons_webCode: 'WEB CODE:',
        lbl_odmCoupons_validTill: 'Valid ',
        lbl_odmCoupons_nowThrough: 'Now through',
        lbl_odmCoupons_detailsLink: 'Details',
        lbl_confirmation_venmo_heading: 'Venmo Payment',
        lbl_confirmation_venmo_ship_information:
          'If your order ships after 10 days, a second authorization will appear on your card, however you will only be charged once.',
        lbl_confirmation_paid_with_venmo: 'Paid with',
      },
      checkoutHeader: {
        referred: null,
        lbl_checkoutheader_checkout: 'CHECKOUT',
        lbl_checkoutheader_returnBag: 'Return to bag',
        lbl_checkoutheader_pickup: 'Pickup',
        lbl_checkoutHeader_shipping: 'Shipping',
        lbl_checkoutHeader_billing: 'Billing',
        lbl_checkoutHeader_review: 'Review',
        lbl_checkoutHeader_expressCheckout: 'EXPRESS CHECKOUT',
      },
      shipping: {
        referred: [
          {
            name: 'GiftServicesDetailsTCPModal',
            contentId: '4e999c27-5e14-4644-ba49-5057cecf5e4e',
            __typename: 'ReferredContent',
          },
          {
            name: 'GiftServicesDetailsGYMModal',
            contentId: 'ec868275-7cc8-4c7a-8b9e-75e6bab490f1',
            __typename: 'ReferredContent',
          },
        ],
        lbl_shipping_header: 'SHIPPING',
        lbl_shipping_sectionHeader: 'Shipping Details',
        lbl_shipping_shipmentHeader: 'Shipping Method',
        lbl_shipping_backLinkText: 'Return to Pickup',
        lbl_shipping_billingText: 'NEXT: BILLING',
        lbl_shipping_addNewAddress: ' + Add New Address',
        lbl_shipping_edit: ' Edit',
        lbl_shipping_saveToAccount: 'Save to my address book',
        lbl_shipping_defaultShipping: 'Set as default shipping address',
        lbl_shipping_save: 'Save',
        lbl_shipping_cancel: 'Cancel',
        lbl_shipping_selectShipAdd: 'SELECT THIS SHIPPING ADDRESS',
        lbl_shipping_cancelCaps: 'CANCEL',
        lbl_shipping_addHeading: 'ADD NEW ADDRESS',
        lbl_shipping_editHeading: 'EDIT ADDRESS',
        lbl_giftServices_header: 'Gift Services',
        lbl_giftServices_details: 'Details',
        lbl_giftServices_add: 'Add a gift receipt, message and/or gift boxes.',
        lbl_giftServices_select: 'Select the brand you’d like for your gift box.',
        lbl_shipping_giftServicesTcpOptionName1: 'Gift Receipt / Gift Message Only',
        lbl_shipping_giftServicesGymOptionName1: 'Gift Receipt / Gift Message Only',
        lbl_shipping_giftServicesTcpOptionPrice1: 'FREE',
        lbl_shipping_giftServicesGymOptionPrice1: 'FREE',
        lbl_shipping_giftServicesTcpOptionDesc1:
          'Encrypted prices and gift message will appear on packing slip. Price tags are not removed.',
        lbl_shipping_giftServicesGymOptionDesc1:
          'Encrypted prices and gift message will appear on packing slip. Price tags are not removed.',
        lbl_shipping_giftServicesTcpOptionName2: 'Standard Gift Service',
        lbl_shipping_giftServicesGymOptionName2: 'Standard Gift Service',
        lbl_shipping_giftServicesTcpOptionPrice2: '$2.00',
        lbl_shipping_giftServicesGymOptionPrice2: '$2.00',
        lbl_shipping_giftServicesTcpOptionDesc2:
          'Gift it! Include a fun gift box, tissue paper, and a message to your order.',
        lbl_shipping_giftServicesGymOtionDesc2:
          'Gift it! Include a fun gift box, tissue paper, and a message to your order.',
        lbl_shipping_giftServicesTcpOptionName3: 'Delux Gift Service',
        lbl_shipping_giftServicesGymOptionName3: 'Delux Gift Service',
        lbl_shipping_giftServicesTcpOptionPrice3: '$6.00',
        lbl_shipping_giftServicesGymOptionPrice3: '$6.00',
        lbl_shipping_giftServicesTcpOptionDesc3:
          'We’ll package everything in a fun gift box with tissue paper and a message then ship it directly to the recipient.',
        lbl_shipping_giftServicesGymOptionDesc3:
          'We’ll package everything in a fun gift box with tissue paper and a message then ship it directly to the recipient.',
        lbl_shipping_default: 'DEFAULT',
        lbl_giftServices_charLimit: '100 character limit',
        lbl_giftServices_addMessage: 'Add Your Message',
        lbl_shipping_reviewText: 'NEXT: REVIEW',
        lbl_shipping_addressEditError: 'You have one or more unsaved changes.',
      },
      billing: {
        referred: [
          {
            name: 'cvv_info',
            contentId: 'acf831fb-671a-4382-9b3a-98def279d3cf',
            __typename: 'ReferredContent',
          },
        ],
        lbl_billing_title: 'BILLING',
        lbl_giftcard_title: 'Gift Cards',
        lbl_giftcard_addUptoMsg: 'Add up to 5 gift cards and/or merchandise credits.',
        lbl_giftcard_appliedCards: 'Applied Gift Cards',
        lbl_giftcard_endingIn: 'Ending in',
        lbl_giftcard_remainingBal: 'Remaining balance',
        lbl_giftcard_removeBtn: 'Remove',
        lbl_giftcard_headsUpTitle: 'Heads Up!',
        lbl_giftcard_headsUpMsg:
          'Please keep you Gift Card until you receive the item(s) purchased.',
        lbl_giftcard_availableCards: 'Available Gift Cards',
        lbl_giftcard_applyBtn: 'Apply',
        lbl_giftcard_newGiftCard: '+ New Gift Card',
        lbl_giftcard_commonError: 'Oops... an error occurred.',
        lbl_billing_backLinkPickup: 'Return to Pickup',
        lbl_billing_backLinkShipping: 'Return to Shipping',
        lbl_billing_nextSubmit: 'NEXT: REVIEW',
        lbl_billing_paymentMethodTitle: 'Payment Method',
        lbl_billing_creditCard: 'Credit Card',
        lbl_billing_selectFromCard: 'Select from card on file',
        lbl_billing_addCreditHeading: '+ Add a new Credit Card',
        lbl_billing_default: 'Default',
        lbl_billing_cardDetailsTitle: 'Card Details',
        lbl_billing_editBtn: 'Edit',
        lbl_billing_creditCardEnd: 'ending in ',
        lbl_billing_billingAddress: 'Billing Address',
        lbl_billing_defaultPayment: 'Set as default payment method',
        lbl_billing_addCreditBtn: 'ADD A NEW CREDIT CARD',
        lbl_billing_paypal: 'Pay Pal',
        lbl_billing_venmo: 'Venmo',
        lbl_billing_default_card: 'DEFAULT',
        lbl_billing_selectCardTitle: 'SELECT CARD',
        lbl_billing_select: 'SELECT',
        lbl_payment_giftCardNoPlaceholder: 'Gift Card #',
        lbl_common_backLink: 'Back',
        lbl_payment_cancelCard: 'Cancel',
        lbl_payment_addCard: 'Apply',
        lbl_payment_giftCardPinPlaceholder: 'Pin #',
        lbl_payment_saveToAccount: 'Save gift card balance to my account',
        default_error: 'Oops... an error occured',
        lbl_billing_sameAsShipping: 'Same as shipping address',
        lbl_billing_saveToAccount: 'Save card to my account',
        lbl_billing_cvvCode: 'CVV Code',
        lbl_billing_addNewAddress: '+ Add a new address',
        lbl_billing_continueWith: 'Continue with',
        lbl_billing_cardEditCancel: 'Cancel',
        lbl_billing_cardEditSave: 'Save',
        lbl_billing_cardEditUnSavedError: 'You have one or more unsaved changes.',
        lbl_billing_defaultError:
          'The payment method entered could not be authorized for this purchase. Please review the information entered and try again or try an alternate form of payment',
        lbl_billing_addCC: 'Add a new CC',
        payment_saveToAccount: 'Save gift card balance to my account',
      },
    },
    global: {
      SignUp: {
        referred: null,
        enter_name: 'Enter your name',
        enter_password: 'Enter your password',
        incorrect_password: 'The password you entered is incorrect.',
      },
      navigation: {
        referred: null,
        home: 'MY HOME',
        shop: 'SHOP',
        account: 'ACCOUNT',
        wallet: 'WALLET',
      },
      countrySelector: {
        referred: [
          {
            name: 'lbl_global_country_selector_note',
            contentId: '3a94a9e1-91d1-40d0-99f8-ff051604c874',
            __typename: 'ReferredContent',
          },
        ],
        lbl_global_country: 'Country',
        lbl_global_language: 'Language',
        lbl_global_currency: 'Currency',
        lbl_global_country_selector_header: 'Ship To',
        lbl_global_country_selector_subheader: 'Change Shipping Preference',
        lbl_global_country_selector_cta: 'SAVE',
        lbl_global_country_selector_note:
          'NOTE: If you change your shipping destination, your shopping bag will be emptied and you’ll have to add your items again. Coupons and promotions may vary based on shipping destinations. Please read applicable Terms & Conditions.',
        d: '',
      },
      login: {
        referred: null,
        lbl_login_email: 'Email Address',
        lbl_login_emailTesting: 'Email Address TESTING',
        lbl_login_password: 'Password',
        lbl_login_loginCTA: 'LOG IN',
        lbl_login_rememberMe: 'Remember me. ',
        lbl_login_saveMyPlace:
          'Save My Place Rewards Credit Card ending in #number to my account for future purchases.',
        lbl_login_forgetPasswordCTA: 'Forgot password?',
        lbl_login_createAccountHelp:
          "Don't have an account? Create one now to start earning points! - US",
        lbl_login_createAccountCTA: 'CREATE ACCOUNT',
        lbl_login_heading: 'Welcome Back!',
        lbl_login_subHeading: 'Log in to earn points for MY PLACE REWARDS ',
        lbl_login_subDescription:
          'Signed up in store? An online account has been created with your email! Click here to reset your password.',
        lbl_login_error: 'An error occur !',
        lbl_login_rememberMeHelpText: 'Not recommended on shared devices',
        lbl_login_Description_heading_1: 'Signed up in store?',
        lbl_login_Description_heading_2: 'An online account has been created with your email!',
        lbl_login_subDescription_heading_1: 'Signed up in store?',
        lbl_login_subDescription_heading_2:
          ' An online account has been created with your email! Click here to reset your password.',
        lbl_login_createAccountHelp_1: "Don't have an account? Create one now to",
        lbl_login_createAccountHelp_2: 'start earning points!- US1',
        lbl_login_touch_id: 'User Touch ID',
        'lbl_login_error_.EMPTY_RECAPTCHA': 'Please check the recaptcha value.',
        'lbl_login_error_.2010':
          'Oops! The email or password you’ve entered is incorrect. Password must be at least 8 characters long and have at least 1 uppercase, 1 number and 1 special character.',
        'lbl_login_error_.INVALID_RECAPTCHA': 'Please re-check the recaptcha value.',
        lbl_login_error_checkout_modal_heading: 'Welcome Back!',
        lbl_login_error_checkout_modal_heading_1: 'Log in to earn points for',
        lbl_login_error_checkout_modal_heading_2: '  MY PLACE REWARDS.',
        lbl_login_error_favorites_modal_heading: 'Love it. Save it. Share it!',
        lbl_login_error_favorites_modal_heading_1:
          'Note: It can’t be your last password or your email addresss.',
        lbl_login_modal_checkout_as_guest: 'CONTINUE AS GUEST',
        lbl_login_checkout_modal_heading: 'Welcome Back!',
        lbl_login_checkout_modal_heading_1: 'Log in to earn points for',
        lbl_login_checkout_modal_heading_2: ' MY PLACE REWARDS.',
        lbl_login_favorites_modal_heading: 'Love it. Save it. Share it!',
       lbl_login_favorites_modal_heading_1:
          'Note: It cant be your last password or your email addresss.',
        lbl_login_show: 'Show',
        lbl_login_hide: 'Hide',
        'lbl_login_error_.2110':
          'Sorry, you’ve entered an incorrect password multiple times. For your security, the account has been locked. Please <a href="JavaScript:void(0)" onclick="document.getElementById(\'forgotPasswordForm\').click()">click here</a> to reset password.',
        lbl_login_tooltip:
          '<div class="tooltip-content"><h3>Password Requirements</h3><p>Password Requirements:</p><ul><li>- Must be at least 8 characters long</li><li>- Must have at least 1 uppercase letter</li><li>- Must contain 1 number</li><li>- Must contain 1 special character',
       lbl_login_Description_clickhere: 'Click here',
        lbl_login_Description_heading_3: ' to reset your password.',
        lbl_forgotpassword_error_2010:
          'Sorry, we couldn\'t find an account associated with that email address. Please try again. Signed up in store? You must <a href="#">create an online account</a> before attempting to log in.',
        'lbl_login_error_app_.2110':
          'Sorry.you’ve entered an incorrect password multiple times.For your security, the account has been locked.Please click here to reset your password.',
        'lbl_login_error_.ERR_PASSWORD_EXPIRED':
          'The current password has expired. A new password must be specified.',
        lbl_resetpassword_error_CWXFR0230E:
          'Internal server error. Details will be stored within the server logs.',
        lbl_resetpassword_error: 'An error occur',
        lbl_login_face_id: 'User Face ID',
       lbl_resetpassword_error__ERR_AUTHENTICATION_REUSEOLD_PASSWORD:
          'Your new password cannot replicate any recent passwords you may have used. Please select another password and try again.',
        lbl_login_error__ERR_BAD_PARMS:
          "Sorry, we couldn't find an account associated with that email address. Please try again.",
        lbl_login_Description_1: 'Signed up in store?',
        lbl_login_Description_2: 'An online account has been created with your email!',
        lbl_login_subDescription_3: 'Click here to reset your password.',
        lbl_login_heading_2: 'Please log into your MY PLACE account for faster checkout.',
      },
      bonusPoints: {
        referred: null,
        lbl_bonusPoints_usedOn: 'USED ON',
        lbl_bonusPoints_futureUse: 'AVAILABLE FOR FUTURE USE',
        lbl_bonusPoints_ctaApply: 'AVAILABLE TODAY!',
        lbl_bonusPoints_placeRewardsBonus: 'BONUS',
        lbl_bonusPoints_placeRewardsDay: 'DAY',
        lbl_bonusPoints_applyAnyDay: 'Apply to any day. Your choice!',
        lbl_bonusPoints_msg:
          'My Place Rewards members get double points…Use your My Place Rewards Credit Card to get triple!',
        lbl_bonusPoints_myRewardsUsedAll: "You've used all your available Bonus Points Days.",
        lbl_bonusPoints_daysLeft: 'You have {0} day left.',
        lbl_bonusPoints_day: 'BONUS POINTS DAY',
        lbl_bonusPoints_detailLink: 'Details',
        lbl_bonusPoints_placeRewardsPoints: 'POINTS',
        lbl_bonusPoints_ctaApplied: 'Applied to Order',
        lbl_bonusPoints_details: 'Details',
      },
      checkoutConfirmation: {
        referred: null,
        lbl_checkoutmodal_confirmation:
          'Some of the item(s) in your bag are either sold out or need updating. Continuing with checkout will remove them from your bag.',
        lbl_checkoutmodal_backToBag: 'BACK TO BAG',
        lbl_checkoutmodal_continueCheckout: 'CONTINUE TO CHECKOUT',
        lbl_checkoutmodal_editConfirmation:
          'You have unsaved changes in your bag. Still want to continue?',
      },
      airmilesBanner: {
        referred: null,
        lbl_airmilesBanner_collectorNumber: 'Collector Number',
        lbl_airmilesBanner_headerText:
          'Enter your AIR MILES® Collector Number and Promo ID (when applicable) to earn amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt.',
        lbl_airmilesBanner_offerCode: 'Offer Code (optional)',
        lbl_airmilesBanner_footerText:
          '® ™ Trademarks of AM Royalties Limited Partnership used under license by LoyaltyOne, Co. and The Children’s Place.',
        lbl_airmilesBanner_collectorFlyout:
          'Look for your 11-digit Collector Number on your AIR MLES® Card or on your digital AIR MILES® Card in the AIR MILES® app',
        lbl_airmilesBanner_offerFlyout:
          'Promo IDs are provided during limited time bonus events and help you earn AIR MILES® reward miles even faster. Promo ID is not required to earn AIR MILES®.',
        lbl_airmilesBanner_exactLength: 'Must be an 11 digit number',
        lbl_airmilesBanner_collectorOnlyNumber: 'Must be numbers only',
      },
      referAFriend: {
        referred: null,
        text: 'REFER A FRIEND',
      },
      rewardPoints: {
        referred: null,
        lbl_rewardPoints_currentPoints: 'Current Points',
        lbl_rewardPoints_nextReward: 'Points to next reward',
        lbl_rewardPoints_currency: '$',
        lbl_rewardPoints_heading: 'My Rewards',
      },
      addedToBagModal: {
        referred: [
          {
            name: 'NEED_HELP_DATA',
            contentId: 'b25ffa9d-0b2f-424b-a930-ff30199fbd55',
            __typename: 'ReferredContent',
          },
        ],
        lbl_cta_viewBag: 'View Bag',
        lbl_cta_checkout: 'Checkout',
        lbl_header_addedToBag: 'ADDED TO BAG',
        lbl_info_color: 'Color',
        lbl_info_size: 'Size',
        lbl_info_Qty: 'Qty',
        lbl_info_price: 'Price',
        lbl_info_pointYouCanEarn: 'Points you can earn on Item(s)',
        lbl_info_subTotal: 'Bag Subtotal (#items items)',
        lbl_info_totalRewardsInBag: 'Total My Place Reward Points in Bag',
        lbl_info_totalNextRewards: 'Total Points to Next Reward',
        lbl_bossBanner_headingDefault: 'PICK UP IN STORE AND SAVE AN EXTRA #value',
        lbl_bossBanner_subHeadingDefault: 'Simply choose “#type” in your bag before checking out.',
        lbl_bossBanner_noRush: 'NO RUSH Pick Up',
        lbl_info_giftDesign: 'Design',
        lbl_info_giftValue: 'Value',
        lbl_footer_continueShopping: 'Continue Shopping',
        name: 'NEED_HELP_DATA',
      },
      recommendations: {
        referred: null,
        MODULE_O_HEADER_LABEL: 'You May Also Like',
        CTA_TEXT: 'Shop Now',
        CTA_URL: '/c/girls-clothing',
        CTA_TITLE: 'Shop Now Title',
        MODULE_P_HEADER_LABEL: 'You May Also Like',
      },
      formValidation: {
        referred: null,
        lbl_err_email: 'Email format is invalid.',
        lbl_err_email_req: 'Please enter a valid email',
        lbl_err_req: 'This field is required',
        lbl_err_firstname_nonempty: 'Please enter a first name',
        lbl_err_firstname_name: 'First name field should not contain any special Characters',
        lbl_err_firstname_maxlength: 'Please enter a valid first name',
        lbl_err_lastname_nonempty: 'Please enter a last name',
        lbl_err_lastname_name: 'Last name field should not contain any special characters',
        lbl_err_lastname_maxlength: 'Please enter a valid last name',
        lbl_err_phonenumber_required: 'Please enter your phone number.',
        lbl_err_phonenumber_phone: 'Please enter a valid phone number',
        lbl_err_zipcode_required: 'Please enter your zip code.',
        lbl_err_zipcode_zipcode: 'Please enter a valid zip code',
        lbl_err_password_required: 'Please enter your password',
        lbl_err_password_password: 'Please enter a valid password',
        lbl_err_currentpassword_password: 'Your current password is incorrect. Please try again.',
        lbl_err_currentpassword_equalto: 'Passwords must match',
        lbl_err_dob_required: 'Please enter a valid birth date',
        lbl_err_airmilesaccountnumber: 'Please enter a valid 11 digit Air Miles ID',
        lbl_err_associateid: 'The Associate ID you entered does not exist. Please try again',
        lbl_err_iagree: 'You must agree to the Terms and Conditions to submit the form',
        lbl_err_ssnumber_ssn: 'Please enter the last 4 digits of your social security number',
        lbl_err_birthdate: 'Please enter a valid date of birth',
        lbl_err_statewocountry_required: 'Please enter a valid state',
        lbl_err_date_dob: 'Please select a day',
        lbl_err_month_dob: 'Please select a month',
        lbl_err_year_dob: 'Please select a year',
        lbl_err_ordernumber: 'ERROR: Please enter a valid order number.',
        lbl_err_prescreencode: 'Please enter a valid pre-screen code',
        lbl_err_confirmemailaddress_required: 'Please confirm your email address',
        lbl_err_confirmemailaddress_matchemail: 'Email addresses must match',
        lbl_err_recaptchatoken_required: 'Please check the recaptcha value',
        lbl_err_cardnumber_required: 'Please enter a valid credit card number',
        lbl_err_cardnumber_type: 'Please enter a valid credit card number',
        lbl_err_cardnumber_plccenabled: 'This card can only be used when shopping the US store',
        lbl_err_giftcardnumber: 'Please enter a valid gift card number',
        lbl_err_cardpin: 'Please enter your gift card pin number',
        lbl_err_validstreetaddress: 'Please enter a valid street address',
        lbl_err_validexpirationedate: 'Please enter a valid expiration date',
        lbl_err_addressline1_address:
          'The value entered in the street address has special character',
        lbl_err_addressline1_maxlength: 'Please shorten the street address',
        lbl_err_addressline2_address:
          'The value entered in the street address has special character',
        lbl_err_city_nonempty: 'Please enter a valid city',
        lbl_err_city_city: 'The value entered in the city has special character',
        lbl_err_country_required: 'Please select a country',
        lbl_err_email_validemail: 'Email format is invalid',
        lbl_err_state_staterequired_us: 'Please select a state',
        lbl_err_state_staterequired_nonus: 'Please select a province',
        lbl_err_altphonenumber_notequalto: 'Phone numbers must not match',
        lbl_err_emailaddressnoasync: 'ERROR: Email format is invalid',
        lbl_err_cvvcode_required: 'Please enter a valid security code',
        lbl_err_cvvcode_cvvnumber: 'Please enter a valid security code',
        lbl_err_cvvcode_cvvlengththree: 'Security code must be a 3-digit number without any spaces',
        lbl_err_cvvcode_cvvlengthfour: 'Security code must be a 4-digit number without any spaces',
        lbl_err_userbirthdaymonth_required: 'Please select a month',
        lbl_err_userbirthdayyear_required: 'Please select a year',
        lbl_err_name_nonempty: 'Please enter a name',
        lbl_err_name_name: 'Name field should not contain any special Characters',
        lbl_err_name_maxlength: 'Please enter a valid name',
        lbl_err_gender_required: 'Please select a gender',
        lbl_err_accept_tna_required: 'Please accept the terms by selecting the box above.',
        lbl_err_store_number_required: 'Please enter the store number',
        lbl_err_store_number_invalid: 'Please enter a valid store number',
        lbl_err_register_number_required: 'This field is required',
        lbl_err_register_number_invalid: 'Please enter a valid Register number',
        lbl_err_transaction_date_required: 'Field is required',
        lbl_err_transaction_number_required: 'This field is required',
        lbl_err_transaction_number_invalid: 'Please enter a valid value',
        lbl_err_order_date_required: 'Please enter the order date',
        lbl_err_order_number_invalid: 'Please enter the order number',
      },
      plccForm: {
        referred: [
          {
            name: 'account_classified_disclaimer',
            contentId: 'dffae649-e694-4971-ab25-00d7b63aa34c',
            __typename: 'ReferredContent',
          },
          {
            name: 'credit_card_header',
            contentId: 'a0503f84-e10a-4ddd-b11f-5df3580afe1f',
            __typename: 'ReferredContent',
          },
          {
            name: 'electronic_consent',
            contentId: 'a26e03ff-727a-474d-998c-ee940062ba7a',
            __typename: 'ReferredContent',
          },
          {
            name: 'contact_information_disclaimer',
            contentId: 'c78ce0c8-ec88-474c-aef6-4e9b9e58aecb',
            __typename: 'ReferredContent',
          },
          {
            name: 'pre_screen_code',
            contentId: 'fe596dbc-897f-4e61-b6b7-1de47024a38b',
            __typename: 'ReferredContent',
          },
          {
            name: 'plcc_rewards_list',
            contentId: '7e119722-4409-4193-9d71-345812200c4f',
            __typename: 'ReferredContent',
          },
          {
            name: 'plcc_existing_customer_details',
            contentId: '179ba6f0-24ec-48e7-8b90-8f5f927ad8c1',
            __typename: 'ReferredContent',
          },
          {
            name: 'plcc_shipping_info',
            contentId: '9eadcbf2-ac65-497e-8c0f-25cb0c2f762e',
            __typename: 'ReferredContent',
          },
          {
            name: 'plcc_approved_ps',
            contentId: 'ab353ed6-1d60-457f-ac1c-61992d6ac1dd',
            __typename: 'ReferredContent',
          },
          {
            name: 'total_savings_amount',
            contentId: 'e94724aa-0733-4ca4-80c9-5335ec296751',
            __typename: 'ReferredContent',
          },
          {
            name: 'guest_shipping_info',
            contentId: 'a20ddeed-3bf1-47c7-8c9b-7eaa35b629a0',
            __typename: 'ReferredContent',
          },
          {
            name: 'rewards_card_welcome',
            contentId: 'd1458b0a-d0b7-4f99-a305-8e0fd135c179',
            __typename: 'ReferredContent',
          },
        ],
        lbl_PLCCForm_firstName: 'First Name',
        lbl_PLCCForm_rewardsCardHeading: 'MY FIRST REWARDS CREDIT CARD',
        lbl_PLCCForm_backButton: 'Back',
        lbl_PLCCForm_contactInfoHeader: 'CONTACT INFORMATION',
        lbl_PLCCForm_middleNameInitial: 'M.I.',
        lbl_PLCCForm_lastName: 'Last Name',
        lbl_PLCCForm_addressLine1: 'Address Line 1',
        lbl_PLCCForm_addressLine2: 'Address Line 2 (Optional)',
        lbl_PLCCForm_city: 'City',
        lbl_PLCCForm_state: 'State',
        lbl_PLCCForm_zipCode: 'Zip Code',
        lbl_PLCCForm_mobilePhoneNumber: 'Mobile Phone Number*',
        lbl_PLCCForm_email: 'Email',
        lbl_PLCCForm_alternatePhone: 'Alternate Phone Number',
        lbl_PLCCForm_minPhone: 'At least one phone number is required',
        lbl_PLCCForm_personalInfo: 'PERSONAL INFORMATION',
        lbl_PLCCForm_dob: 'Date of Birth',
        plcc_form_electronic_consent: 'Electronic Consent',
        lbl_PLCCForm_financialTermsHeading: 'Financial Terms of Your Account',
        lbl_PLCCForm_iAgreeCheckboxText:
          "By checking this box and clicking 'Submit to open an account' I agree to the Terms and Conditions, acknowledge receipt of the Privacy Notice, consent to receive documents electronically, and electronically sign this application/solicitation.",
       lbl_PLCCForm_submitButton: 'SUBMIT TO OPEN AN ACCOUNT',
        lbl_PLCCForm_noThanks: 'No thanks',
        plcc_form_list_heading:
          'Please review the important information and terms about opening a ${<b>MY PLACE REWARDS CREDIT CARD</b>} account prior to submitting your application or accepting a pre-approved offer.',
        plcc_form_list_item1: 'Be at the age of majority in your state or territory',
        plcc_form_list_item2: 'Have a valid government-issued photo ID',
        plcc_form_list_item3:
          'Have a valid government issued tax identification number (such as a SSN or SIN)',
        plcc_form_list_item4:
          'Have a street, rural route or APO/FPO mailing address (no P.O. Boxes)',
        lbl_PLCCForm_preScreenCodeText: 'If you’ve received a pre-screen code, ',
        lbl_PLCCForm_clickHere: 'click here.',
        lbl_PLCCForm_preScreenCodeOpt: 'Enter Pre-Screen Code (optional)',
        lbl_PLCCForm_enterHere: 'enter it here.',
        lbl_PLCCForm_ssn: 'Last 4 Digits of SSN',
        lbl_PLCCForm_underProgress: 'Your information is under review and is being processed.',
        lbl_PLCCForm_underProcessDetails:
          "Your MY PLACE REWARDS CREDIT CARD application needs further review. You will be notified by mail within 10 business days with your account's status.",
        lbl_PLCCForm_ctcButton: 'CONTINUE TO CHECKOUT',
        lbl_PLCCForm_continueShopping: 'CONTINUE SHOPPING',
        lbl_PLCCForm_statePlaceholder: 'Select',
        lbl_PLCCModal_applyNowHeaderText: 'Save 30% Today!',
        lbl_PLCCModal_applyNowSubText: 'When you Open & Use a My Place Rewards Credit Card',
        lbl_PLCCModal_applyNowCTA: 'APPLY OR ACCEPT OFFER',
        lbl_PLCCModal_learnMoreText: 'Learn More',
        lbl_PLCCModal_benefitsText: 'Bigger, Better Benefits',
        lbl_PLCCForm_details: 'Details',
        lbl_PLCCModal_faqText: 'FAQ',
        lbl_PLCCModal_rewardsProgramText: 'Reward Terms',
        lbl_PLCCModal_linksTextPrefix: '*§**†',
        apply_now_double: 'DOUBLE POINTS',
        apply_now_double_subtext: ' on every credit card purchase*',
        apply_now_discount_30: '30% OFF',
        apply_now_discount_30_subtext: ' your first credit card purchase',
        apply_now_discount_25: '25% OFF',
        apply_now_discount_25_subtext: " for your kids' birthdays!**",
        apply_now_discount_20: '20% OFF',
        apply_now_discount_20_subtext: ' when you get card',
        apply_now_discount_standard: 'FREE STANDARD SHIPPING ',
        apply_now_discount_standard_subtext: ' every day',
        lbl_PLCCModal_learnMoreLink:
          'https://www.childrensplace.com/us/place-card?ecid=mprcc_txt_learn_glft_100916',
        lbl_PLCCModal_detailsLink:
          'https://www.childrensplace.com/us/place-card?ecid=mprcc_txt_learn_glft_100916',
        lbl_PLCCModal_rewardsProgramLink:
          'https://www.childrensplace.com/us/help-center/#fullTermsli',
        lbl_PLCCModal_faqLink: 'https://www.childrensplace.com/us/help-center/#creditcard',
        lbl_PLCCModal_applyNowLink: 'Apply Now',
        lbl_PLCCModal_oneEqualsTwoPoints: 'true',
        plccc_approved_saving: 'You could could save $12.74 on your current order!',
        plcc_approved_ps:
          'P.S. You’ll also receive this coupon via email. Once this window is closed, you will not have access to this page. Please copy your coupon code.',
        lbl_PLCCForm_copyToClipboard: 'Copy to Clipboard',
        lbl_PLCCForm_welcomeOffer: 'YOUR WELCOME OFFER',
        lbl_PLCCForm_creditLimit: 'YOUR CREDIT LIMIT: ',
        lbl_PLCCForm_congratulations: 'Congratulations, ',
        lbl_PLCCForm_checkout: 'CHECKOUT',
        lbl_PLCCTimeoutModal_applicationClosure: 'We’ve closed your application.',
        lbl_PLCCTimeoutModal_restartApplication: 'Restart Application',
        lbl_PLCCTimeoutModal_closureSubHeader:
          'To protect your privacy, we have closed this session.',
        lbl_PLCCTimeoutModal_stillThere: 'Still there?',
        lbl_PLCCTimeoutModal_interimText:
          'To protect your privacy, we will close this page in XX seconds if you don’t choose to continue.',
        lbl_PLCCTimeoutModal_continueApplication: 'Continue Application',
        lbl_PLCCTimeoutModal_preacceptance: 'We’ve closed your pre-screen acceptance.',
        lbl_PLCCTimeoutModal_restartAcceptance: 'Restart Accpetance',
        lbl_PLCCTimeoutModal_returnCheckout: 'RETURN TO CHECKOUT',
        lbl_PLCCForm_footerlinksPrefix: '*§**†',
      },
      getCandid: {
        referred: null,
        lbl_getCandid_title: '#MyStylePlace',
        lbl_getCandid_titleDescription:
          "Show us how you're celebrating every big & small occasion, in style!",
        lbl_getCandid_BtnGallery: 'VIEW GALLERY',
        lbl_getCandid_BtnPhoto: 'ADD PHOTO',
        lbl_getCandid_BtnShopNow: 'SHOP NOW',
        lbl_getCandid_btnSeeMore: 'See More',
        lbl_getCandid_titleShopThisLook: 'Shop This Look',
        lbl_getCandid_btnLoadMore: 'Load More',
      },
      trackOrder: {
        referred: null,
        lbl_trackOrder_header: 'Track Order',
        lbl_trackOrder_subheader: 'Enter your email address and order number',
        lbl_trackOrder_trackOrderBtn: 'TRACK ORDER',
        lbl_trackOrder_haveAccount: 'Have an account?',
        lbl_trackOrder_content: ' to see your order history.',
        lbl_trackOrder_subContent: ' to track an international order.',
        lbl_trackOrder_login: 'Log in',
        lbl_trackOrder_clickHere: 'Click here',
        lbl_trackOrder_emailPlaceholder: 'Email Address',
        lbl_trackOrder_orderNoPlaceholder: 'Order Number',
        lbl_trackOrder_needHelp: 'Need Help?',
        lbl_trackOrder_internationTrackOrderLink: 'https://www.borderfree.com/order-status/',
        lbl_trackOrder_needHelpLink: 'https://www.childrensplace.com/us/help-center/#faq',
        lbl_trackOrder_trackOrderHeaderLink: 'Track Order',
        lbl_trackOrder_genericErrorTryAgain: 'Please try again or',
        lbl_trackOrder_genericErrorLinkText: 'Contact us',
        lbl_trackOrder_genericErrorLinkHref:
          'https://www.childrensplace.com/us/help-center/contact-us',
        lbl_trackOrder_genericErrorAssistance: 'for assistance.',
        lbl_header_trackOrderOverlay_appHeader: 'TRACK YOUR ORDER',
      },
      footerDefault: {
        referred: null,
        lbl_footerDefault_connectwithus: 'CONNECT WITH US:',
        lbl_footerDefault_referenceId: 'Reference ID :',
      },
      addEditAddress: {
        referred: null,
        lbl_addEditAddress_editAddress: 'EDIT ADDRESS',
        lbl_addEditAddress_addAddress: 'Add Address',
        lbl_addEditAddress_fname: 'First Name',
        lbl_addEditAddress_lname: 'Last Name',
        lbl_addEditAddress_addressLine1: 'Address Line 1',
        lbl_addEditAddress_addressLine2: 'Address Line 2 (Optional)',
        lbl_addEditAddress_city: 'City',
        lbl_addEditAddress_state: 'State',
        lbl_addEditAddress_province: 'Province',
        lbl_addEditAddress_zipCode: 'Zip Code',
        lbl_addEditAddress_postalCode: 'Postal Code',
        lbl_addEditAddress_country: 'Country',
        lbl_addEditAddress_phoneNumber: 'Phone Number',
        lbl_addEditAddress_setDefault: 'Set as default shipping address',
        lbl_addEditAddress_addressButton: 'ADD ADDRESS',
        lbl_addEditAddress_update: 'UPDATE',
        lbl_addEditAddress_cancel: 'CANCEL',
        lbl_addEditAddress_errorMessageAE09:
          'There may be an issue with your address as entered. Please double check it, or if you believe the address is correct you can continue to the next step.',
        lbl_addEditAddress_errorMessageAE10:
          'The house / building number is missing from your address. Please review and confirm your address.',
        lbl_addEditAddress_errorMessageAE11:
          'The house / building number is not valid. Please review and confirm your address.',
        lbl_addEditAddress_errorMessageAE12:
          'The house / building number is not valid. Please review and confirm your address.',
        lbl_addEditAddress_errorMessageDefault:
          'There may be an issue with your address as entered. Please double check it, or select from the below.',
        lbl_addEditAddress_entered: 'YOU ENTERED',
        lbl_addEditAddress_suggest: 'WE SUGGEST',
        lbl_addEditAddress_verifyHeader: 'Verify Your Address',
        lbl_addEditAddress_continueCta: 'CONTINUE',
        lbl_addEditAddress_internationalShipping: 'Shipping internationally',
        lbl_addEditAddress_error_zipCode: 'There was a missing parameter: zipCode',
        lbl_addEditAddress_error: 'An error occur in api',
        lbl_addEditAddress_select: 'Select',
        lbl_addEditAddress_addNewAddress: '+ Add New Address',
        lbl_addEditAddress_selectFromAddress: 'Select from Address Book',
      },
      minibag: {
        referred: null,
        lbl_miniBag_createAccount: 'Create Account',
        lbl_miniBag_logIn: 'Log In',
        lbl_miniBag_inRewards: 'in Rewards',
        lbl_miniBag_hi: 'Hi',
        lbl_miniBag_viewBag: 'View Bag',
        lbl_miniBag_ViewSaveForLater: 'View Saved for Later',
        lbl_miniBag_subTotal: 'Subtotal',
        lbl_miniBag_checkout: 'Checkout',
        lbl_miniBag_yourShoppingBag: 'YOUR SHOPPING BAG IS EMPTY',
        lbl_miniBag_dontHaveAccount: 'Don’t have an account?',
        lbl_miniBag_createOne: 'Create one now to start earning points!',
        lbl_miniBag_error: 'Please #remove# the sold out items from your bag before you check out.',
        lbl_miniBag_itemUnavailable: 'This item is unavailable',
        lbl_miniBag_itemSoldOut: 'This item is sold out',
        lbl_miniBag_soldOut: 'SOLD OUT',
        lbl_miniBag_problemWithOrder: 'There’s a problem with your order.',
        lbl_miniBag_chooseDiff: 'Choose a different color, size, fit, or qty.',
        lbl_minibag_errorSize: 'Please select a size',
        lbl_minibag_itemUpdated: 'Your item has been updated',
        lbl_minibag_itemDeleted: 'Your item has been deleted',
        lbl_minibag_errorUpdateUnavailable:
          'Please #remove# one or more sold-out from your bag before you checkout',
        lbl_minibag_errorRemoveSoldoutHeader:
          'Please update one or more items out of stock items from your bag before you checkout',
        lbl_minibag_errorRemove: 'remove',
      },
      accountDrawer: {
        referred: null,
        lbl_accountDrawer_MyFavorite: 'My Favorites',
        lbl_accountDrawer_myPlaceRewardsCC: 'My Place Rewards Credit Card',
        lbl_accountDrawer_wallet: 'Wallet',
        lbl_accountDrawer_others: 'Orders',
        lbl_accountDrawer_signOut: 'Sign Out',
        lbl_drawer_view_my_acc: 'View My Account',
        lbl_drawer_earn_extra: 'Want to Earn Extra Points?',
        lbl_drawer_get_closer: 'Get even closer to your next reward!',
        lbl_drawer_learn_more: 'Learn More',
      },
      accessibility: {
        referred: null,
        lbl_accessibility_backButton: 'Click To go back',
        playIconButton: 'play. please click to pause.',
        pauseIconButton: 'pause. please click to play.',
        previousButton: 'Previous',
        closeIconButton: 'close',
        cartIconButton: 'cart',
        accountIconButton: 'account',
        searchIconButton: 'search',
        hamburgerMenu: 'hamburger menu',
        nextIconButton: 'next',
      },
      errorMessages: {
        referred: null,
        lbl_errorMessages_TCP_COUPON_USED_ALREADY:
          'One or more of your coupons have already been redeemed. Please remove the coupon(s) and try again.',
        lbl_errorMessages_2270: 'Password must include at least 1 uppercase character(s).',
        lbl_errorMessages_2080: 'Password must include at least 1 special character(s).',
        'lbl_errorMessages_.2030':
          'Oops! The email or password you’ve entered is incorrect. Password must be at least 8 characters long and have at least 1 uppercase, 1 number and 1 special character.',
        lbl_errorMessages_ERR_LOGONID_ALREDY_EXIST:
          'The email address you entered matches an existing account.',
        lbl_errorMessages_1005: 'You have entered an invalid card number.',
        'lbl_errorMessages_.2010':
          'Oops! The email or password you’ve entered is incorrect. Password must be at least 8 characters long and have at least 1 uppercase, 1 number and 1 special character.',
        'lbl_errorMessages_.2210': 'Please review the password requirements and try again',
        lbl_errorMessages_ERR_ORDER_NOT_FOUND: 'Sorry, that order was not found. Please try again.',
        lbl_errorMessages_TCPGC06: 'Please try again.',
        lbl_errorMessages_ERR_DUPLICATE_GIFT_CARD:
          'That gift card number has already been applied to your order. Please enter a different gift card number.',
        lbl_errorMessages_ERR_DUPLICATE_CARD: 'Please check if the card is already in use.',
        lbl_errorMessages_ERR_PAY_CARD_NUMBER_INVALID:
          'The credit card number is not valid. Type the number of the credit card in the Credit card number field and try again.',
        lbl_errorMessages_500: 'Uh oh... System error. Please try again.',
        lbl_errorMessages_ERR_PROMOTION_CODE_INVALID:
          'Sorry, this code is invalid. Please verify it and try again.',
        lbl_errorMessages_ERR_MISSING_CMD_PARAMETER:
          "My Place Rewards cannot be applied when you're shopping as a guest. Please log in.",
        lbl_errorMessages_TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET:
          'The code you used is not applicable. Note: My Place Rewards are not transferable between accounts. Please verify your code and try again.',
        lbl_errorMessages_TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER:
          "My Place Rewards cannot be applied when you're shopping as a guest. Please log in",
        lbl_errorMessages_ERR_USER_AUTHORITY:
          'The user does not have the authority to run this command.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED:
          'You cannot use a United States based Paypal account when shipping to Canada, and conversely you cannot use a Canadian based Paypal account when shipping to the United States.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED:
          'You cannot use a United States based Paypal account when shipping to Canada, and conversely you cannot use a Canadian based Paypal account when shipping to the United States.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT:
          'Please update the shipping information on your Pay-Pal account, including first and last name.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_BILLING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT:
          'Please update the billing information on your Pay-Pal account, including first and last name.',
        lbl_errorMessages_TCP02:
          'Oops... The card and/or pin number you entered is incorrect. Please try again.',
        lbl_errorMessages_SVS20: 'Giftcard authorization declined.',
        lbl_errorMessages_ERR_INVALID_PIN_CARD:
          'Oops... The card and/or pin number you entered is incorrect. Please try again.',
        lbl_errorMessages_CMN0409E:
          'Oops... The card and/or pin number you entered is incorrect. Please try again.',
        lbl_errorMessages_ERR_GIFTCARD_SVS15:
          'Oops... The card and/or pin number you entered is incorrect. Please try again.',
        lbl_errorMessages_SVS15:
          'Oops... The card and/or pin number you entered is incorrect. Please try again',
        lbl_errorMessages_SVS16:
          'We are sorry; however, the Gift Card isn’t currently valid. Please try again with another form of payment.',
        lbl_errorMessages_GIFT_CARD_RECAPTCHA_FAILED: 'Please try again',
        lbl_errorMessages_ERR_GIFTCARD_SVS20: 'Giftcard authorization declined.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED:
          'User canceled session when logged in to PayPal.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_GENERIC_ERROR:
          'Oops... there was an issue with your PayPal payment. Please try again.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE:
          'Oops... there was an issue with your PayPal payment. Please try again.',
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR:
          'Oops... Your city, state, and zip code do not match. Please update your address on the shipping step.',
        lbl_errorMessages_TCP_MIX_ORDER_NOT_ACCEPTED_NOW: 'System does not accept MIX orders now.',
        lbl_errorMessages_TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW:
          'Sorry, pick up in store is currently unavailable. Please go back to your shopping bag to ship or remove the items.',
        lbl_errorMessages_INVALID_PARAM: 'element will have name of parameter having problem.',
        lbl_errorMessages_MANDATORY_PARAM_NOT_PASSED: 'one of the mandatory parameters not passed.',
        lbl_errorMessages_ERR_BAD_PARMS:
          "Sorry, we couldn't find an account associated with that email address. Please try again.",
        lbl_errorMessages_OOS_OR_UNAVAILABLE:
          'Some of the item(s) in your bag are either sold out or need updating. Continuing with checkout will remove them from your bag.',
        lbl_errorMessages_SVS07:
          'Sorry, the gift card entered does not have an available balance. Please enter a new gift card or select a new payment type.',
        lbl_errorMessages_SVS08: 'Giftcard authorization declined.',
        lbl_errorMessages_TCP_ERROR_CODE_CARD_DECLINED: 'Giftcard authorization declined.',
        lbl_errorMessages_DEFAULT: 'Oops... an error occured',
        lbl_errorMessages_TCP_PAYMENT_PROCESSING_ERR:
          'We are sorry, however we are unable to obtain authorization to charge this credit card. Please try again with an another form of payment.',
        lbl_errorMessages_DBG_API_DO_PAYMENT_BAD_XDATE:
          'Uh oh... It looks like the credit card has expired. Please update or add a new card.',
        lbl_errorMessages_ERR_TAXWARE_UTL_GENERAL_CC:
          'Sorry, we are having difficulty calculating the tax. This may be a system error or an issue with the address provided. Please confirm and try again.',
        lbl_errorMessages_CODE_NOT_APPLICABLE:
          'Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.',
        lbl_errorMessages_ERR_US_ZIPCODE_INVALID: 'Please enter a valid zipcode',
        lbl_errorMessages_ERR_TAXWARE_UTL_RC:
          'Sorry, we are having difficulty calculating the tax. This may be a system error or an issue with the address provided. Please confirm and try again.',
        lbl_errorMessages_TCP06:
          'Please enter a gift card in US Dollars or use another form of payment.',
        lbl_errorMessages_TCP07:
          'Please enter a gift card in Canadian Dollars or use another form of payment.',
        lbl_errorMessages_INTERNAL_SERVER_ERROR: 'Oops... There was an issue, please try again.',
        lbl_errorMessages_ERR_INTERNAL_SERVER_ERROR:
          'There was a problem logging out. Please try again.',
        lbl_errorMessages_CWXFR0230E: 'There was a problem logging out. Please try again.',
        lbl_errorMessages_DOM_HISTORY_ERROR_DETECTED:
          'We are sorry, your order history is not available at this time. Please try again later.',
        lbl_errorMessages_ERR_RDN_ALREADY_EXIST:
          'The email address you provided matches an existing account. Please try another email address.',
        lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST:
          'The employee id you entered does not exist. Type a different employee id and try again.',
        lbl_errorMessages_ASSOCIATE_ID_DOES_NOT_EXIST:
          'The Associate ID you entered does not exist. Please try again.',
        lbl_errorMessages_ASSOCIATE_ID_NOT_VALID:
          "The Associate ID you entered doesn't match the name in our records. Please try again.",
        lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER:
          'The Associate ID you entered does not exist. Please try again.',
        lbl_errorMessages_INVALID_CURRENT_PASSWORD:
          'Your current password is incorrect. Please try again.',
        lbl_errorMessages_ERR_MAX_LIMIT_REACHED:
          'A maximum of five payment methods may be saved to your account.',
        lbl_errorMessages_INVALID_PRESCREEN_CODE: 'INVALID_PRESCREEN_CODE',
        lbl_errorMessages_13007: 'INVALID_PRESCREEN_CODE',
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_2: 'Names do not match Credit Card.',
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_3: 'No Transaction Found.',
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_4: 'Transaction already assigned a MyplaceID.',
        lbl_errorMessages_ERR_SYSTEM_NOT_AVAILABLE:
          'We are unable to process your request. Please try again later.',
        lbl_errorMessages_ERR_ORD_EMAIL_MISMATCH:
          'Sorry, that order was not found. Please try again.',
        lbl_errorMessages_TCPBPO01:
          'Sorry... Pickup in store is not currently available in Canada.',
        lbl_errorMessages_BOPIS_NOT_AVAILABLE:
          'Sorry... Pickup in store is not currently available in Canada.',
        lbl_errorMessages_NO_STORES_FOUND:
          "Sorry... We couldn't find a store within your search parameters.",
        lbl_errorMessages_ERR_SOMETHING_WRONG:
          'Something went wrong. Please check your details and try again.',
        lbl_errorMessages_ERROR_OCCURED: 'Cannot share for more than 5 users.',
        lbl_errorMessages_ERR_GIFTLIST_NAME_TOO_LONG:
          'Favorites List titles cannot be over 68 characters. Please rename.',
        lbl_errorMessages_ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND:
          'Sorry, we are unable to add this item to your favorites.',
        lbl_errorMessages_OOB_ERROR:
          "We're sorry, you have reached the 15 quantity limit for this item. Please select another colour or size.",
        lbl_errorMessages_WIC_RTPS_COUPON_NOT_APPLIED:
          'We attempted to apply your offer, but, it does not combine with offers already applied to your order. We’ve saved your coupon to your My Place Rewards account.',
        lbl_errorMessages_RTPS_INACTIVE_PAYMENT:
          'Sorry, there was an issue with your payment. Please re-enter your payment information and try again.',
        lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR:
          'There was a problem processing your payment, please try again.',
        lbl_errorMessages_ERR_CREDENTIALS_EXPIRED: 'User name / password did not match.',
        lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR:
          'The payment method entered could not be authorized for this purchase. Please review the information entered and try again or try an alternate form of payment',
        lbl_errorMessages_INVALID_RECAPTCHA: 'Please re-check the recaptcha value.',
        lbl_errorMessages_EMPTY_RECAPTCHA: 'Please check the recaptcha value.',
        lbl_errorMessages_TCP_PAYMENT_INSUFFICIENT:
          'There was a problem processing your payment, please try again.',
        lbl_errorMessages_LOYALTY_NOT_ACTIVE:
          "This account has been deactivated, please contact The Children's Place Customer Service by phone: Toll Free: 1-877-752-2387 International Number: 1-204-272-8312 (CAUTION: this is a local number in Canada, therefore you may be charged long distance and Int",
        lbl_errorMessages_ERR_MAX_ITEMCOUNT:
          'Save more by creating a new list or buying current items.',
        lbl_errorMessages_ERR_INVALID_ADDR:
          'Sorry, there was an issue. This may be an issue with the address provided. Please confirm and try again.',
        lbl_errorMessages_VIDES_ERRRO_1: 'Your mobile number is already subscribed.',
        lbl_errorMessages_VIDES_ERRRO_2: 'Please enter a valid phone number.',
        lbl_errorMessages_TCP_PROMOTION_COUPON_EXPIRED:
          'Sorry, ${errorParameters} is not applicable. Please verify the start and end dates.',
        lbl_errorMessages_COUPON_GENERIC: 'This offer cannot be applied.',
        lbl_errorMessages_ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME:
          'Sorry, ${errorParameters} could not be applied. Please review the redemption dates.',
        lbl_errorMessages_ERR_MORE_THAN_15_ITEM_IN_CART_ERROR:
          'Max quantity reached. Select another color or size.',
        lbl_errorMessages_API_CANT_RESOLVE_FFMCENTER:
          'Quantity selected is not available at this store.',
        lbl_errorMessages_API_BAD_INV: 'There is insufficient inventory to fulfill your request.',
        lbl_errorMessages_VENMO_GENERAL_ERROR:
          'The payment method entered could not be authorized for this purchase.  Please review the information entered and try again or try an alternate form of payment',
        lbl_errorMessages_TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR:
          'The payment entered could not be authorized for this purchase. Please review your credit card and billing information and try again.',
        lbl_errorMessages_API_CART_OOS_ITEM:
          'Sorry, one or more items you are trying to purchase are either out of stock or not available in the quantity you requested. Please go back to bag to confirm availability.',
        lbl_errorMessages_PROCESS_REQUEST_ERROR: 'There was an error processing your request.',
        lbl_errorMessages_ADDRESS_NOT_ELIGIBLE: 'The address is not eligible for application',
        lbl_errorMessages_NO_ADDR_AVAILABLE: 'The address is not available.',
      },
      store: {
        referred: null,
        lbl_storelocator_openUntilTxt: 'Open until ',
        lbl_storelocator_findAStoreLink: 'Find a Store',
      },
      placeRewards: {
        referred: [
          {
            name: 'Bonus Points Days Details',
            contentId: '804fb668-dcd8-4f2d-97b9-0c071d8e787a',
            __typename: 'ReferredContent',
          },
          {
            name: 'Point History Content',
            contentId: 'a0907d9f-c58b-4121-8376-ab6becc73d37',
            __typename: 'ReferredContent',
          },
        ],
        ACC_LBL_PLACE_REWARDS_HEADING: 'MY PLACE REWARDS',
        lbl_my_rewards_heading: 'My Rewards',
        ACC_LBL_MY_REWARDS_NO_REWARDS_MSG:
          'There are no available rewards. Start shopping to earn points!',
        lbl_my_rewards_shop_now: 'SHOP NOW',
        lbl_my_rewards_program_details: 'Program Details',
        lbl_my_rewards_no_available_rewards: 'There are no available rewards. ',
        lbl_my_rewards_start_shopping: 'Start shopping to earn points!',
        lbl_my_rewards_point_balance: 'Points Balance',
        lbl_place_rewards_bonus: 'BONUS',
        lbl_place_rewards_points: 'POINTS',
        lbl_place_rewards_day: 'DAY',
        lbl_bonus_points_apply_any_day: 'Apply to any day. Your choice!',
        lbl_bonus_points_msg:
          'My Place Rewards members get double points…Use your My Place Rewards Credit Card to get triple!',
        lbl_bonus_points_available_today: 'AVAILABLE TODAY!',
        lbl_bonus_points_used_on: 'USED ON',
        lbl_bonus_points_future_use: 'AVAILABLE FOR FUTURE USE',
        lbl_my_rewards_points_history: 'Points History',
        lbl_my_rewards_used_all: "You've used all your available Bonus Points Days.",
        lbl_bonus_points_daysLeft: 'You have {0} day left. ',
        lbl_bonus_points_bonusPointsDay: 'BONUS POINTS DAY',
        lbl_bonus_points_detailLink: 'Details',
        lbl_my_rewards_wallet_heading: 'MY REWARDS & OFFERS',
        lbl_my_wallet_heading: 'MY WALLET',
        lbl_common_details: 'Details',
        lbl_common_tnc: 'Terms & Conditions',
        lbl_common_applied_to_order: 'APPLIED TO ORDER',
        lbl_bonusPoints_placeRewardsBonus: 'BONUS',
        lbl_bonusPoints_placeRewardsPoints: 'POINTS',
        lbl_my_rewards_helpLink: 'Help applying Place Cash',
        lbl_my_rewards_drawerHeading: 'MY REWARDS & OFFERS',
        lbl_my_rewards_viewAll: 'View All ',
        lbl_my_rewards_emptySupportingText:
          'There are no available rewards. Start shopping to earn points.',
        lbl_my_rewards_applied: 'APPLIED!',
      },
      creditCardFields: {
        referred: null,
        lbl_creditField_cardNumber: 'Card Number',
        lbl_creditField_expMonth: 'Exp. Month',
        lbl_creditField_expYear: 'Exp. Year',
        lbl_creditField_cvvCode: 'CVV Code',
        lbl_creditField_cameraText: 'Position your card in the frame',
      },
      modules: {
        referred: null,
        lbl_moduleQ_shop_this_look: 'Shop This Look',
      },
      header: {
        referred: null,
        lbl_header_storeDefaultTitle: 'Find a Store',
        lbl_header_welcomeMessage: 'Welcome!',
        lbl_header_trackOrder: 'Track Order',
        lbl_header_openUntil: 'open until',
        lbl_header_hiTxt: 'Hi',
      },
      cartItemTile: {
        referred: null,
        lbl_cartTile_fit: 'Points',
        lbl_cartTile_points: 'Points',
        lbl_cartTile_cancel: 'Cancel',
        lbl_cartTile_update: 'Update',
        lbl_cartTile_remove: 'Remove',
        lbl_cartTile_saveForLater: 'Save For Later',
        lbl_cartTile_productBrandAlt: 'Brand',
        lbl_cartTile_productImageAlt: 'Product',
        lbl_cartTile_bopis: 'I’ll pick up in store at #store# Today',
        lbl_cartTile_boss:
          'I’ll pick up in store at #store# by #startMonth# #startdate# - #endMonth# #enddate#',
        lbl_cartTile_noRushPickup: 'NO RUSH Pick Up',
        lbl_cartTile_pickUpToday: 'Pick Up Today',
        lbl_cartTile_shipToHome: 'Ship to Home',
        lbl_cartTile_extra: 'EXTRA',
        lbl_cartTile_off: 'OFF',
        lbl_cartTile_delete: 'Delete',
        lbl_cartTile_edit: 'Edit',
        lbl_cartTile_tomorrow: 'Tomorrow',
        lbl_cartTile_phone: 'Phone',
        lbl_cartTile_pickup: 'Pickup',
        lbl_cartTile_at: 'At',
        lbl_cartTile_shipping: 'Shipping',
        lbl_cartTile_today: 'Today',
        lbl_cartTile_by: 'by',
        lbl_cartTile_bossUnavailable: 'Choose a different Color, fit, size or store',
        lbl_cartTile_bossReqQtyUnavailable: 'Choose a different Color, fit, size, qty or store',
        lbl_cartTile_bopisUnavailable: 'Choose a different Color, fit, size or store',
        lbl_cartTile_ecomUnavailable: 'Choose a different Color, fit, size or store',
        lbl_cartTile_notAvailableOnlineOnly: 'Not available (Online Only)',
        lbl_cartTile_notAvailableClearanceItem: 'Not available (Clearance Item)',
        lbl_cartTile_soldOut: 'This item is sold out',
        lbl_cartTile_bossInEligible: 'This item is unavailable for no rush pickup',
        lbl_cartTile_changeStore: 'Change Store',
      },
      password: {
        referred: null,
        lbl_forgotPassword_userNotAvailable:
          "Sorry, we couldn't find an account associated with that email address. Please try again",
        lbl_forgotPassword_checkMail: 'Check Your Email',
        lbl_forgotPassword_backLogin: ' Back to Log In',
        lbl_forgotPassword_resetPassword: 'Reset Password',
        lbl_forgotPassword_content1: 'Forgot your password?',
        lbl_forgotPassword_content2:
          'Enter your email address, and we’ll send you instructions to reset your password.',
        lbl_forgotPassword_returnLogin: ' Return to Log In',
        lbl_forgotPassword_accountMsg:
          "Don't have an account? Create one now to start earning points!",
        lbl_forgotPassword_heading: 'We’ve just sent you instructions to reset your password.',
        lbl_forgotPassword_apiError:
          "Sorry, we couldn't find an account associated with that email address. Please try again",
        lbl_resetPassword_requirementTips1: 'Must be at least 8 characters long',
        lbl_resetPassword_requirementTips2: 'Must have at least 1 uppercase letter',
        lbl_resetPassword_requirementTips3: 'Must contain 1 number',
        lbl_resetPassword_requirementTips4: 'Must contain 1 special character: !@#$%^&*()<>?',
        lbl_resetPassword_requirementNote:
          'Note: It can’t be your last used password or your email address.',
        lbl_resetPassword_requirementHeading: 'Password Requirements:',
        lbl_resetPassword_backLogin: 'Back to Log In',
        lbl_resetPassword_password: 'New Password',
        lbl_resetPassword_confirmPassword: 'Confirm Password',
        lbl_resetPassword_resetCta: 'RESET PASSWORD',
        lbl_resetPassword_successMessage:
          'Thanks! Your password has been updated. Click on the back to login link to go to login screen',
        lbl_resetPassword_genericError:
          'There is some error in updating password. Please try again',
        lbl_resetPassword_heading: 'Reset Your Password',
        lbl_resetPassword__TCP_RESET_PASSWORD_LINK_EXPIRED:
          'This password reset link has expired. Please click here to request a new password reset.',
        lbl_forgotPassword_content3: 'No worries!',
        lbl_forgotPassword_emailAddress: 'Email Address',
        lbl_forgotPassword_subHeading:
          'Didn’t get your email? Check your spam or  click here to contact customer service.',
        lbl_resetPassword__ERR_AUTHENTICATION_REUSEOLD_PASSWORD:
          'Your new password cannot replicate any recent passwords you may have used.  Please select another password and try again.',
        lbl_changePassword_current_password: 'Current Password',
        lbl_changePassword_new_password: 'New Password',
        lbl_changePassword_confirm_password: 'Confirm Password',
        lbl_changePassword_cancelCta: 'CANCEL',
        lbl_changePassword_saveCta: 'UPDATE',
        lbl_changePassword_heading_change_password: 'CHANGE PASSWORD',
        lbl_changePassword_back: 'Back',
        lbl_changePassword__ERR_AUTHENTICATION_REUSEOLD_PASSWORD:
          'The password has been used previously.',
        lbl_changePassword_INVALID_CURRENT_PASSWORD:
          'Your current password is incorrect. Please try again.',
        lbl_changePassword_successMessage: 'Your account has been updated',
        lbl_changePassword_heading: 'CHANGE PASSWORD',
        lbl_changePassword_password_info:
          'Your password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character. It cannot be your last used password or email.',
        lbl_changePassword_ERR_INTERNAL_SERVER_ERROR:
          'There was a problem logging out. Please try again.',
        lbl_changePassword_show: 'Show',
        lbl_changePassword_hide: 'Hide',
        lbl_changePassword_input_success: 'Looks Good',
        lbl_changePassword_genericError:
          'There is some error in updating password. Please try again.',
      },
      registration: {
        referred: null,
        lbl_createAccount_createA: 'Create a ',
        lbl_createAccount_myPlaceRewards: 'MY PLACE REWARDS ',
        lbl_createAccount_earnPoints: 'account to earn points on every purchase.',
        lbl_createAccount_spendPoint: '$1 SPENT = 1 POINT',
        lbl_createAccount_pointReward: '100 POINTS = $5 REWARD',
        lbl_createAccount_signedUp: 'Signed up in store?',
        lbl_createAccount_onlineAccCreated: 'An online account has been created with your email!',
        lbl_createAccount_resetPassword: ' Reset your password.',
        lbl_createAccount_hide: 'Hide',
        lbl_createAccount_show: 'Show',
        lbl_createAccount_saveRewards:
          'Save My Place Rewards Credit Card ending in 1234 to my account for future purchases.',
        lbl_createAccount_termsConditions:
          'I agree to the <a target="_blank"  href="/us/help-center/#fullTermsli"><b>terms & conditions</b> </a>  of the My Place Rewards Program, and I understand I will receive marketing communications from The Children\'s Place,',
        lbl_createAccount_termsConditions_1:
          ' including email and direct mail. I can withdraw my consent to receive marketing emails at any time. <a target="_blank" href="/us/help-center/contact-us"><b>Contact us</b></a>',
        lbl_createAccount_rememberMe: 'Remember me.',
        lbl_createAccount_createAccount: 'Create Account',
        lbl_createAccount_alreadyAccount: 'Already have an account?',
        lbl_createAccount_firstName: 'First Name',
        lbl_createAccount_lastName: 'Last Name',
        lbl_createAccount_phoneNumber: 'Phone Number',
        lbl_createAccount_zipCode: 'Zip Code',
        lbl_createAccount_emailAddress: 'Email Address',
        lbl_createAccount_confirmEmail: 'Confirm Email Address',
        lbl_createAccount_password: 'Password',
        lbl_createAccount_confirmPassword: 'Confirm Password',
        lbl_createAccount_useTouchId: 'Use Touch ID',
        lbl_createAccount_useFaceId: 'Use Face ID',
        lbl_createAccount_rememberMeHelpText: 'Not recommended on shared devices.',
        lbl_createAccount_error__ERR_LOGONID_ALREDY_EXIST:
          'The email address you entered matches an existing account.',
        'lbl_createAccount_error_.2210': 'Please review the password requirements and try again',
        lbl_createAccount_error: 'There is some error in creating Account. Please try again.',
        lbl_createAccount_succcessMsg:
          'Yay! Your account has been created. Log in every time you shop to earn points.',
        lbl_createAccount_clickhere: ' Click here',
        lbl_createAccount_termsConditions_app:
          "I agree to the terms & conditions of the My Place Rewards Program, and I understand I will receive marketing communications from The Children's Place,",
        lbl_createAccount_termsConditions_1_app:
          ' including email and direct mail. I can withdraw my consent to receive marketing emails at any time.  Contact us',
        lbl_createAccount_plcc_checkbox_Text:
          'Save My Place Rewards Credit Card ending in #number to my account for future purchases.',
        'lbl_createAccount_error_.2030':
          'Oops! The email or password you’ve entered is incorrect. Password must be at least 8 characters long and have at least 1 uppercase, 1 number and 1 special character.',
        lbl_createAccount_title: 'EASIER, FASTER SHOPPING!',
     },
      Search: {
        referred: null,
        lbl_search_whats_trending: "WHAT'S TRENDING",
        lbl_search_recent_search: 'YOUR RECENT SEARCHES',
        lbl_search_looking_for: "I'M LOOKING FOR",
        lbl_search_product_matches: 'TOP MATCHING PRODUCTS',
        lbl_category_matches: 'CATEGORY MATCHES',
        lbl_cancel_search: 'Cancel',
      },
      loyalityBanner: {
        referred: null,
        lbl_loyaltyBanner_youCanEarnPoints:
          'You can earn #estimatedRewardsVal# points on this purchase!',
        lbl_loyaltyBanner_youllEarnPoints:
          'You"ll earn #estimatedRewardsVal# points on this purchase!',
        lbl_loyaltyBanner_becomeMemberOnThisPurchase:
          'Become a member to get a #estimatedRewardsVal# on this purchase!',
        lbl_loyaltyBanner_youllGetWithThisPurchase:
          'You"ll get a #estimatedRewardsVal# with this purchase!',
        lbl_loyaltyBanner_youllEarnPointsPlcc:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_youllGetARewardPlcc:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_loyaltyBanner_whenYouCheckOutPlcc:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_loyaltyBanner_thatsSomePointsFromReward:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_loyaltyBanner_save30Today: 'SAVE 30% TODAY!',
        lbl_loyaltyBanner_earnDoublePoints:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_loyaltyBanner_currentSubtotal: 'Current Subtotal: ',
        lbl_loyaltyBanner_estimatedSubtotal:
          'Estimated Subtotal with a My Place Rewards Credit Card: ',
        lbl_loyaltyBanner_applyNow: 'Apply Now',
        lbl_loyaltyBanner_learnMore: 'Learn More',
        lbl_loyaltyBanner_logIn: 'Log In',
        lbl_loyaltyBanner_getRewardedShopping: 'GET REWARDED FOR SHOPPING!',
        lbl_loyaltyBanner_loyaltyPayPoints: '$1 SPENT = 1 POINT  |  100 POINTS = $5 REWARD',
        lbl_loyaltyBanner_createAccount: 'Create My Place Reward Account',
        lbl_loyaltyBanner_earnDoublePointsPDP: 'EARN DOUBLE POINTS EVERY DAY!',
        lbl_loyaltyBanner_getDoublePointsPLCCPDP: "YOU'RE GETTING DOUBLE POINTS!",
        lbl_loyaltyBanner_myPlaceCreditCard: 'with the My Place Rewards Credit Card',
        lbl_loyaltyBanner_checkoutMyPlaceCreditCard:
          'when you checkout with your My Place Rewards Credit Card',
        lbl_loyaltyBanner_oneDollarSpent: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_loyaltyBanner_guestReviewYouCanEarn:
          'YOU CAN EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_guestReviewBecomeMember:
          'BECOME A MEMBER TO GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_loyaltyBanner_mprReviewYoullEarn:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_mprReviewYoullGet: 'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_loyaltyBanner_plccReviewYoullEarn:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_plccReviewYoullGet:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_loyaltyBanner_plccReviewWhenYouCheck:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_loyaltyBanner_plccReviewThatsSomePoints:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_loyaltyBanner_sectionSymbol: '§',
        lbl_loyaltyBanner_asteriskSymbol: '*',
        lbl_loyaltyBanner_guestConfirmationSignUp:
          'SIGN UP FOR MY PLACE REWARDS TODAY TO EARN POINTS ON YOUR NEXT PURCHASE!',
        lbl_loyaltyBanner_guestConfirmationBecomeMember:
          'BECOME A MEMBER TO GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_loyaltyBanner_guestConfirmationCreateMyPlaceRewards: 'Create My Place Rewards Account',
        lbl_loyaltyBanner_guestConfirmationLogIn: 'Log In',
        lbl_loyaltyBanner_mprConfirmationYouEarnedPoints:
          'YOU EARNED #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_mprConfirmationThatsSomePoints:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_loyaltyBanner_mprConfirmationYouEarnedReward:
          'YOU EARNED A #estimatedRewardsVal# ON TODAY’S PURCHASE!',
        lbl_loyaltyBanner_plccConfirmationYouEarnedPoints:
          'YOU EARNED #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_loyaltyBanner_plccConfirmationYoureSomePoints:
          'You’re #pointsToNextReward# points from a $5 Reward.',
        lbl_loyaltyBanner_plccConfirmationYouEarnedReward:
          'YOU EARNED A #estimatedRewardsVal# ON TODAY’S PURCHASE!',
        lbl_banner_added2bag_guest_points_label1:
          'YOU CAN EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_added2bag_guest_points_label2: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_banner_added2bag_guest_rewards_label1:
          'BECOME A MEMBER TO GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_added2bag_guest_rewards_label2: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_banner_added2bag_guest_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_added2bag_mpr_points_label1:
          "You'll earn #estimatedRewardsVal# points on this purchase!",
        lbl_banner_added2bag_mpr_points_label2: 'EARN DOUBLE POINTS EVERY DAY!',
        lbl_banner_added2bag_mpr_points_label3: 'with the MY PLACE REWARDS CREDIT CARD',
        lbl_banner_added2bag_mpr_rewards_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_added2bag_mpr_rewards_label2:
          'When you check out with your MY PLACE REWARDS CREDIT CARD!',
        lbl_banner_added2bag_plcc_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_added2bag_plcc_points_label2:
          'When you check out with your MY PLACE REWARDS CREDIT CARD!',
        lbl_banner_added2bag_plcc_rewards_label1:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_added2bag_plcc_rewards_label2:
          'When you check out with your MY PLACE REWARDS CREDIT CARD!',
        lbl_banner_minibag_guest_points_label1:
          'You can earn #estimatedRewardsVal# points on this purchase!',
        lbl_banner_minibag_guest_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_minibag_guest_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_minibag_guest_rewards_label1:
          'Become a member to get a #estimatedRewardsVal# on this purchase!',
        lbl_banner_minibag_guest_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_minibag_guest_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_minibag_mpr_points_label1:
          "You'll earn #estimatedRewardsVal# points on this purchase!",
        lbl_banner_minibag_mpr_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_minibag_mpr_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_minibag_mpr_rewards_label1:
          "You'll get a #estimatedRewardsVal# with this purchase!",
        lbl_banner_minibag_mpr_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_minibag_mpr_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_minibag_plcc_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_minibag_plcc_points_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_minibag_plcc_points_label3:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_minibag_plcc_rewards_label1:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_minibag_plcc_rewards_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_guest_points_label1:
          'You can earn #estimatedRewardsVal# points on this purchase!',
        lbl_banner_bag_guest_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_bag_guest_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_guest_rewards_label1:
          'Become a member to get a #estimatedRewardsVal# on this purchase!',
        lbl_banner_bag_guest_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_bag_guest_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_mpr_points_label1:
          "You'll earn #estimatedRewardsVal# points on this purchase!",
        lbl_banner_bag_mpr_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_bag_mpr_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_mpr_rewards_label1: "You'll get a #estimatedRewardsVal# with this purchase!",
        lbl_banner_bag_mpr_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_bag_mpr_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_plcc_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_bag_plcc_points_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_bag_plcc_points_label3: 'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_bag_plcc_rewards_label1: 'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_bag_plcc_rewards_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_guest_points_label1:
          'You can earn #estimatedRewardsVal# points on this purchase!',
        lbl_banner_checkout_guest_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_checkout_guest_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_guest_rewards_label1:
          'Become a member to get a #estimatedRewardsVal# on this purchase!',
        lbl_banner_checkout_guest_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_checkout_guest_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_mpr_points_label1:
          "You'll earn #estimatedRewardsVal# points on this purchase!",
        lbl_banner_checkout_mpr_points_label2: 'SAVE 30% TODAY!',
        lbl_banner_checkout_mpr_points_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_mpr_rewards_label1:
          "You'll get a #estimatedRewardsVal# with this purchase!",
        lbl_banner_checkout_mpr_rewards_label2: 'SAVE 30% TODAY!',
        lbl_banner_checkout_mpr_rewards_label3:
          '+ EARN DOUBLE POINTS* when you open & use a MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_plcc_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_checkout_plcc_points_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_checkout_plcc_points_label3:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_checkout_plcc_rewards_label1:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_checkout_plcc_rewards_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_review_guest_points_label1:
          'YOU CAN EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_review_guest_points_label2: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_banner_review_guest_rewards_label1:
          'BECOME A MEMBER TO GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_review_guest_rewards_label2: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_banner_review_mpr_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_review_mpr_rewards_label1:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_review_plcc_points_label1:
          'YOU’LL EARN #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_review_plcc_points_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_review_plcc_points_label3:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_review_plcc_rewards_label1:
          'YOU’LL GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_review_plcc_rewards_label2:
          'when you check out with your MY PLACE REWARDS CREDIT CARD',
        lbl_banner_confirmation_guest_points_label1:
          'SIGN UP FOR MY PLACE REWARDS TODAY TO EARN POINTS ON YOUR NEXT PURCHASE!',
        lbl_banner_confirmation_guest_rewards_label1:
          'BECOME A MEMBER TO GET A #estimatedRewardsVal# ON THIS PURCHASE!',
        lbl_banner_confirmation_guest_rewards_label2: '$1 Spent = 1 Point | 100 Points = $5 Reward',
        lbl_banner_confirmation_mpr_points_label1:
          'YOU EARNED #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_confirmation_mpr_points_label2:
          'That’s #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_confirmation_mpr_rewards_label1:
          'YOU EARNED A #estimatedRewardsVal# ON TODAY’S PURCHASE!',
        lbl_banner_confirmation_plcc_points_label1:
          'YOU EARNED #estimatedRewardsVal# POINTS ON THIS PURCHASE!',
        lbl_banner_confirmation_plcc_points_label2:
          'You’re #pointsToNextReward# points from a $5 Reward.',
        lbl_banner_confirmation_plcc_rewards_label1:
          'YOU EARNED A #estimatedRewardsVal# ON TODAY’S PURCHASE!',
        lbl_loyaltyBanner_createMyPlaceRewardsAccount: 'Create My Place Rewards Account',
      },
      smsSignup: {
        referred: null,
        lbl_SignUp_signUpForLabel: 'Sign Up For',
        lbl_SignUp_offerTypeLabel: 'Text Alerts',
        lbl_SignUp_getTextLabel: 'GET',
        lbl_SignUp_dollarTextLabel: '$',
        lbl_SignUp_tenTextLabel: '10',
        lbl_SignUp_offTextLabel: 'OFF',
        lbl_SignUp_nextPurchaseLabel: 'Your Next Purchase',
        lbl_SignUp_termsTextLabel:
          'Carrier message & data rates apply. Recurring automated marketing messages will be sent to the number probvided at opt-in. Test STOP to 89700 to opt-out. Offer is valid for first-time subscibers only. See Mobile T&C & Privacy Policy. No purchase necessary',
        lbl_SignUp_joinButtonLabel: 'JOIN NOW',
        lbl_SignUp_placeholderText: 'Enter Phone Number',
        validationErrorLabel: 'ERROR: Please enter a valid phone number',
        lbl_SignUp_shopNowLabel: 'SHOP NOW',
        lbl_SignUp_thankYouTextLabel: 'Thank You!',
        lbl_SignUp_joiningTextLabel: 'For Joining up for Alerts',
        lbl_SignUp_confirmationMsgReceiveLabel: 'A Text Is On It’s Way',
        lbl_SignUp_extraMessageLabel: 'Don’t forget to open it and redeem your offer!',
        lbl_SignUp_imageSrc:
          'https://test5.childrensplace.com/image/upload/v1565174402/Test_signup-offer-image_1_qib7ug_zwnwff.png',
        lbl_SignUp_imageAlt: 'SMS image alt test',
        lbl_SignUp_submitButtonLabel: 'SUBMIT',
        lbl_smsSignup_smsSignupText:
          'U.S Customers only. Messages & data rates may apply. Frequency varies. To opt out, Text STOP to 89700. For help, text HELP to 89700. ',
        lbl_smsSignup_privacyPolicy: 'Privacy Policy.',
        lbl_smsSignup_orderUpdates: 'Send Me Order Updates Via Text Messages',
        lbl_SignUp_shopNowBtnUrl: 'http://www.thechildrensplace.com/sms',
        lbl_SignUp_shopNowBtnUrlTarget: '_self',
      },
      emailSignup: {
        referred: null,
        lbl_SignUp_signUpForLabel: 'Sign up for',
        lbl_SignUp_offerTypeLabel: 'Email Offers',
        lbl_SignUp_getTextLabel: 'GET',
        lbl_SignUp_dollarTextLabel: '$',
        lbl_SignUp_tenTextLabel: '10',
        lbl_SignUp_offTextLabel: 'OFF',
        lbl_SignUp_nextPurchaseLabel: 'Your Next Purchase',
        lbl_SignUp_termsTextLabel:
          '*Applies to new email subscribers only. Exclusions apply. Offer valid onyour next purchase of $40 or more. You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com',
        lbl_SignUp_joinButtonLabel: 'JOIN NOW',
        lbl_SignUp_placeholderText: 'Enter Email Address',
        validationErrorLabel: 'ERROR: Please enter a valid email address',
        lbl_SignUp_shopNowLabel: 'SHOP NOW',
        lbl_SignUp_thankYouTextLabel: 'Thank You!',
        lbl_SignUp_joiningTextLabel: 'For Joining Our List',
        lbl_SignUp_confirmationMsgReceiveLabel: 'You will receive your first email from us shortly',
        lbl_SignUp_extraMessageLabel: 'Don’t forget to open it and redeem your offer!',
        lbl_SignUp_footerTextLabel:
          'You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
        lbl_SignUp_imageSrc:
          'https://test1.theplace.com/image/upload/v1562398149/Test/sign-up-thank-you_1_nhhhwh.png',
        lbl_SignUp_imageAlt: 'Email image alt test',
        lbl_SignUp_submitButtonLabel: 'SUBMIT',
        lbl_SignUp_shopNowBtnUrl: 'https://test6.childrensplace.com/us/c/girls-clothing',
      },
    },
    bag1: {
      bagOverview: {
        referred: null,
        lbl_header_bag: 'MY BAG',
        lbl_orderledger_items: 'Items',
        lbl_orderledger_coupons: 'Coupons',
        lbl_orderledger_promotions: 'Promotions',
        lbl_orderledger_shipping: 'Shipping',
        lbl_orderledger_tax: 'Estimated Tax',
        lbl_orderledger_total: 'Estimated Total',
        lbl_orderledger_giftcards: 'Gift Card(s)',
        lbl_orderledger_balance: 'Balance',
        lbl_orderledger_totalsavings: 'Total Savings',
        lbl_orderledger_tooltiptext:
          'Total includes any applied promotions or coupons in addition to on sale savings',
        lbl_cartTile_price: 'Price',
        lbl_cartTile_productBrandAlt: 'Brand',
        lbl_cartTile_productImageAlt: 'Product',
        lbl_cartTile_noRushPickup: 'NO RUSH Pick Up',
        lbl_cartTile_extra: 'EXTRA',
        lbl_cartTile_off: 'OFF',
        lbl_cartTile_pickUpToday: 'Pick Up Today',
        lbl_cartTile_shipToHome: 'Ship to Home',
        lbl_cartTile_changeStore: 'Change Store',
        lbl_cartTile_saveForLater: 'Save For Later',
        lbl_cartTile_edit: 'Edit',
        lbl_cartTile_cancel: 'Cancel',
        lbl_cartTile_points: 'Points',
        lbl_cartTile_fit: 'Fit',
        lbl_miniBag_createAccount: 'Create Account',
        lbl_miniBag_logIn: 'Log In',
        lbl_miniBag_inRewards: 'in Rewards',
        lbl_miniBag_hi: 'Hi',
        lbl_miniBag_viewBag: 'View Bag',
        lbl_miniBag_ViewSaveForLater: 'View Saved for Later',
        lbl_miniBag_subTotal: 'Subtotal',
        lbl_cartTile_boss:
          'I’ll pick up in store at #store# by #startMonth# #startdate# - #endMonth# #enddate#',
        lbl_cartTile_update: 'Update',
        lbl_cartTile_today: 'Today',
        lbl_couponform_placeholder: 'Enter Coupon Code',
        lbl_couponform_submit: 'Apply',
        lbl_cartTile_bopis: 'I’ll pick up in store at #store# Today',
        lbl_orderledger_free: 'FREE',
        lbl_miniBag_checkout: 'Checkout',
        lbl_miniBag_yourShoppingBag: 'YOUR SHOPPING BAG IS EMPTY',
        lbl_miniBag_dontHaveAccount: 'Don’t have an account?',
        lbl_miniBag_createOne: 'Create one now to start earning points!',
        lbl_emptyBag_loggedInMsg: 'Uh oh! Looks like you don’t have anything in your cart yet!',
        lbl_emptyBag_notLoggedInMsg: 'Do you have items in your cart?',
        lbl_emptyBag_loginIn: 'LOGIN',
        lbl_emptyBag_shopNow: 'SHOP NOW',
        lbl_emptyBag_inspirationTagLine: 'Need some inspiration?',
        lbl_emptyBag_helperMsg: 'Here are some great items to get your cart started!',
        lbl_couponform_header: 'COUPON CODE',
        lbl_couponform_help: 'Need Help?',
        lbl_miniBag_error: 'Please #remove# the sold out items from your bag before you check out.',
        lbl_miniBag_itemUnavailable: 'This item is unavailable',
        lbl_miniBag_itemSoldOut: 'This item is sold out',
        lbl_miniBag_soldOut: 'SOLD OUT',
        lbl_miniBag_problemWithOrder: 'There’s a problem with your order.',
        lbl_miniBag_chooseDiff: 'Choose a different color, size, fit, or qty.',
        lbl_minibag_errorSize: 'Please select a size',
        lbl_bonusPoints_ctaApply: 'APPLY',
        lbl_bonusPoints_ctaApplied: 'REMOVE',
        lbl_minibag_itemUpdated: 'Your item has been updated',
        lbl_minibag_itemDeleted: 'Your item has been deleted',
        lbl_minibag_errorUpdateUnavailable:
          'Please #remove# one or more sold-out from your bag before you checkout',
        lbl_minibag_errorRemoveSoldoutHeader:
          'Please update one or more items out of stock items from your bag before you checkout',
        lbl_cartTile_remove: 'Remove',
        lbl_cartTile_delete: 'Delete',
        lbl_couponlist_available: 'AVAILABLE REWARDS & OFFERS',
        lbl_couponlist_applied: 'APPLIED REWARDS & OFFERS',
        lbl_couponlist_helpAppling: 'Help applying Place Cash',
        lbl_couponlist_applyBtn: 'APPLY',
        lbl_couponlist_removeBtn: 'REMOVE',
        lbl_couponlist_detailBtn: 'Details',
        lbl_couponlist_showMoreTxt: 'Show more',
        lbl_couponlist_lessMoreTxt: 'Less more',
        lbl_couponlist_applyTobag: 'Apply to bag',
        lbl_couponlist_printTxt: 'Print',
        lbl_couponlist_useBy: 'Use by',
        lbl_couponlist_modalLongDesc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nunc, interdum ac neque non, blandit accumsan justo. Phasellus aliquam urna ut nisl faucibus, quis pellentesque nulla vulputate. Phasellus bibendum lobortis orci, condimentum convallis sa',
        lbl_couponlist_modalShortDesc: 'By participating in the activity, you agree to ',
        lbl_couponlist_tAndC: 'Terms & Conditions',
        lbl_couponlist_pPolicy: 'Privacy Policy',
        lbl_couponlist_placeCash: 'PLACE CASH',
        lbl_couponlist_rewards: 'REWARDS',
        lbl_couponlist_savings: 'SAVINGS',
        lbl_couponlist_expiring: 'EXPIRING SOON!',
      },
      coupons: {
        referred: null,
        lbl_error_500: 'Uh oh... System error. Please try again.',
        lbl_error_err_promotion_code_invalid:
          'Sorry, this code is invalid. Please verify it and try again.',
        lbl_error__err_missing_cmd_parameter:
          'My Place Rewards cannot be applied when you’re shopping as a guest. Please log in.',
        lbl_error__tcp_promotion_loyalty_coupon_not_in_wallet:
          'The code you used is not applicable. Note: My Place Rewards are not transferable between accounts. Please verify your code and try again.',
        lbl_error__tcp_promotion_loyalty_availabe_only_for_registered_user:
          'My Place Rewards cannot be applied when you’re shopping as a guest. Please log in',
        lbl_error__code_not_applicable:
          'Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.',
        lbl_error__tcp_coupon_used_already:
          'One or more of your coupons have already been redeemed. Please remove the coupon(s) and try again.',
        lbl_error__wic_rtps_coupon_not_applied:
          'We attempted to apply your offer, but, it does not combine with offers already applied to your order. We’ve saved your coupon to your My Place Rewards account.',
        lbl_error__tcp_promotion_coupon_expired:
          'Sorry, #errorParameters# is not applicable. Please verify the start and end dates.',
        lbl_error_coupon_generic: 'This offer cannot be applied',
        lbl_error_err_promotion_not_available_at_this_time:
          'Sorry, ${errorParameters} could not be applied. Please review the redemption dates.',
        lbl_error_err_generic_user:
          'Sorry, we were unable to complete your request. Please try again.',
        lbl_couponform_header: 'Coupon Code',
        lbl_couponform_help: "Need Help?'",
      },
      addedToBag: {
        referred: [
          {
            name: 'NEED_HELP_DATA',
            contentId: 'b25ffa9d-0b2f-424b-a930-ff30199fbd55',
            __typename: 'ReferredContent',
          },
        ],
        lbl_cta_viewBag: 'View Bag',
        lbl_cta_checkout: 'Checkout',
        lbl_header_addedToBag: 'ADDED TO BAG',
        lbl_info_color: 'Color',
        lbl_info_size: 'Size',
        lbl_info_Qty: 'Qty',
        lbl_info_price: 'Price',
        lbl_info_pointYouCanEarn: 'Points you can earn on Item(s)',
        lbl_info_subTotal: 'Bag Subtotal (#items items)',
        lbl_info_totalRewardsInBag: 'Total My Place Reward Points in Bag',
        lbl_info_totalNextRewards: 'Total Points to Next Reward',
        lbl_bossBanner_headingDefault: 'PICK UP IN STORE AND SAVE AN EXTRA #value',
        lbl_bossBanner_subHeadingDefault: 'Simply choose “#type” in your bag before checking out.',
        lbl_bossBanner_noRush: 'NO RUSH Pick Up',
        lbl_info_giftDesign: 'Design',
        lbl_info_giftValue: 'Value',
        lbl_footer_continueShopping: 'Continue Shopping',
        lbl_aria_close: 'close',
        lbl_aria_overlayText: 'Tap to close added to bag overlay',
      },
    },
    account: {
      accountOverview: {
        referred: [
          {
            name: 'overviewRewardsPointsBannerPLCC',
            contentId: '88da566c-834b-4114-8bea-956b126771b2',
            __typename: 'ReferredContent',
          },
          {
            name: 'overviewRewardsPointsBannerMPR',
            contentId: '65bf244c-f96b-4b69-812e-990dd6993a6a',
            __typename: 'ReferredContent',
          },
        ],
        lbl_overview_heading: 'ACCOUNT OVERVIEW',
        lbl_overview_addressBookHeading: 'Address Book',
        lbl_overview_addressBookCTA: 'VIEW ADDRESS BOOK',
        lbl_overview_paymentHeading: 'Payment & Gift Cards',
        lbl_overview_paymentCTA: 'VIEW PAYMENT & GIFT CARDS',
        lbl_overview_myPlaceRewardsHeading: 'My Place Rewards',
        lbl_overview_myPlaceRewardsCTA: 'VIEW ALL REWARDS',
        lbl_overview_myFavoritesHeading: 'My Favorites',
        lbl_overview_myWalletHeading: 'My Wallet',
        lbl_overview_earnPointsHeading: 'Earn Extra Points',
        lbl_overview_ordersHeading: 'Orders',
        lbl_overview_profileInformationHeading: 'Profile Information',
        lbl_overview_myPreferencesHeading: 'My Preferences',
        lbl_overview_myPlaceRewardsCardHeading: 'My Place Rewards Credit Card',
        lbl_overview_addressNotAdded: 'You have not added an address yet.',
        lbl_overview_defaultBillingAddress: 'Default Billing Address',
        lbl_overview_defaultShipingAddress: 'Default Shipping Address',
        ACC_LBL_MY_REWARDS_HEADING: 'My Rewards',
        lbl_my_rewards_current_points: 'Current Points',
        lbl_my_rewards_next_reward: 'Points to Next Reward',
        lbl_overview_greeting: 'Hi,',
        lbl_my_rewards_currency: '$',
        lbl_overview_addressBookEdit: 'Edit',
        lbl_overview_addressBookAdd: 'Add',
        lbl_overview_venmo: 'Venmo',
        lbl_overview_giftCard: 'Gift Card',
        lbl_overview_default_creditCard: 'Default Credit Card',
        lbl_overview_card_ending: 'ending in',
        lbl_overview_expires: 'expires',
        lbl_overview_remaining_balance: 'Remaining balance',
        lbl_overview_view_payments: 'View Payment & Gift Cards',
        lbl_overview_add_creditCard: 'You have not added a credit card yet.',
        lbl_overview_add_giftCard: 'You do not have any gift cards',
        lbl_overview_manage_creditCard: 'Manage Credit Account',
        lbl_overview_purchase_giftCards: 'Purchase Gift Cards',
        lbl_overview_refer_friend: 'Refer a Friend',
        lbl_overview_apply_today: 'APPLY TODAY TO SAVE 30%',
        lbl_overview_app_settings: 'App Settings',
        lbl_overview_help: 'Help',
        lbl_overview_messages: 'Messages',
        lbl_overview_logout: 'Log Out',
        lbl_overview_myPlaceRewardsAvailable: 'You have {0} available rewards.',
        lbl_overview_myPlaceRewardsUseBy: 'Use by',
        lbl_overview_myPlaceRewardsBonusPointsDay: 'BONUS POINTS DAY',
        lbl_overview_myPlaceRewardsBonusDayLeft: 'You have {0} day left.',
        lbl_overview_myPlaceRewardsBonusDayDetails: 'Details',
        lbl_overview_myPlaceRewardsDesc: 'Start Shopping to earn points!',
        lbl_overview_myPlaceRewardsShopNow: 'SHOP NOW',
        lbl_overview_myPlaceRewardsCouponType: 'REWARD',
        lbl_overview_check_balance: 'Check Balance',
        lbl_overview_couponTypePlacecash: 'PLACE CASH',
        lbl_overview_couponTypeReward: 'REWARD',
        lbl_overview_couponTypeSaving: 'SAVINGS',
        lbl_overview_couponUseBy: 'Use by',
        lbl_overview_couponValid: 'Valid',
        lbl_overview_logout_heading_Text_1: 'Members get more!',
        lbl_overview_logout_heading_Text_2: 'Log in to earn points for MY PLACE REWARDS',
        lbl_overview_login_text: 'LOG IN',
        lbl_overview_join_text: 'JOIN',
        lbl_overview_viewMyWalletCTA: 'VIEW MY WALLET',
        lbl_overview_walletViewAllCTA: 'VIEW ALL',
        lbl_overview_myWalletNoOfferAvailable: 'There are no available rewards or offers.',
        lbl_overview_myWalletStartShop: 'Start shopping to earn points!',
        lbl_overview_myWalletShopCTA: 'SHOP NOW',
        lbl_overview_myWalletOfferAvailable: 'You have {0} available rewards and offers.',
        lbl_overview_createAccount: 'CREATE ACCOUNT',
        lbl_overview_profileInfoEmailAddress: 'Email Address:',
        lbl_overview_profileInfoMailingAddress: 'Mailing Address:',
        lbl_overview_profileInfoPassword: 'Password',
        lbl_overview_profileInfoMember: 'Member #:',
        lbl_overview_profileInfoViewCTA: 'VIEW PROFILE',
        lbl_overview_profileInfoEditCTA: 'Edit',
        lbl_overview_profileInfoChangeCTA: 'Change',
        lbl_overview_trackYourOrder: 'Track Order',
      },
      myPrefrence: {
        referred: [
          {
            name: 'Point History Content',
            contentId: 'a0907d9f-c58b-4121-8376-ab6becc73d37',
            __typename: 'ReferredContent',
          },
          {
            name: 'rewards_card_welcome',
            contentId: 'd1458b0a-d0b7-4f99-a305-8e0fd135c179',
            __typename: 'ReferredContent',
          },
          {
            name: 'guest_shipping_info',
            contentId: 'a20ddeed-3bf1-47c7-8c9b-7eaa35b629a0',
            __typename: 'ReferredContent',
          },
        ],
        my_test_myprefrence_key: 'My test myPrefrence value',
        zoltan_test_tcp_usa: 'Zoltan test',
        zoltan_second: 'dskaldjsa',
      },
      myPlaceRewards: {
        referred: [
          {
            name: 'Bonus Points Days Details',
            contentId: '804fb668-dcd8-4f2d-97b9-0c071d8e787a',
            __typename: 'ReferredContent',
          },
        ],
        ACC_LBL_PLACE_REWARDS_HEADING: 'MY PLACE REWARDS',
        lbl_my_rewards_heading: 'My Rewards',
        ACC_LBL_MY_REWARDS_NO_REWARDS_MSG:
          'There are no available rewards. Start shopping to earn points!',
        lbl_my_rewards_shop_now: 'SHOP NOW',
        lbl_my_rewards_program_details: 'Program Details',
        lbl_my_rewards_no_available_rewards: 'There are no available rewards. ',
        lbl_my_rewards_start_shopping: 'Start shopping to earn points!',
        lbl_my_rewards_point_balance: 'Points Balance',
        lbl_place_rewards_bonus: 'BONUS',
        lbl_place_rewards_points: 'POINTS',
        lbl_place_rewards_day: 'DAY',
        lbl_bonus_points_apply_any_day: 'Apply to any day. Your choice!',
        lbl_bonus_points_msg:
          'My Place Rewards members get double points…Use your My Place Rewards Credit Card to get triple!',
        lbl_bonus_points_available_today: 'AVAILABLE TODAY!',
        lbl_bonus_points_used_on: 'USED ON',
        lbl_bonus_points_future_use: 'AVAILABLE FOR FUTURE USE',
        lbl_my_rewards_points_history: 'Points History',
        lbl_my_rewards_used_all: "You've used all your available Bonus Points Days.",
        lbl_bonus_points_daysLeft: 'You have {0} day left. ',
        lbl_bonus_points_bonusPointsDay: 'BONUS POINTS DAY',
        lbl_bonus_points_detailLink: 'Details',
        lbl_my_rewards_wallet_heading: 'MY REWARDS & OFFERS',
        lbl_my_wallet_heading: 'MY WALLET',
        lbl_points_claim_transaction_type: 'Transaction Type',
        lbl_points_claim_store_number: 'Store Number',
        lbl_points_claim_register_number: 'Register Number',
        lbl_points_claim_transaction_date: 'Transaction Date',
        lbl_points_claim_transaction_number: 'Transaction Number',
        lbl_points_claim_order_number: 'Order Number',
        lbl_points_claim_order_date: 'Order Date',
        lbl_points_claim_account_number: 'My Place Rewards #:',
        lbl_points_claim_firstname: 'First Name:',
        lbl_points_claim_lastname: 'Last Name:',
        lbl_points_claim_email: 'Email:',
        lbl_points_claim_supporting_text:
          'Please fill out the information below to claim point from a recent purchase.',
        lbl_points_claim_heading: 'POINTS CLAIM',
        lbl_points_claim_submit_caps: 'SUBMIT REQUEST',
        lbl_points_claim_success_message:
          'Thank you for contacting us regarding your missing points. Please allow 48-72 hours to process your request. If more information is needed, a customer service representative will contact you.',
        lbl_points_claim_error:
          'Thank you for contacting us regarding your missing points. The transaction needs further verification before it can be assigned to your myPLACE Rewards account. Please allow 48-72 hours for a customer care representative to contact you.',
        lbl_points_claim_error_INTERNAL_SERVER_ERROR: 'Internal Server Error',
        lbl_points_claim_sample_receipt: 'SAMPLE RECEIPT',
        lbl_err_ordernumber: 'Please enter the order number',
      },
      profile: {
        referred: null,
        lbl_profile_heading: 'PROFILE INFORMATION',
        lbl_profile_Enhance_Experience: 'Enhance your experience',
        lbl_profile_personal_information: 'Personal Information',
        lbl_profile_password: 'Password',
        lbl_profile_birthday_savings: 'Birthday Savings',
        lbl_profile_edit_personal_info: 'EDIT PERSONAL INFO',
        lbl_profile_change_password: 'CHANGE PASSWORD',
        lbl_profile_add_birthday_info: 'ADD BIRTHDAY INFO',
        lbl_profile_program_details: 'Program Details',
        lbl_profile_terms_condition: 'Terms & Condition',
        lbl_profile_change_your_password: 'Change your password',
        lbl_profile_password_info_line1:
          'Your password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character.',
        lbl_profile_password_info_line2: 'It cannot be your last used password or email.',
        lbl_profile_birthday_saving_info:
          'Add up to 4 kids’ birthdays to your account and receive special savings during their birthday month!',
        lbl_profile_edit_mailing_info: 'EDIT MAILING ADDRESS',
        lbl_profile_mailing_address: 'Mailing Address',
        lbl_profile_profileCompletionExclamation: 'Yay!',
        lbl_profile_profileCompletionMessage: 'Your profile is 100% complete.',
        lbl_profile_profileInCompleteMessage:
          'Make your shopping experience even better by completing your profile.',
        lbl_profile_mailingAddressDescription: 'Add Mailing Address',
        lbl_profile_favStoreDescription: 'Add Your Favorite Store',
        lbl_profile_userBirthdayDescription: 'Add Your Birthday',
        lbl_profile_aboutYourselfDescription: 'Take a 5-second Survey',
        lbl_profile_profileActivityCompleted: 'Added!',
        lbl_profile_getMorePointsLink: 'here',
        lbl_profile_getMorePoints: 'Get even more points ',
        lbl_profile_successMessage: 'Your account has been updated',
        lbl_profile_edit_birthday_heading: 'Birthday:',
        lbl_profile_my_place_rewards_info: 'My Place Rewards #:',
        lbl_profile_air_miles: 'Air Miles #:',
        lbl_profile_personal_info_back: 'Back',
        lbl_profile_personal_info_firstName: 'First Name',
        lbl_profile_personal_info_lastName: 'Last Name',
        lbl_profile_personal_info_email: 'Email Address',
        lbl_profile_personal_info_phoneNumber: 'Mobile Phone Number',
        lbl_profile_personal_info_associate_id: 'Associate ID',
        lbl_profile_personal_info_birthday: 'Birthday',
        lbl_profile_personal_info_updateCta: 'UPDATE',
        lbl_profile_personal_info_cancelCta: 'CANCEL',
        lbl_profile_personal_info_tcp_employee: "I'm an employee of The Children's Place",
        lbl_profile_personal_info_month: 'Month',
        lbl_profile_personal_info_year: 'Year',
        lbl_profile_personal_air_miles: 'AIR MILES® Collector Card',
        lbl_profile_collector_number: 'Provide your Collector Number to get miles',
        lbl_profile_celebration_birthday: 'We love celebrating birthdays!',
        lbl_profile_email_used_login: 'Your email will be used to log in to your account.',
        lbl_profile_ASSOCIATE_ID_DOES_NOT_EXIST:
          'The Associate ID you entered does not exist. Please try again.',
        lbl_profile_survey_header:
          'Take a 5-second survey to make your shopping experience even better.',
        lbl_profile_survey_select_one: 'SELECT ONE',
        lbl_profile_survey_describe_yourself: 'How would you best describe yourself?',
        lbl_profile_survey_save: 'SAVE',
        lbl_profile_survey_describe_option1: 'Parent',
        lbl_profile_survey_describe_option2: 'Grandparent',
        lbl_profile_survey_describe_option3: 'Gifting for others',
        lbl_profile_survey_describe_option4: 'Prefer not to answer',
        lbl_profile_about_you_title: 'More About You',
        lbl_profile_about_you_describe: 'I describe myself as',
        lbl_profile_about_you_shopping: 'Shopping for',
        lbl_profile_update_info: 'UPDATE INFO',
        lbl_profile_addChildBirthdayCta: 'Add a Child',
        lbl_profile_survey_question1: 'How would you best describe yourself?',
        lbl_profile_survey_question1_option1: 'Parent',
        lbl_profile_survey_question1_option2: 'Grandparent',
        lbl_profile_survey_question1_option3: 'Gifting for others',
        lbl_profile_survey_question1_option4: 'Prefer not to answer',
        lbl_profile_survey_question2: 'Who are you shopping for?',
        lbl_profile_survey_question2_option1: 'Girl',
       lbl_profile_survey_question2_option2: 'Boy',
        lbl_profile_survey_question2_option3: 'Toddler Girl',
        lbl_profile_survey_question2_option4: 'Toddler Boy',
        lbl_profile_survey_question2_option5: 'Baby',
        lbl_profile_survey_hi: 'Hi',
        lbl_profile_edit_birthday_info: 'EDIT BIRTHDAY INFO',
        lbl_profile_survey_select_all: 'SELECT ALL THAT APPLY',
        lbl_profile_removeCTA: 'YES, REMOVE',
        lbl_profile_removeCancelCTA: 'NO',
        lbl_profile_removeInfoText:
          'Are you sure you want to remove $childName$ from the Birthday Savings List?',
        lbl_profile_removeBirthdaySuccess: 'Your account has been updated.',
        lbl_profile_genericError:
          'There is an issue in updating your profile information. Please try again',
        lbl_profile_DEFAULT_ERROR:
          "We're sorry that we 're unable to complete your birthday savings request at this time.Please try again later.",
        lbl_profile_about_you_modal_heading: 'MORE ABOUT YOU',
        dummylabel: 'dummylabel',
        lbl_add_child_child_information: 'Child’s Information',
        lbl_add_child_parent_digital_signature: 'Parent’s Digital Signature',
        lbl_add_child_child_name: "Child's Name",
        lbl_add_child_first_name: 'First Name',
        lbl_add_child_last_name: 'Last Name',
        lbl_add_child_birthday_heading: "Child's Birthday",
        lbl_add_child_gender_heading: "Child's Gender",
        lbl_add_child_birthday_month: 'Month',
        lbl_add_child_birthday_year: 'Year',
        lbl_add_child_choose_gender: 'Choose',
        lbl_add_child_timestamp: 'Timestamp',
        lbl_add_child_cancel: 'Cancel',
        lbl_add_child_save: 'Save',
        lbl_add_child_terms_agreement:
          'By entering your name and pressing "Add Child," you are signing this record and verifying to The Children\'s Place that you are (1) the parent or legal guardian of the child(ren) listed above, ',
        lbl_add_child_privacy: 'Privacy | ',
        lbl_add_child_faq: 'Frequently Asked Questions',
        lbl_add_child_terms_agreement_second:
          ' and (2) consenting to register yourself and the child(ren) listed above into the Birthday Savings.',
        lbl_profile_ERR_DBPOPULATE: 'There was a problem populating the database',
        lbl_profile__ERR_INVALID_COOKIE:
          'Your log in may have been used in another location. For your security, we have logged you out. Please click "Log Out"  at the top of the site and then log in again.',
        lbl_profile_mailingAddressActivityTitle: '+1 points',
        lbl_profile_favStoreActivityTitle: '+1 points',
        lbl_profile_userBirthdayActivityTitle: '+1 points',
        lbl_profile_surveyActivityTitle: '+1 points',
        lbl_profile_activityPercentage: '+1 points',
        lbl_profile_ASSOCIATE_ID_NOT_VALID:
          "The Associate ID you entered doesn't match the name in our records. Please try again.",
      },
      earnExtraPoints: {
        referred: [
          {
            name: null,
            contentId: '0b444a68-6a56-40b7-beb6-e25a7a5b9b84',
            __typename: 'ReferredContent',
          },
        ],
        lbl_earnExtraPoints_you_earned: 'You earned',
        lbl_earnExtraPoints_place_rewards: 'My Place Rewards Points!',
        lbl_earnExtraPoints_view_points_history: 'View Points History',
        lbl_earnExtraPoints_imageAlt: 'info icon',
        lbl_earnExtraPoints_youAreEarning: 'You’re Earning Extra Points',
        lbl_earnExtraPoints_checkOffers: 'Check offers on Earn Extra Points Page',
        lbl_earnExtraPoints_learnMore: 'Learn more',
      },
      addressBook: {
        referred: null,
        ACC_LBL_ADD_NEW_ADDRESS_CTA: 'ADD NEW ADDRESS',
        ACC_LBL_CREATE_ADDRESS_BOOK_MSG: 'Create an Address Book to check out faster!',
        ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG:
          'Add and save up to 5 shipping addresses so you can speed through the checkout process the next time you shop.',
        ACC_LBL_DEFAULT_SHIPPING: 'DEFAULT SHIPPING',
        ACC_LBL_BILLING: 'BILLING',
        ACC_LBL_SHIPPING: 'SHIPPING',
        ACC_LBL_DEFAULT_BILLING: 'DEFAULT BILLING',
        ACC_LBL_DELETE_ADDRESS_HEADING: 'DELETE ADDRESS',
        ACC_LBL_DELETE_ADDRESS_TITLE: 'Are you sure you want to delete this address?',
        ACC_LBL_ADDRESS_BOOK_HEADING: 'ADDRESS BOOK',
        ACC_LBL_FIRST_NAME: 'First Name',
        ACC_LBL_LAST_NAME: 'Last Name',
        ACC_LBL_ADDRESS_LINE1: 'Address Line 1',
        ACC_LBL_ADDRESS_LINE2: 'Address Line 2 (Optional)',
        ACC_LBL_CITY: 'City',
        ACC_LBL_STATE: 'State',
        ACC_LBL_PROVINCE: 'Province',
        ACC_LBL_ZIP_CODE: 'Zip Code',
        ACC_LBL_POSTAL_CODE: 'Postal Code',
        ACC_LBL_COUNTRY: 'Country',
        ACC_LBL_PHONE_NUMBER: 'Phone Number',
        ACC_LBL_ADD_ADDRESS_CTA: 'ADD ADDRESS',
        ACC_LBL_SET_DEFAULT: 'Set as default shipping address',
        ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER: 'Verify Your Address',
        ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD: 'Add Address',
        ACC_LBL_EDIT_ADDRESS: 'EDIT ADDRESS',
        ACC_LABEL_VERIFY_YOUR_ADDRESS_AE09:
          'There may be an issue with your address as entered. Please double check it, or if you believe the address is correct you can continue to the next step.',
        ACC_LABEL_VERIFY_YOUR_ADDRESS_AE10:
          'The house / building number is missing from your address. Please review and confirm your address.',
        ACC_LABEL_VERIFY_YOUR_ADDRESS_AE11:
          'The house / building number is not valid. Please review and confirm your address.',
        ACC_LABEL_VERIFY_YOUR_ADDRESS_AE12:
          'The house / building number is not valid. Please review and confirm your address.',
        ACC_LABEL_VERIFY_YOUR_ADDRESS_DEFAULT:
          'There may be an issue with your address as entered. Please double check it, or select from the below.',
        ACC_LBL_YOU_ENTERED: 'YOU ENTERED',
        ACC_LBL_WE_SUGGEST: 'WE SUGGEST',
        ACC_LBL_OPTIONAL_ADDRESS_LINE: 'Apartment or suite number',
        ACC_LBL_CONTINUE_CTA: 'CONTINUE',
        ACC_LBL_ADD_ADDRESS_FORM_HEADING: 'ADD NEW SHIPPING ADDRESS',
        ACC_LBL_EDIT_ADDRESS_FORM_HEADING: 'EDIT SHIPPING ADDRESS',
        lbl_deleteAddressModal_ccAssociatedAddressMsg:
          'Credit cards associated with this address will also be deleted',
        lbl_address_book_error_zipcode: 'There was a missing parameter: zipCode',
      },
      paymentGC: {
        referred: [
          {
            name: 'paymentGCTopBanner',
            contentId: 'a4546bfa-522e-4b99-9976-1cdc5be8d418',
            __typename: 'ReferredContent',
          },
        ],
        lbl_payment_heading: 'PAYMENTS & GIFT CARDS ',
        lbl_payment_ccHeading: 'CREDIT & DEBIT CARDS',
        lbl_payment_ccEmptyAddBtn: 'ADD A CREDIT OR DEBIT CARD',
        lbl_payment_CCEmptyHeading: 'Add a credit or debit card to check out faster!',
        lbl_payment_CCEmptyDesc:
          'Securely save your credit card, and/or My Place Rewards Card information so you can check out even faster!',
        lbl_payment_gcHeading: 'GIFT CARDS & MERCHANDISE CARDS',
        ' lbl_payment_gcEmptyAddBtn': 'ADD A GIFT CARD',
        lbl_payment_GCEmptyHeading: 'Add a gift card and/or merchandise cards!',
        lbl_payment_GCEmptyDesc:
          'Save up to 5 gift cards and/or merchandise cards to use the next time you shop.',
        lbl_payment_modalGCHeading: 'Are you sure you want to delete this gift card?',
        lbl_payment_modalCCHeading: 'Are you sure you want to delete this Credit/Debit Card?',
        lbl_payment_modalDeleteCard: 'DELETE CARD',
        lbl_payment_cardNum: 'Card ending in ',
        lbl_payment_expDate: 'Expires on ',
        lbl_payment_offersMessage:
          '<b>SAVE 30% TODAY WHEN YOU OPEN AND USE A <span class="offers__msg"> MY PLACE REWARDS CREDIT CARD! </span></b>',
        lbl_payment_offersMessageMobile:
          '<div style="font-size:12px;font-weight:bold;">SAVE 30% TODAY WHEN YOU OPEN AND USE A <span class="offers__msg"> MY PLACE REWARDS CREDIT CARD! </span></div>',
        lbl_payment_offersDetails: '<a class="offers__link" href="#">DETAILS</a>',
        lbl_payment_defaultCardName: 'Credit Card',
        lbl_payment_venmoAccount: 'Your Venmo Account',
        lbl_payment_giftCard: 'Gift Card',
        lbl_payment_remBal: 'Remaining balance',
        lbl_payment_defaultPayment: 'DEFAULT PAYMENT',
        lbl_payment_plccCard: 'My Place Rewards Credit Card',
        lbl_payment_venmoHeading: 'VENMO',
        lbl_payment_modalVenmoDelete: 'DELETE VENMO',
        lbl_payment_modalVenmoDeleteHeading:
          'Are you sure you want to delete this saved Venmo payment?',
        lbl_payment_checkBalance: ' Check Balance',
        lbl_payment_addNewAddCta: '+ Add New Address',
        lbl_payment_ccAdressSelect: 'Select from Address Book',
        lbl_payment_cardNumber: 'Card #',
        lbl_payment_expMonth: 'Exp. Month',
        lbl_payment_expYear: 'Exp. Year',
        lbl_payment_addCCHeading: 'ADD CREDIT OR DEBIT CARD',
        lbl_payment_editCCHeading: 'EDIT CREDIT OR DEBIT CARD',
        lbl_payment_addBtn: 'ADD NEW CARD',
        lbl_common_delete: 'Delete',
        lbl_common_edit: 'Edit',
        lbl_payment_errorMsg: 'Your action could not be completed due to a system error',
        lbl_payment_GCEmptyAddBtn: 'ADD A GIFT CARD',
        lbl_payment_loading: 'LOADING...',
        lbl_common_makeDefault: 'Make Default',
        lbl_payment_modalGCCancel: "No, Don't Delete",
        lbl_payment_modalGCCardEnd: 'Card ending in ',
        lbl_payment_modalGCConfirm: 'Yes, Delete',
        lbl_payment_gcExpire: ' Expires on ',
        lbl_payment_remainingBalance: 'Remaining balance',
        lbl_payment_successMsg: 'Your account has been updated',
        lbl_payment_billingAddress: 'Billing Address',
        lbl_payment_addGiftCard: 'ADD GIFT CARD',
        lbl_payment_giftCardMessage:
          "<span class='card__msg--bold'>HEADS UP - Don't throw away your gift card!<span><br/><span class='card__msg'>Adding a gift card is a convienent way to save money in your account on future purchases. However, if you want to use your gift card for an in-stor",
        lbl_payment_addCard: 'ADD CARD',
        lbl_payment_cancelCard: 'CANCEL',
        lbl_payment_opSuccess: 'Your account has been updated',
        lbl_payment_opFailure: 'Your action could not be completed due to a system error',
        lbl_payment_giftCardNoPlaceholder: 'Gift Card #',
        lbl_payment_giftCardPinPlaceholder: 'Pin #',
        lbl_payment_giftCardMessageHeading: "HEADS UP - Don't throw away your gift card!",
        lbl_payment_giftCardMessageDescription:
          'Adding a gift card is a convienent way to save money in your account on future purchases. However, if you want to use your gift card for an in-store purchase you will need to present the physical card to the cashier.',
        lbl_paymentGC_error_pay_account: 'There was a missing parameter: pay_account',
        lbl_paymentCC_error_pay_expire_month: 'There was a missing parameter: pay_expire_month',
        lbl_paymentCC_error: 'An error occur',
        lbl_paymentGC_error: 'An error occur',
        lbl_paymentCC_error_billing_nickName: 'There was a missing parameter: billing_nickName',
        lbl_paymentCC_error__ERR_DUPLICATE_CARD: 'Please check if the card is already in use.',
        lbl_paymentGC_error__ERR_DUPLICATE_CARD: 'Please check if the card is already in use.',
        lbl_paymentGC_error__ERR_INVALID_PIN_CARD:
          'Oops... The card and/or pin number you entered is incorrect. Please try again.',
        lbl_paymentGC_error__ERR_MAX_LIMIT_REACHED:
          'A maximum of five payment methods may be saved to your account.',
        lbl_paymentCC_error__ERR_MAX_LIMIT_REACHED:
          'A maximum of five payment methods may be saved to your account.',
        lbl_paymentCC_error__CC_TOKENIZATION_REQUEST_FAILED_WITH_CONNECTIVITY_ERROR:
          'There was a problem processing your payment, please try again.',
      },
      preferences: {
        referred: null,
        lbl_prefrence_heading: 'My Preferences',
        lbl_prefrence_tileFavoriteStore: ' My Favorite Store',
        lbl_prefrence_social_account: ' Social Accounts',
        lbl_prefrence_rewards_prefrence: ' My Place Rewards Preferences',
        lbl_prefrence_access_buy_online_pickup:
          'In addition to emails, get rewards & other updates through our App or Text Alerts.',
        lbl_prefrence_marketing_notification:
          "By opting into My Place Rewards text alerts, you'll also receive marketing notifications.",
        lbl_prefrence_app_text: 'APP',
        lbl_prefrence_text_text: 'TEXTS',
        lbl_prefrence_tcp_label: 'The Children’s Place',
        lbl_prefrence_gym_label: 'Gymboree',
        lbl_prefrence_program_details: ' Program Details',
        lbl_prefrence_term_codition: 'Terms & Conditions',
        lbl_prefrence_connected: 'Connected',
        lbl_prefrence_connectTo: 'Connect to ',
        lbl_prefrence_social_text: 'Link your social accounts to earn extra points!',
        lbl_prefrence_social_points_heading: 'Congratulations!',
        lbl_prefrence_social_points_text_1: 'You’ve earned',
        lbl_prefrence_social_points_text_2:
          'My Place Rewards Points for linking your facebook account!',
        lbl_prefrence_social_points_text_3:
          'Points will appear in your account in approximately 24-48 hours.',
        lbl_prefrence_social_points_text_4: 'Want even more points?',
        lbl_prefrence_social_points_modal_viewall_btn: 'VIEW ALL',
        lbl_prefrence_social_points_modal_close_btn: 'CLOSE',
        lbl_prefrence_social_points_text_5: ' Check out other ways to earn!',
        lbl_prefrence_social_points_text_2_instagram:
          'My Place Rewards Points for linking your instagram account!',
        lbl_prefrence_social_points_text_2_twitter:
          'My Place Rewards Points for linking your twitter account!',
        lbl_prefrence_view_preferences: 'View Preferences',
        lbl_prefrence_tile_access_buy_online_pickup:
          'Access Buy Online - Pick Up In Store info, store hours and directions.',
        lbl_prefrence_tile_add: 'Add',
        lbl_prefrence_tile_edit: 'Edit',
        lbl_preference_tileContactPreference: 'Contact Preferences',
        lbl_prefrence_tile_connected_social_accounts_heading: 'Connected Social Accounts',
        lbl_prefrence_tile_connected_social_accounts_text: 'Link an account to earn extra points!',
        lbl_prefrence_subscribe_text_alerts: 'Subscribe to Text Alerts',
        lbl_prefrence_modal_info_text:
          'Click submit to start the process of receiving My Place Rewards SMS Alerts about rewards, points, coupons & special offers via text nofications.',
        lbl_prefrence_modal_sub_info_text:
          "If you are not already subscribed for other text alerts, you'll receive a text message to the number provided; reply with Y to be subscribed!",
        'lbl_prefrence_modal_disclaimer_line-1':
          'Frequency varies. Carrier messages & data rates may apply. Recurring automated marketing and loyalty messages will be sent to the number provided at opt-in. Text STOP to 89700 to opt-out. See ',
        'lbl_prefrence_modal_disclaimer_line-2':
          '<a href="/help-center/#mobiletermsAndConditionsli">Mobile T&Cs & Privacy Policy</a> .',
        'lbl_prefrence_modal_disclaimer_line-3': 'No purchase necessary. US customers only.',
        lbl_prefrence_modal_submit: 'Submit',
        lbl_prefrence_modal_cancel: 'Cancel',
        lbl_prefrence_modal_unsubscribe_title: 'Unsubscribe from My Place Rewards SMS Alerts',
        lbl_prefrence_modal_are_you_sure: 'Are you sure?',
        lbl_prefrence_modal_clicking_submit_text:
          'By clicking submit, you’ll no longer receive text notifications about rewards, points, coupons & special offers!',
        lbl_prefrence_modal_phone_number: 'Phone Number',
        lbl_prefrencetile_app_text: 'APPS',
        lbl_preference_tileTextText: 'TEXTS',
        lbl_preference_tileAdd: 'Add',
        lbl_preference_tileEdit: 'Edit',
        lbl_preference_tileAppText: 'APPS',
        lbl_preference_tileConnectedSocialAccountsHeading: 'Connected Social Accounts',
        lbl_preference_tileConnectedSocialAccountsText: 'Connected Social Accounts',
      },
      orders: {
        referred: null,
        lbl_orders_heading: 'ORDERS',
        lbl_orders_recentOrder: 'MOST RECENT ORDER',
        lbl_orders_pastOrders: 'PAST ORDERS',
        lbl_orders_orderDate: 'Order date',
        lbl_orders_orderNumber: 'Order Number',
        lbl_orders_orderType: 'Order Type',
        lbl_orders_orderStatus: 'Status',
        lbl_orders_orderTotal: 'Total',
        lbl_orders_showMore: 'Show More',
        lbl_orders_showLess: 'Show Less',
        lbl_orders_caOrdersLink: 'Show Canadian Orders',
        lbl_orders_usOrdersLink: 'Show US Orders',
        lbl_orders_internationalOrdersLink: 'Show International Orders',
        lbl_orders_shopNow: 'SHOP NOW',
        lbl_orders_emptySupportingText: 'You have not placed any order yet.',
        lbl_orders_statusOrderReceived: 'Order Received',
        lbl_orders_statusOrderExpired: 'Expired',
        lbl_orders_statusOrderCancelled: 'Canceled',
        lbl_orders_statusOrderShipped: 'Order Shipped',
        lbl_orders_statusOrderPartiallyShipped: 'Partially Shipped',
        lbl_orders_statusItemsReceived: 'Received',
        lbl_orders_statusItemsReadyForPickup: 'Ready For Pickup',
        lbl_orders_statusItemsPickedUp: 'Picked Up',
        lbl_orders_statusNa: 'N/A',
        lbl_orders_statusUserCallNeeded: 'Call Needed',
        lbl_orders_online: 'Online',
        lbl_orders_pickupStore: 'Pick Up In Store',
        lbl_orderDetails_heading: 'ORDER DETAILS',
       lbl_orderDetails_orderNumber: 'Order Number',
        lbl_orderDetails_orderDate: 'Order Date',
        lbl_orderDetails_at: 'at',
        lbl_orderDetails_upc: 'UPC: ',
        lbl_orderDetails_color: 'Color: ',
        lbl_orderDetails_fit: 'Fit: ',
        lbl_orderDetails_size: 'Size: ',
        lbl_orderDetails_price: 'Price: ',
        lbl_orderDetails_youPaid: 'You Paid: ',
        lbl_orderDetails_quantity: 'Quantity: ',
        lbl_orderDetails_subTotal: 'Subtotal: ',
        lbl_orderDetails_writeReview: 'Write a Review',
        lbl_orderDetails_shipping: 'Shipping',
        lbl_orderDetails_orderSummary: 'Order Summary',
        lbl_orderDetails_billing: 'Billing',
        lbl_ordersTile_heading: 'My Recent Orders',
        lbl_ordersTile_viewAllOrders: 'View All Orders',
        lbl_ordersTile_noOrderYet: 'You have not placed any orders yet.',
        lbl_ordersTile_orderNum: 'Order No',
        lbl_ordersTile_purchase: 'Purchase',
        lbl_orders_trackit: 'TRACK IT',
        lbl_orders_items: 'Items',
        lbl_orders_couponsPromotions: 'Coupons & Promotions',
        lbl_orders_tax: 'Tax',
        lbl_orders_free: 'FREE',
        lbl_orders_ending: 'ending in',
        lbl_orders_noLongerAvailable: 'No Longer Available: ',
        lbl_orders_canceledItems: 'Canceled Items: ',
        lbl_orders_isBossOrderCancelNotification:
          'The following has been removed from your order due to availability issues. The items will not be shipped. You will not be charged',
        lbl_orders_CancelNotification: 'This order has been canceled and will not be shipped.',
        lbl_orders_purchasedItems: 'Purchased Items: ',
        lbl_orders_outOfStock: 'Out of Stock: ',
        lbl_orders_outOfStockNotification:
          'Unfortunately some items were out of stock and could not be shipped. You have been fully refunded.',
        lbl_orders_expectedPickup: 'Expected Pickup Date',
        lbl_orders_expirationDate: 'Expiration Date',
        lbl_orders_orderInProcess: 'Order in Process:',
        lbl_orders_orderIsReadyForPickup:
          '- We will notify you when your order is ready for pickup',
        lbl_orders_processing: ' Processing',
        lbl_orders_shippedOn: 'Shipped on: ',
        lbl_orders_orderCancelMessage: 'This order has been canceled.',
        lbl_orders_pleasePickupBy: 'Please pick up by: ',
        lbl_orders_pickedUpOn: 'Picked up on: ',
        lbl_orders_trackingNumber: 'Tracking number: ',
        lbl_orderDetails_pickup: 'Pickup',
        lbl_orders_openToday: 'Open today',
        lbl_orders_phone: 'Phone',
        lbl_orders_getDirections: 'Get directions',
        lbl_orders_pickupPerson: 'Pickup Person(s)',
        lbl_orders_bossStatus: 'Status',
        lbl_orders_orderDateCaps: 'Order Date',
        lbl_orderDetail_heading: 'ORDER',
        lbl_orders_freeAmount: '0.00',
      },
      common: {
        referred: null,
        lbl_common_updateCTA: 'Update',
        lbl_common_addCTA: 'Add',
        lbl_common_cancelCTA: 'Cancel',
        lbl_common_backLink: 'Back',
        lbl_common_makeDefault: 'Make Default',
        lbl_common_edit: 'Edit',
        lbl_common_delete: 'Delete',
        lbl_common_successMessage: 'Your account has been updated',
        lbl_common_errorMessage: 'Your action could not be completed due to a system error',
        lbl_common_dontDelete: "No, Don't Delete",
        lbl_common_YesDelete: 'Yes, Delete',
        lbl_common_cancelCTACaps: 'CANCEL',
        lbl_common_updateAddressCTA: 'UPDATE',
        lbl_common_tnc: 'Terms & Conditions',
        ACC_LBL_CANCEL_CTA_CAPS: 'CANCEL',
        lbl_common_current_points: 'Current Points',
        lbl_common_next_reward: 'Points to next reward',
        lbl_common_currency: '$',
        lbl_common_heading: 'My Rewards',
        lbl_common_details: 'Details',
        lbl_common_applied_to_order: 'APPLIED TO ORDER',
        lbl_common_order_date: 'ORDER DATE',
        lbl_common_transaction: 'TRANSACTION',
        lbl_common_points_earned: 'POINTS EARNED',
        lbl_common_points_history: 'Points History',
        lbl_common_next_reward_points: 'Points to Next Reward',
        lbl_common_point_balance: 'Points Balance',
        lbl_common_saveCTA: 'SAVE',
        lbl_common_tapClose: 'Tap to close it',
        lbl_common_couponTypePlacecash: 'PLACE CASH',
        lbl_common_couponTypeReward: 'REWARD',
        lbl_common_couponTypeSaving: 'SAVINGS',
        lbl_coupon_expiringSoon: 'EXPIRING SOON',
        lbl_coupon_couponValid: 'Valid',
        lbl_coupon_couponUseBy: 'Use By',
        lbl_coupon_detailsLink: 'Details',
        lbl_coupon_viewPrint: 'VIEW & PRINT',
        lbl_coupon_removeFromBag: 'REMOVE FROM BAG',
        lbl_coupon_applyToBag: 'APPLY TO BAG',
        lbl_coupon_expiring: 'EXPIRING',
        lbl_common_applied_to_bag: 'Applied to Bag',
        lbl_common_points_history_nopoints:
          'Uh oh...you currently do not have any points. Start shopping now to begin earning points.',
        lbl_common_viewAll: 'View All',
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_points_history_heading: 'POINTS HISTORY',
        lbl_common_myFavoriteStore: 'My Favorite Store',
        lbl_common_addAStore: 'Add A Store',
        lbl_common_updateFavoriteStore: 'Update Favorite Store',
        lbl_common_accessBuyOnline:
          'Access Buy Online - Pick Up in Store info, store hours and directions.',
        lbl_common_favStoreNotAdded: "You haven't added a favorite store yet.",
        lbl_points_history_program_details: 'Program Details',
        lbl_common_extraPointsHeading: 'EARN EXTRA POINTS',
        lbl_common_check_here: '*Click Here ',
        lbl_common_extra_points_terms_conditions: 'for Earn Extra Points Terms & Conditions',
        lbl_extraExtraPoints_more_points: 'Earn even more points by activating these offers!',
        lbl_earnExtraPoints_getReward: 'Get even closer to your next reward!      ',
      },
    },
    PLP: {
      seoText: {
        referred: null,
        lbl_read_more: 'Read More +',
        lbl_read_less: 'Read Less -',
      },
      PLP_sort_filter: {
        referred: null,
        lbl_apply: 'Apply',
        lbl_filter_by: 'Filter By:',
        lbl_filter: 'FILTER',
        lbl_sort: 'SORT',
        lbl_clear: 'Clear All',
        lbl_filtering_by: 'Filtering By',
      },
      plpTiles: {
        referred: null,
        lbl_add_to_bag: 'ADD TO BAG',
        lbl_pdp_size_error: 'Please select a size.',
        lbl_pdp_size: 'SIZE',
        lbl_pdp_fit: 'FIT',
        lbl_pdp_color: 'COLOR',
        lbl_pdp_quantity: 'QUANTITY',
        lbl_pdp_update: 'Update',
      },
    },
    Browse: {
      Sort: {
        referred: null,
        lbl_recommended: 'Recommended',
        lbl_min_offer_price_desc: 'Price: High to Low',
        lbl_min_offer_price_asc: 'Price: Low to High',
        lbl_favoritedcount: 'Most Favorited',
        lbl_TCPBazaarVoiceRating: 'Top Rated',
        lbl_newest_score: 'Newest',
      },
      QuickView: {
        referred: null,
        lbl_add_to_bag: 'Add To Bag',
        lbl_view_product_details: 'View Product Details',
      },
      ProductPickup: {
        referred: null,
        lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: 'Select Store',
        lbl_Product_pickup_PRODUCT_BOPIS: 'Buy online - Pick up in store',
        lbl_Product_pickup_BOPIS_AVAILABLE: 'Pick up TODAY!',
        lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
        lbl_Product_pickup_BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
        lbl_Product_pickup_BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
        lbl_Product_pickup_PICKUP_IN_STORE: 'PICK UP IN STORE',
        lbl_Product_pickup_SPACE_ONE: ' ',
        lbl_Product_pickup_FREE_SHIPPING: 'FREE Shipping Every Day!',
        lbl_Product_pickup_NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
        lbl_Product_pickup_FIND_STORE: 'FIND A STORE',
        lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: 'slim',
        lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: 'husky',
        lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: 'plus',
      },
      SLP: {
        referred: null,
        lbl_searched_for: 'You searched for',
        lbl_showing_x_items: 'Showing',
        lbl_items: 'Items',
        lbl_item: 'Item',
        lbl_nothing_matched: 'Nothing matched your search for',
        lbl_didYouMean: 'Did you mean',
        lbl_tips: 'Tips for Searching',
        lbl_check_your_spelling: 'Check your spelling',
        lbl_simplified_keywords: 'Use simplified keywords (jeans, tee, top, hat, dress)',
        lbl_try_searching: 'Try searching by themes/categories (dinosaur, active, uniform, pj set)',
        lbl_narrow_searches: 'Try broader searches and then narrow your results',
        lbl_looking_for: 'What are you looking for?',
        lbl_no_suggestion: 'No Suggestions Found',
        lbl_noresults_found: 'No Results Found',
        lbl_search_looking_for: "I'M LOOKING FOR",
        lbl_category_matches: 'CATEGORY MATCHES',
        lbl_search_whats_trending: "WHAT'S TRENDING",
        lbl_search_recent_search: 'YOUR RECENT SEARCHES',
        lbl_search_product_matches: 'TOP MATCHING PRODUCTS',
        lbl_cancel_search: 'Cancel',
      },
      PDP: {
        referred: null,
        lbl_full_size: 'Full Size',
        lbl_ratings_and_reviews: 'Ratings & Reviews',
        lbl_promo_area_1: 'PROMO AREA 1',
        lbl_promo_area_3: 'PROMO AREA 3',
        lbl_complete_the_look: 'COMPLETE THE LOOK',
        lbl_you_may_also_like: 'YOU MAY ALSO LIKE',
        lbl_recently_viewed: 'RECENTLY VIEWED',
        lbl_my_style_place: 'MY STYLE PLACE',
        lbl_rating_review: 'RATINGS AND REVIEWS',
        lbl_product_description_show_more: 'Show More',
        lbl_product_description_show_less: 'Show Less',
        lbl_product_description_label: 'Product Description',
        lbl_product_description_claim_message: 'Big Fashion, Little Prices',
        lbl_product_description_item_part_number: 'Item #:',
        lbl_prefer_sending_via_email: 'Prefer sending via email?',
        lbl_send_an_email_card: 'Send an E-Gift Card',
        lbl_free_shipping_every_day: 'FREE SHIPPING EVERY DAY! No Minimum Purchase Required.',
        lbl_back: 'Back',
        eGiftCardLink:
          'https://thechildrensplace.thegiftcardshop.com/occasions.html?&delivery=digital&cardtype=giftcard&extratype=animation',
        lbl_promo_area: 'PROMO AREA',
      },
      Outfit: {
        referred: null,
        lbl_outfit_title: 'Outfit Detail Page',
        lbl_outfit_breadcrumb: 'OUTFIT BREADCRUMB',
        lbl_outfit_viewdetail: 'View Product Details',
        lbl_shop_this_look: 'Shop This Look',
        lbl_outfit_label: 'OUTFITS',
        lbl_outfit_shop_this_look: 'Shop This Look ›',
      },
    },
    StoreLocator: {
      StoreList: {
        referred: [
          {
            name: 'StoreInternationalHtml',
            contentId: '42f8fa10-0aec-4858-bed7-c56a2e2609d8',
            __typename: 'ReferredContent',
          },
        ],
        lbl_storelist_shop_in_shop: 'shop-in-shop',
        lbl_storelist_searchByStates: 'SEARCH FOR STORES BY STATE',
        lbl_storelist_searchByStates_dropdown: 'Select a State',
        lbl_storelist_backLink: 'Back',
      },
      StoreLanding: {
        referred: null,
        lbl_storelanding_openInterval: 'open until',
        lbl_storelanding_milesAway: 'miles away',
        lbl_storelanding_getdirections_link: 'Get Directions',
        lbl_storelanding_favStore: 'Your Store',
        lbl_storelanding_setfavStore: 'SET AS FAVORITE',
        lbl_storelanding_storedetails_link: 'Store Details',
        lbl_storelanding_atThisPlace: 'at this PLACE!',
        lbl_storelanding_errorLabel: 'there is an error in the input',
        lbl_storelanding_storeSearchPlaceholder: 'ZIP or city, state',
        lbl_storelanding_findStoreHeading: 'Find a Store',
        lbl_storelanding_gymboreeStores: 'Gymboree',
        lbl_storelanding_outletStores: 'Only Outlet Stores',
        lbl_storelanding_currentLocation: 'Use my current location',
        lbl_storelanding_viewMap: 'View Map',
        lbl_storelanding_viewList: 'View List',
        lbl_storelanding_allUSCAStores: 'All US & Canada Stores',
        lbl_storelanding_internationalStores: 'International Stores',
        lbl_storelanding_favStoreHeading: 'Your Favorite Store',
        lbl_storelanding_noStoresFound:
          'Sorry, we couldn’t find any stores for your search. Please try again.',
        lbl_storelanding_opensAt: 'opens at',
      },
      StoreDetail: {
        referred: [
          {
            name: 'storelocator_Promo1',
            contentId: '2321f41e-b11f-4506-9f8a-b31b78fb53cf',
            __typename: 'ReferredContent',
          },
          {
            name: 'storelocator_Promo3',
            contentId: '118d7fe0-be93-41c6-afba-bf239eacb451',
            __typename: 'ReferredContent',
          },
          {
            name: 'storelocator_Promo2',
            contentId: '44f8fac4-099b-4b3e-a60d-e9a94b558af4',
            __typename: 'ReferredContent',
          },
          {
            name: 'storeLocator_description',
            contentId: '4a92faa4-4f65-4d47-bab2-42602ac2662e',
            __typename: 'ReferredContent',
          },
        ],
        lbl_storedetails_getdirections_btn: 'Directions',
        lbl_storedetails_callstore_btn: 'Call Store',
        lbl_storedetails_changestore_btn: 'Change Favorite Store',
        lbl_storedetails_mallType: 'Mall Type:',
        lbl_storedetails_entranceType: 'Type of Entrance:',
        lbl_storedetails_locations_details_btn: 'SEE STORE DETAILS',
        lbl_storedetails_locations_title: 'OTHER LOCATIONS NEAR YOU',
        lbl_storedetails_seemorestores_btn: 'SEE MORE STORE',
        lbl_storedetails_setfav_btn: 'Set as favorite',
        lbl_storedetails_locations_more_store: 'See more stores',
        lbl_storedetails_backLink: 'Back',
        lbl_storedetail_storedetailTxt: 'STORE DETAILS',
      },
    },
  },
  action
) => {
  switch (action.type) {
    // case GLOBAL_CONSTANTS.LOAD_LABELS_DATA:
    //   return { ...state, ...action.payload };
    // case GLOBAL_CONSTANTS.SET_LABELS_DATA:
    //   return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export default LabelReducer;

// TODO - - GLOBAL-LABEL-CHANGE - STEP 3 - Immutable code but it is breaking the view layers of component
// import { fromJS } from 'immutable';
// import GLOBAL_CONSTANTS from '../constants';

// const initialState = fromJS({
// });

// const getDefaultState = state => {
//  TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
//   if (state instanceof Object) {
//     return fromJS(state);
//   }
//   return state;
// };

// const setLabelsInState = (state, {payload:{data, category, subCategory=null}}) => {
//   return state.merge(fromJS(data));
// }

// const LabelReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GLOBAL_CONSTANTS.SET_LABELS_DATA:
//       return setLabelsInState(state, action);
//     default:
//       return getDefaultState(state);
//   }
// };

// export default LabelReducer;

// const LabelReducer = (state = {}, action) => {
//   switch (action.type) {
//     case GLOBAL_CONSTANTS.LOAD_LABELS_DATA:
//       return { ...state, ...action.payload };
//     case GLOBAL_CONSTANTS.SET_LABELS_DATA:
//       return { ...state, ...action.payload.data };
//     default:
//       return state;
//   }
// };

// export default LabelReducer;

// TODO - - GLOBAL-LABEL-CHANGE - STEP 3 - Immutable code but it is breaking the view layers of component
// import { fromJS } from 'immutable';
// import GLOBAL_CONSTANTS from '../constants';

// const initialState = fromJS({
// });

// const getDefaultState = state => {
//  TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
//   if (state instanceof Object) {
//     return fromJS(state);
//   }
//   return state;
// };

// const setLabelsInState = (state, {payload:{data, category, subCategory=null}}) => {
//   return state.merge(fromJS(data));
// }

// const LabelReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GLOBAL_CONSTANTS.SET_LABELS_DATA:
//       return setLabelsInState(state, action);
//     default:
//       return getDefaultState(state);
//   }
// };

// export default LabelReducer;
