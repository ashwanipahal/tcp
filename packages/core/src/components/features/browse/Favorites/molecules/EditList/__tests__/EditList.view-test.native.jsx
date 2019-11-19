import React from 'react';
import { shallow } from 'enzyme';
import { EditListVanilla } from '../views/EditList.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    labels: {},
    onCloseModal: null,
    handleSubmit: () => {},
    margins: null,
    modalMargins: null,
  };

  beforeEach(() => {
    component = shallow(<EditListVanilla {...props} />);
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
