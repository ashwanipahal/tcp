import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleL/mock';
import ModuleLHeader from '../views/ModuleL.Header';
import { Heading } from '../../../atoms';

describe('ModuleL Header component', () => {
  let ModuleLHeaderComp;

  beforeEach(() => {
    ModuleLHeaderComp = shallow(<ModuleLHeader {...mock.moduleL.composites} />);
  });

  it('renders correctly', () => {
    expect(ModuleLHeaderComp).toMatchSnapshot();
  });

  it('should render heading component', () => {
    expect(ModuleLHeaderComp.find(Heading)).toHaveLength(1);
  });
});
