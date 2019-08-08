import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import PromoTextBanner, { bodyCopyStyles } from '../PromoTextBanner.native';

describe('PromoTextBanner native component', () => {
  it('renders correctly', () => {
    console.log('==========', mock.moduleK.composites.masonryGrid[0].promoTextBanner);
    const wrapper = shallow(
      <PromoTextBanner
        promoTextBanner={mock.moduleK.composites.masonryGrid[0].promoTextBanner}
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
