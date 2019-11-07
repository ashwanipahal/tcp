import React from 'react';
import { shallow } from 'enzyme';

import { HelpCenterViewVanilla } from '../views/HelpCenter.view';

describe('HelpCenterViewVanilla', () => {
  let component;
  const getBootstrapData = jest.fn();

  beforeEach(() => {
    const props = {
      slot_1: { className: 'test' },
      slot_2: { className: 'test' },
      getBootstrapData,
      appType: 'tcp',
      navigation: {
        getParam: () => false,
      },
      loadNavigationData: () => {},
    };
    component = shallow(<HelpCenterViewVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(HelpCenterViewVanilla).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
