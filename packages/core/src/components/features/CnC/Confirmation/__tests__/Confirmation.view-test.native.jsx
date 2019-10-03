import React from 'react';
import ConfirmationView from '../views/Confirmation.view.native';

describe('ConfirmationView', () => {
  it('should render correctly', () => {
    const props = {
      isGuest: true,
    }
    const tree = shallow(<ConfirmationView {...props} />);
    expect(tree).toMatchSnapshot();
  })
})
