import {
  getSmsSignUpFields,
  getSendOrderUpdate,
  getAddressFormLabels,
  getShippingLabels,
  getSmsSignUpLabels,
} from '../ShippingPage.selectors';

describe('#Shipping Page Selectors', () => {
  it('#getAddressFormLabels', () => {
    const LabelsState = {
      global: {
        addEditAddress: {
          lbl_addEditAddress_editAddress: 'editAddress',
          lbl_addEditAddress_addAddress: 'addAddressHeading',
          lbl_addEditAddress_fname: 'firstName',
          lbl_addEditAddress_lname: 'lastName',
          lbl_addEditAddress_addressLine1: 'addressLine1',
          lbl_addEditAddress_addressLine2: 'addressLine2',
          lbl_addEditAddress_city: 'city',
          lbl_addEditAddress_state: 'stateLbl',
          lbl_addEditAddress_province: 'province',
          lbl_addEditAddress_zipCode: 'zipCode',
          lbl_addEditAddress_postalCode: 'postalCode',
          lbl_addEditAddress_country: 'country',
          lbl_addEditAddress_phoneNumber: 'phoneNumber',
          lbl_addEditAddress_setDefault: 'setDefaultMsg',
          lbl_addEditAddress_addressButton: 'addAddress',
          lbl_addEditAddress_update: 'update',
          lbl_addEditAddress_cancel: 'cancel',
          lbl_addEditAddress_internationalShipping: 'shipInternationally',
        },
      },
    };
    const state = {
      Labels: LabelsState,
    };
    expect(getAddressFormLabels(state)).toEqual({
      addressFormLabels: {
        firstName: 'firstName',
        lastName: 'lastName',
        addressLine1: 'addressLine1',
        addressLine2: 'addressLine2',
        city: 'city',
        stateLbl: 'stateLbl',
        province: 'province',
        zipCode: 'zipCode',
        postalCode: 'postalCode',
        country: 'country',
        phoneNumber: 'phoneNumber',
        setDefaultMsg: 'setDefaultMsg',
        addAddress: 'addAddress',
        update: 'update',
        cancel: 'cancel',
        editAddress: 'editAddress',
        addAddressHeading: 'addAddressHeading',
        shipInternationally: 'shipInternationally',
      },
    });
  });

  it('#getShippingLabels', () => {
    const LabelsState = {
      checkout: {
        shipping: {
          lbl_shipping_header: 'shipping',
          lbl_shipping_sectionHeader: 'shipping details',
        },
      },
    };
    const state = {
      Labels: LabelsState,
    };
    expect(getShippingLabels(state)).toEqual({
      header: 'shipping',
      sectionHeader: 'shipping details',
    });
  });

  it('#getSmsSignUpLabels', () => {
    const LabelsState = {
      global: {
        smsSignup: {
          lbl_smsSignup_smsSignupText: 'smsSignupText',
          lbl_smsSignup_privacyPolicy: 'privacyPolicy',
          lbl_smsSignup_orderUpdates: 'order updates',
        },
      },
    };
    const state = {
      Labels: LabelsState,
    };
    expect(getSmsSignUpLabels(state)).toEqual({
      smsSignupText: 'smsSignupText',
      privacyPolicy: 'privacyPolicy',
      orderUpdates: 'order updates',
    });
  });

  it('#getSmsSignUpFields', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            smsSignUp: {
              sendOrderUpdate: false,
            },
          },
        },
      },
    };

    expect(getSmsSignUpFields(state)).toEqual(state.form.checkoutShipping.values.smsSignUp);
  });
  it('#getSendOrderUpdate', () => {
    const state = {
      form: {
        checkoutShipping: {
          values: {
            smsSignUp: {
              sendOrderUpdate: false,
            },
          },
        },
      },
    };

    expect(getSendOrderUpdate(state)).toEqual(false);
  });
});
