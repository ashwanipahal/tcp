import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla } from '../views/ModuleN.native';

describe('ModuleNVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModuleNVanilla {...mock.moduleN.composites.singleCTAButton} />);
  });

  it('ModuleN should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ModuleN should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
