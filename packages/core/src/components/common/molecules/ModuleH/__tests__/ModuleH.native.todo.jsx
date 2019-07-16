import React from 'react';
import { shallow } from 'enzyme';
import ModuleH from '../views/ModuleH.native';

describe('ModuleH component', () => {
  let ModuleHComponent;

  beforeEach(() => {
    ModuleHComponent = shallow(<ModuleH />);
  });

  it('renders correctly', () => {
    expect(ModuleHComponent).toMatchSnapshot();
  });
});
