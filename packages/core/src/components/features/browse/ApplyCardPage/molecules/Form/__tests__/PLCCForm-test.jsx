import React from 'react';
import { shallow } from 'enzyme';
import { PLCCForm } from '../PLCCForm';

describe('ContactInformationFormWrapper component', () => {
  const props = {
    dispatch: jest.fn(),
    disclaimersData: {
      credit_card_header: 'header',
      contact_information_disclaimer: 'contact info',
      account_classified_disclaimer: 'account',
      electronic_consent: 'consent',
    },
    labels: {
      plcc_form_submit_button: 'submit',
      plcc_form_checkbox_text: 'checkbox',
      plcc_form_nothanks: 'no thanks',
    },
  };

  it('should renders correctly', () => {
    const component = shallow(<PLCCForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
