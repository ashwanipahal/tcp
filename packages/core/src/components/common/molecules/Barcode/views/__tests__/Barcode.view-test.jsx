import React from 'react';
import { shallow } from 'enzyme';
import Barcode from '../Barcode.view';

describe('Barcode component', () => {
  it('should renders correctly', () => {
    const props = { barcodeId: '2323232', renderer: 'img', value: '' };
    const component = shallow(<Barcode {...props} />);
    expect(component).toMatchSnapshot();
  });
});
