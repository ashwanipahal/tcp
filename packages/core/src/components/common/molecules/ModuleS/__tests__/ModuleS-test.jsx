import React from 'react';
import { shallow } from 'enzyme';
import ModuleS from '../view/ModuleS';
import { mockV1 } from '../../../../../services/abstractors/common/moduleS/mock';

describe('ModuleS Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModuleS {...mockV1.moduleS.composites} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
