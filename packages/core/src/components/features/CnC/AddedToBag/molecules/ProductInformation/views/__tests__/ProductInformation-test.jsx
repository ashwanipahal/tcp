import React from 'react';
import { shallow } from 'enzyme';
import ProductInformationView from '../ProductInformation.views';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const props = {
      data: {
        productName: 'Boys Basic Skinny Jeans',
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
        colorLabel: 'Color',
        sizeLabel: 'Size',
        qtyLabel: 'Qty',
      },
    };
    const component = shallow(<ProductInformationView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
