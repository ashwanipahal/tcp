import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationItemDisplayVanilla } from '../views/ConfirmationItemDisplay.view';

describe('ConfirmationItemDisplayVanilla', () => {
  it('should render correctly', () => {
    const props = { className: '', title: 'hey', children: {}, boldFont: true };
    const tree = shallow(<ConfirmationItemDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with bold fornt false', () => {
    const props = { className: '', title: 'hey', children: {}, boldFont: false };
    const tree = shallow(<ConfirmationItemDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
