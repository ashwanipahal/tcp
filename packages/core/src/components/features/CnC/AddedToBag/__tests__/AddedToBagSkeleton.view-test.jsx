import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagSkeletonVanilla } from '../skeleton/AddedToBagSkeleton.view';

describe('AddedToBagSkelton common component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'className',
    };
    const component = shallow(<AddedToBagSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
