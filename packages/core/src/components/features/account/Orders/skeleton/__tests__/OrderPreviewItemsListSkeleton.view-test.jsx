import React from 'react';
import { shallow } from 'enzyme';
import OrderPreviewItemsListSkeleton from '../OrderPreviewItemsListSkeleton.view';

describe('OrderPreviewItemsListSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<OrderPreviewItemsListSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
