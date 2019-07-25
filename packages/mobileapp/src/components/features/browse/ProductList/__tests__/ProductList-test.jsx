import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../ProductList';

describe('Anchor Native', () => {
  let component;
  const getParam = () => 'test component';
  beforeEach(() => {
    const navigation = {
      getParam,
    };
    component = shallow(<ProductList navigation={navigation} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Text')).toHaveLength(1);
  });
});
