import React from 'react';
import { shallow } from 'enzyme';
import { PromoPDPBannersVanilla } from '../views/PromoPDPBanners.view.native';

describe('PromoPDPBannersVanilla native component', () => {
  let component;
  const props = {
    asPath: '',
    promos: [],
  };
  beforeEach(() => {
    component = shallow(<PromoPDPBannersVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
