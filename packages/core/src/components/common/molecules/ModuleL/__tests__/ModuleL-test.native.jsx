import React from 'react';
import { shallow } from 'enzyme';
import { ModuleLVanilla } from '../views/ModuleL.native';

describe('HeadingVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModuleLVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return Heading component value one', () => {
    expect(component.find('Styled(Heading)')).toHaveLength(1);
  });

  it('should return FlatList component value one', () => {
    expect(component.find('FlatList')).toHaveLength(1);
  });
});
