import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutSectionTitleDisplayVanilla } from '../CheckoutSectionTitleDisplay.view';

describe('CheckoutSectionTitleDisplay', () => {
  it('should render correctly', () => {
    const tree = shallow(<CheckoutSectionTitleDisplayVanilla title="hello" />);
    expect(tree).toMatchSnapshot();
  });
});
