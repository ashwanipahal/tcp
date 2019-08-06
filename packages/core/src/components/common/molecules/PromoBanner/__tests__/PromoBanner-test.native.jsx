import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import PromoBanner from '../views/PromoBanner.native';
import { StyledText } from '../PromoBanner.style.native';

let PromoBannerComp;

beforeEach(() => {
  PromoBannerComp = shallow(
    <PromoBanner promoBanner={mock.moduleK.composites.masonryGrid[0].promoBanner} />
  );
});

describe('PromoBanner native component', () => {
  it('renders correctly', () => {
    expect(PromoBannerComp).toMatchSnapshot();
  });

  it('Module should render text', () => {
    expect(PromoBannerComp.find(StyledText)).toHaveLength(2);
  });
});
