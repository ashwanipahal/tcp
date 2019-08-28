import React from 'react';
import { shallow } from 'enzyme';
import CheckoutSectionTitleDisplay from '../CheckoutSectionTitleDisplay.view.native';

describe('CheckoutSectionTitleDisplay', () => {
  it('should render correctly', () => {
    const tree = shallow(<CheckoutSectionTitleDisplay title="hello" />);
    expect(tree).toMatchSnapshot();
  });
});
