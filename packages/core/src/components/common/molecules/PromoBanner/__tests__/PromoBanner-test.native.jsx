import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import PromoBanner, { bodyCopyStyles } from '../views/PromoBanner.native';

describe('PromoTextBanner native component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <PromoBanner
        promoBanner={mock.moduleK.composites.masonryGrid[0].promoBanner}
        dataLocator="moduleK_text_"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all style correctly', () => {
    Object.keys(bodyCopyStyles).forEach(key => {
      const wrapper = shallow(bodyCopyStyles[key]());
      expect(wrapper).toMatchSnapshot();
    });
  });
});
