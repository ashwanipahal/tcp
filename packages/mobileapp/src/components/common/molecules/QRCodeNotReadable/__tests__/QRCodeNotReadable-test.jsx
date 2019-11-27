import React from 'react';
import { shallow } from 'enzyme';
import { NotReadableModalVanilla } from '../view/notReadableQRModal.native';

describe('NotReadableModal', () => {
  let component;
  const getParam = () => 'QRScanner navigation';
  const navigation = {
    getParam,
  };

  beforeEach(() => {
    component = shallow(<NotReadableModalVanilla navigation={navigation} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render with open modal', () => {
    component = shallow(<NotReadableModalVanilla navigation={navigation} isOpen />);
    expect(component).toMatchSnapshot();
  });

  it('should render with close modal', () => {
    component = shallow(<NotReadableModalVanilla navigation={navigation} isOpen={false} />);
    expect(component).toMatchSnapshot();
  });
});
