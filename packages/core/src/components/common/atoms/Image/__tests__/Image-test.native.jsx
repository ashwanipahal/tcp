import React from 'react';
import { shallow } from 'enzyme';
import { ImageCompVanilla } from '../views/Image.native';

describe('ImageCompVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ImageCompVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Styled(ImageComp)')).toHaveLength(0);
  });

  it('should pass source value', () => {
    component.setProps({ source: 'foo' });
    expect(component).toMatchSnapshot();
  });

  it('should render lazy load image component', () => {
    component.setProps({ host: 'lazyload-home' });
    expect(component.props().host).toEqual('lazyload-home');
  });
});
