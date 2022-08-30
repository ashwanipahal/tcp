import React from 'react';
import { shallow } from 'enzyme';

import { StaticVanilla } from '../views/Static.view';

describe('HelpCenteStaticVanillarViewVanilla', () => {
  let component;
  const getBootstrapData = jest.fn();

  beforeEach(() => {
    const props = {
      slot_1: { className: 'test' },
      slot_2: { className: 'test1' },
      getBootstrapData,
      appType: 'tcp',
      navigation: {
        getParam: () => false,
      },
      loadNavigationData: () => {},
    };
    component = shallow(<StaticVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(StaticVanilla).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
