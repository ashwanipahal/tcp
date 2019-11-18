import React from 'react';
import { shallow } from 'enzyme';
import { EmailSignUpCheckBoxVanilla } from '../views/EmailSignUpCheckBox.view';

describe('Shipping Form', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
    };
    const tree = shallow(<EmailSignUpCheckBoxVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
