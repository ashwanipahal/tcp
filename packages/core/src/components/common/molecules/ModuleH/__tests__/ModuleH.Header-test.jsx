import React from 'react';
import { shallow } from 'enzyme';
import ModuleHHeader from '../views/ModuleH.Header';
import mock from '../../../../../services/abstractors/common/moduleH/mock';

describe('ModuleH Header Component', () => {
  let moduleHHeaderComp;

  beforeEach(() => {
    moduleHHeaderComp = shallow(<ModuleHHeader headerText={mock.moduleH.composites.headerText} />);
  });

  it('renders correctly', () => {
    expect(moduleHHeaderComp).toMatchSnapshot();
  });

  it('renders 2 heading lines correctly', () => {
    expect(moduleHHeaderComp.find('.moduleH__header')).toHaveLength(2);
  });
});
