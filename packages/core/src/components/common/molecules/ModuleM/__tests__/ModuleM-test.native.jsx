import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleM/mock';
import ModuleM from '../views/ModuleM.native';

describe('ModuleM component', () => {
  it('ModuleM component renders correctly with props', () => {
    const component = shallow(<ModuleM {...mock.moduleM.composites} />);
    expect(component).toMatchSnapshot();
  });
});
