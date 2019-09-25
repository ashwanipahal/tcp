import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { BillingPageContainerVanilla as BillingPageContainer } from '../BillingSection.container';

describe('Gift Cards Container', () => {
  const props = {
    appliedGiftCards: fromJS([]),
    card: null,
    labels: {},
    address: null,
  };

  it('should render Gift Card view section', () => {
    const component = shallow(<BillingPageContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
