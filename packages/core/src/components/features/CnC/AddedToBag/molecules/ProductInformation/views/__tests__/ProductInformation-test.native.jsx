import React from 'react';
import { shallow } from 'enzyme';
import { ProductInformationVanilla } from '../ProductInformation.views.native';

describe('GiftCardList Component', () => {
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
    const component = shallow(<ProductInformationVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
