import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardFieldsVanilla } from '../views/CreditCardFields.view.native';

describe('CreditCardFields native Component', () => {
  let component;

  const props = {
    creditFieldLabels: {
      creditCardNumber: '',
      expMonth: '',
      expYear: '',
      cvvCode: '',
    },
    cardTypeImgUrl: '',
    cardType: '',
    isPLCCEnabled: true,
    dto: {},
    selectedCard: null,
    showCvv: true,
    cameraIcon: false,
    className: '',
    labels: {},
    updateCardDetails: jest.fn(),
  };

  it('CreditCardFields native should be defined', () => {
    component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('CreditCardFields to render correctly ', () => {
    component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('CreditCardFields to render correctly ', () => {
    props.dto = { accountNo: '' };
    props.isEdit = true;
    props.cameraIcon = true;
    props.cardType = null;
    component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
