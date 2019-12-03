import React from 'react';
import { shallow } from 'enzyme';
import { QRCodeVanilla } from '../views/QRScanner.native';

describe('QRScanner', () => {
  let component;
  const getParam = () => 'QRScanner navigation';
  beforeEach(() => {
    const navigation = {
      getParam,
    };
    component = shallow(<QRCodeVanilla navigation={navigation} qrLabels />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('it calls the redirectToPLP method', () => {
    const mockQRRead = jest.fn();
    component.instance().redirectToPLP = mockQRRead;
    component.instance().redirectToPLP('mock-category');
    expect(mockQRRead).toHaveBeenCalled();
  });

  it('it calls the redirectToPLP method to open qr not found modal', () => {
    const mockQRRead = jest.fn();
    component.instance().redirectToPLP = mockQRRead;
    component.instance().redirectToPLP();
    expect(mockQRRead).toHaveBeenCalled();
  });

  it('should render with QR invalid modal', () => {
    component.setState({ isQRNotReadable: true });
    expect(component).toMatchSnapshot();
  });

  it('should render without QR invalid modal', () => {
    component.setState({ isQRNotReadable: false });
    expect(component).toMatchSnapshot();
  });

  it('should render with inactive state of QR camera', () => {
    component.setState({ isQRActive: false });
    expect(component).toMatchSnapshot();
  });
});
