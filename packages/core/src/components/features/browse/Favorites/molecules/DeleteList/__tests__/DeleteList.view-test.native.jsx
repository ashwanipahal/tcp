import React from 'react';
import { shallow } from 'enzyme';
import { DeleteListVanilla } from '../views/DeleteList.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    labels: {},
    margins: null,
    onCloseModal: () => {},
  };

  beforeEach(() => {
    component = shallow(<DeleteListVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return Styled(BodyCopy) component value one', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(1);
  });

  it('should return Styled(CustomButton) component value two', () => {
    expect(component.find('Styled(CustomButton)')).toHaveLength(2);
  });
});
