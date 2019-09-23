import React from 'react';
import { shallow } from 'enzyme';
import PLCCForm from '../PLCCForm';

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
      lbl_PLCCForm_submitButton: 'submit',
      lbl_PLCCForm_noThanks: 'no thanks',
      lbl_PLCCForm_iAgreeCheckboxText: 'checkbox text',
    },
  };

  it('should renders correctly', () => {
    const component = shallow(<PLCCForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
