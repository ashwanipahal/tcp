import React from 'react';
import { shallow } from 'enzyme';
import moduleGMockData from '../../../../../services/abstractors/common/moduleG/mock';
import { ModuleGVanilla } from '../view/ModuleG.native';

describe('ModuleGVanilla', () => {
  let ModuleGComponent;

  beforeEach(() => {
    ModuleGComponent = shallow(<ModuleGVanilla {...moduleGMockData.moduleG.composites} />);
  });

  it('ModuleG should be defined', () => {
    expect(ModuleGComponent).toBeDefined();
  });

  it('ModuleG should render correctly', () => {
    expect(ModuleGComponent).toMatchSnapshot();
  });
});
