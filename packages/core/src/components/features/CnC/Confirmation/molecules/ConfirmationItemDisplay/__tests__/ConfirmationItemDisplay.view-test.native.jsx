import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationItemDisplay from '../views/ConfirmationItemDisplay.view.native';

describe('ConfirmationItemDisplayVanilla', () => {
  it('should render correctly', () => {
    const props = { className: '', title: 'hey', children: {}, boldFont: true };
    const tree = shallow(<ConfirmationItemDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with bold font false', () => {
    const props = { className: '', title: 'hey', children: {}, boldFont: false };
    const tree = shallow(<ConfirmationItemDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with bold isLink true', () => {
    const props = { className: '', title: 'hey', children: {}, boldFont: false, isLink: true };
    const tree = shallow(<ConfirmationItemDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
