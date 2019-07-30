import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import PromoTextBanner from '../PromoTextBanner.native';

const bodyCopyStyles = {
  style1: () => <div>Style1</div>,
  style2: () => <div>Style2</div>,
  style3: () => <div>Style3</div>,
};

describe('PromoTextBanner native component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <PromoTextBanner
        promoTextBanner={mock.moduleK.composites.masonryGrid[0].promoTextBanner}
        bodyCopyStyles={bodyCopyStyles}
        dataLocator="moduleK_text_"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
