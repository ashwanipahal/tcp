import React from 'react';
import { shallow } from 'enzyme';
import ProductInformationView from '../ProductInformation.views';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const props = {
      data: {
        productName: 'abc',
        skuInfo: {
          color: {
            family: 'RED',
          },
          fit: 'slim',
          size: 'M',
        },
        quantity: '1',
      },
      labels: {
        colorLabel: 'abc',
        sizeLabel: 'def',
        qtyLabel: 'xyz',
      },
    };
    const component = shallow(<ProductInformationView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
