import React from 'react';
import { shallow } from 'enzyme';
import moduleTMockData from '../../../../../services/abstractors/common/moduleT/mock';
import { ModuleTVanilla } from '../views/ModuleT.native';

describe('ModuleTVanilla', () => {
  let ModuleTComponent;

  beforeEach(() => {
    ModuleTComponent = shallow(<ModuleTVanilla {...moduleTMockData.moduleT.composites} />);
  });

  it('ModuleT should be defined', () => {
    expect(ModuleTComponent).toBeDefined();
  });

  it('ModuleT should render correctly', () => {
    expect(ModuleTComponent).toMatchSnapshot();
  });
});
