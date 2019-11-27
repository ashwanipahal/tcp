import React from 'react';
import { shallow } from 'enzyme';
import { QRCodeVanilla } from '../views/QRScanner.native';

describe('QRScanner', () => {
  let component;
  const getParam = () => 'QRScanner navigation';
  const qrLabels = {
    lbl_qrscanner_help_one: 'Scan Animated Tees & More',
    lbl_qrscanner_help_two: 'Center QR code inside frame to scan.',
    lbl_qrscanner_not_authorized:
      'Please go to settings and enable camera access to scan the QR code',
    lbl_qrscan_no_result: 'No Results or Unreadable Code',
    lbl_qrscan_no_result_help: 'Scanning code on fabric? Lay flat, smooth wrinkles & rescan.',
    lbl_qrscan_cta_retry: 'RESCAN CODE',
  };

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
