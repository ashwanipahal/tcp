import React from 'react';
import { shallow } from 'enzyme';
import ScanErrorModal from '../view/scanErrorModal.native';

describe('ScanErrorModal', () => {
  let component;
  const getParam = () => 'QRScanner navigation';
  const navigation = {
    getParam,
  };

  beforeEach(() => {
    component = shallow(<ScanErrorModal navigation={navigation} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render with open modal', () => {
    component = shallow(<ScanErrorModal navigation={navigation} isOpen />);
    expect(component).toMatchSnapshot();
  });

  it('should render with close modal', () => {
    component = shallow(<ScanErrorModal navigation={navigation} isOpen={false} />);
    expect(component).toMatchSnapshot();
  });
});
