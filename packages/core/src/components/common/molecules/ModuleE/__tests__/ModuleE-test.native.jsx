import React from 'react';
import { shallow } from 'enzyme';
import moduleEMockData from '../../../../../services/abstractors/common/moduleE/mock-v1';
import moduleEMockDataV2 from '../../../../../services/abstractors/common/moduleE/mock-v2';
import moduleEMockDataV1alt from '../../../../../services/abstractors/common/moduleE/mock-v1-alt';
import { ModuleEVanilla } from '../views/ModuleE.native';

describe('ModuleEVanilla', () => {
  let ModuleEComponent;

  beforeEach(() => {
    ModuleEComponent = shallow(<ModuleEVanilla {...moduleEMockData.moduleE.composites} />);
  });

  it('ModuleE V1 should be defined', () => {
    expect(ModuleEComponent).toBeDefined();
  });

  it('ModuleE V1 should render correctly', () => {
    expect(ModuleEComponent).toMatchSnapshot();
  });

  beforeEach(() => {
    ModuleEComponent = shallow(<ModuleEVanilla {...moduleEMockDataV2.moduleE.composites} />);
  });

  it('ModuleE V2 should be defined', () => {
    expect(ModuleEComponent).toBeDefined();
  });

  it('ModuleE V2 should render correctly', () => {
    expect(ModuleEComponent).toMatchSnapshot();
  });

  beforeEach(() => {
    ModuleEComponent = shallow(<ModuleEVanilla {...moduleEMockDataV1alt.moduleE.composites} />);
  });

  it('ModuleE V1 alt should be defined', () => {
    expect(ModuleEComponent).toBeDefined();
  });

  it('ModuleE V1 alt should render correctly', () => {
    expect(ModuleEComponent).toMatchSnapshot();
  });
});
