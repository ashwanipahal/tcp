import React from 'react';
import { shallow } from 'enzyme';
import {
  AccountOverviewTileList,
  COMPONENTS_US,
  COMPONENTS_CA,
} from '../AccountOverviewTileList.view';
import { isCanada } from '../../../../../../../../utils';
import { Col } from '../../../../../../../common/atoms';

jest.mock('../../../../../../../../utils', () => {
  const originalModule = jest.requireActual('../../../../../../../../utils');
  return {
    __esModule: true,
    ...originalModule,
    isCanada: jest.fn(() => false),
  };
});

describe('AccountOverviewTileList component', () => {
  it('should render correctly', () => {
    const component = shallow(<AccountOverviewTileList />);
    expect(component).toMatchSnapshot();
  });

  it('should render components as per the US component list', () => {
    const component = shallow(<AccountOverviewTileList />);
    expect(component.find(Col)).toHaveLength(COMPONENTS_US.length);
  });

  it('should render components as per the CA component list', () => {
    isCanada.mockImplementationOnce(() => true);
    const component = shallow(<AccountOverviewTileList />);
    expect(component.find(Col)).toHaveLength(COMPONENTS_CA.length);
  });
});
