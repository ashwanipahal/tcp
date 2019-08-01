import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import PromoTextBanner from '../PromoTextBanner.native';

describe('PromoTextBanner native component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <PromoTextBanner
        promoTextBanner={mock.moduleK.composites.masonryGrid[0].promoTextBanner}
        dataLocator="moduleK_text_"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
