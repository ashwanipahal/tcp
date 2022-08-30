import React from 'react';
import { shallow } from 'enzyme';
import { ModalWrapperVanilla } from '../views/ModalWrapper.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    labels: {},
    margins: null,
    modalMargins: null,
    children: null,
    onCloseModal: null,
    noscroll: true,
  };

  beforeEach(() => {
    component = shallow(<ModalWrapperVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return ModalNative component value one', () => {
    expect(component.find('ModalNative')).toHaveLength(1);
  });
});
