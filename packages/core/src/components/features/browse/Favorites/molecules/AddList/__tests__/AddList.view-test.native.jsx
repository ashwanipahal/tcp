import React from 'react';
import { shallow } from 'enzyme';
import { AddListVanilla } from '../views/AddList.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    labels: {},
    handleSubmit: () => {},
    margins: null,
    onCloseModal: () => {},
  };

  beforeEach(() => {
    component = shallow(<AddListVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return Field component value two', () => {
    expect(component.find('Field')).toHaveLength(2);
  });

  it('should return Styled(View) component value two', () => {
    expect(component.find('Styled(View)')).toHaveLength(2);
  });

  it('should return Styled(CustomButton) component value two', () => {
    expect(component.find('Styled(CustomButton)')).toHaveLength(2);
  });
});
