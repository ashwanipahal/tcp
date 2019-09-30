import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CreditCardDropDown } from '../views/CreditCardDropDown.view.native';

const card = [
  {
    accountNo: '************3743',
    addressDetails: {
      addressLine1: 'Dorney Park Road',
      addressLine2: '',
      city: 'Allentown',
      country: 'US',
    },
    ccBrand: 'PLACE CARD',
    ccType: 'PLACE CARD1',
    creditCardId: 82596,
    defaultInd: false,
  },
  {
    accountNo: '************3744',
    addressDetails: {
      addressLine1: 'Dorney Park Road',
      addressLine2: '',
      city: 'Allentown',
      country: 'US',
    },
    ccBrand: 'PLACE CARD',
    ccType: 'PLACE CARD1',
    creditCardId: 82596,
    defaultInd: true,
  },
];

const labels = { creditCardEnd: 'creditCardEnd', defaultBadge: 'defaultBadge' };

describe('CreditCardDropDown component', () => {
  const props = {
    labels,
    creditCardList: new List(card),
    dispatch: jest.fn(),
    selectedOnFileCardKey: 82596,
    onChange: jest.fn(),
    addNewCC: jest.fn(),
    onValueChange: jest.fn(),
  };

  it('renders correctly with props', () => {
    const component = shallow(<CreditCardDropDown {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props', () => {
    props.creditCardList = new List([]);
    const component = shallow(<CreditCardDropDown {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with onCardDropDownChange', () => {
    const component = shallow(<CreditCardDropDown {...props} />);
    const instance = component.instance();
    const spyOnCardDropDownChange = jest.spyOn(instance, 'onCardDropDownChange');
    instance.onCardDropDownChange('value');
    expect(spyOnCardDropDownChange).toHaveBeenCalled();
  });
  it('renders correctly with toggleAddNewMode', () => {
    const component = shallow(<CreditCardDropDown {...props} />);
    expect(component).toMatchSnapshot();

    const instance = component.instance();
    const spyToggleAddNewMode = jest.spyOn(instance, 'toggleAddNewMode');
    instance.toggleAddNewMode();
    expect(spyToggleAddNewMode).toHaveBeenCalled();
  });
});
