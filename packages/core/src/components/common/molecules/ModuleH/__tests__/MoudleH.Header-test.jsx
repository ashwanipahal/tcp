import React from 'react';
import { shallow } from 'enzyme';
import ModuleHHeader from '../view/ModuleH.Header';
import mock from '../mock';

describe('ModuleH Header Component', () => {
  it('renders correctly', () => {
    const props = {
      headerText: mock.moduleH.composites.headerText,
    };
    const moduleHHeaderComp = shallow(<ModuleHHeader {...props} />);
    expect(moduleHHeaderComp).toMatchSnapshot();
  });

  it('renders 2 heading lines correctly', () => {
    const props = {
      headerText: mock.moduleH.composites.headerText,
    };
    const moduleHHeaderComp = shallow(<ModuleHHeader {...props} />);
    expect(moduleHHeaderComp.find('.moduleH__header')).toHaveLength(2);
  });
});
