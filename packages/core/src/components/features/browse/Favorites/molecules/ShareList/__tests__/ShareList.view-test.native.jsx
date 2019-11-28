import React from 'react';
import { shallow } from 'enzyme';
import { ShareListVanilla } from '../views/ShareList.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    labels: {},
    handleSubmit: () => {},
    margins: null,
    onCloseModal: () => {},
  };

  beforeEach(() => {
    component = shallow(<ShareListVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return Styled(View) component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });

  it('should return Styled(BodyCopy) component value two', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(2);
  });

  it('should return Field component value four', () => {
    expect(component.find('Field')).toHaveLength(4);
  });

  it('should return Styled(CustomButton) component value two', () => {
    expect(component.find('Styled(CustomButton)')).toHaveLength(2);
  });
});
