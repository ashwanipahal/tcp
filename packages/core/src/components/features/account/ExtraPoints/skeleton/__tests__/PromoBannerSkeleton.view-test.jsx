import React from 'react';
import { shallow } from 'enzyme';
import PromoBannerSkeleton from '../PromoBannerSkeleton.view';

describe('PromoBannerSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<PromoBannerSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
