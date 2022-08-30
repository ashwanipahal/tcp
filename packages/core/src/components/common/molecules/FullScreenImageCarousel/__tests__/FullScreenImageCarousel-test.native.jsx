import React from 'react';
import { shallow } from 'enzyme';

import FullScreenImageCarousel from '../FullScreenImageCarousel.view.native';

describe('FullScreenImageCarousel should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FullScreenImageCarousel imageUrls={[{ regularSizeImageUrl: '//' }]} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for ios', () => {
    expect(wrapper.find('ImageViewer').length).toBe(1);
  });

  it('should close modal on toggle', () => {
    wrapper.instance().toggleModal();
    expect(wrapper.instance().state.zoomImage).toBeFalsy();
  });
});
