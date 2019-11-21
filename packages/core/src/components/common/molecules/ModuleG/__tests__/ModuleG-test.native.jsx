import React from 'react';
import { shallow } from 'enzyme';
import moduleGMockData from '../../../../../services/abstractors/common/moduleG/mock';
import ModuleG from '../container/ModuleG.container';

describe('ModuleGVanilla', () => {
  let ModuleGComponent;

  beforeEach(() => {
    ModuleGComponent = shallow(<ModuleG {...moduleGMockData.moduleG.composites} />);
  });

  it('ModuleG should be defined', () => {
    expect(ModuleGComponent).toBeDefined();
  });

  it('ModuleG should render correctly', () => {
    expect(ModuleGComponent).toMatchSnapshot();
  });
});
