import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationViewVanilla } from '../views/Confirmation.view';

describe('ConfirmationViewVanilla', () => {
  it('should render correctly', () => {
    const tree = shallow(<ConfirmationViewVanilla />);
    expect(tree).toMatchSnapshot();
  });
});
