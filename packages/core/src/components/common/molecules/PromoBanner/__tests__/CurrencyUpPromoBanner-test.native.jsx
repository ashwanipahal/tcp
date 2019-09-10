import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

import CurrencyUpPromoBanner from '../views/CurrencyUpPromoBanner';

describe('CurrencyUpPromoBanner native component test cases', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <CurrencyUpPromoBanner promoBanner={mock.composites.largeCompImage[0].promoBanner} />
    );
  });

  it('should render overlay banner style', () => {
    expect(component).toMatchSnapshot();
  });
});
