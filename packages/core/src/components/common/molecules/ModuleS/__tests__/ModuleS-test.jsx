import React from 'react';
import { shallow } from 'enzyme';
import ModuleS from '../view/ModuleS';
import mock from '../../../../../services/abstractors/common/moduleS/mock-v1';

describe('ModuleS Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModuleS {...mock.moduleS.composites} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
