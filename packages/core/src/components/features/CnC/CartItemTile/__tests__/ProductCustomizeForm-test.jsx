import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProductCustomizeForm } from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ProductCustomizeForm/ProductCustomizeForm';

describe('ProductCustomizeForm Component', () => {
  const props = {
    handleSubmit: jest.fn(),
    formVisiblity: jest.fn(),
    colorFitsSizesMap: fromJS([
      {
        fits: [
          {
            fitName: '',
            sizes: [
              { sizeName: 'XS (4)', skuId: '1234095', variantNo: '3001569019' },
              { sizeName: 'S (5/6)', skuId: '1234096', variantNo: '3001569020' },
              { sizeName: 'M (7/8)', skuId: '1234097', variantNo: '3001569021' },
            ],
            color: {
              name: 'YELLOW PENCIL',
              imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/3001569_32FK.jpg',
            },
            colorProductId: '1234003',
            miscInfo: {
              isBopisEligible: true,
              isBossEligible: true,
              badge1: { matchBadge: false, defaultBadge: '' },
            },
            hasFits: false,
          },
        ],
      },
    ]),
    initialValues: {
      color: {
        name: 'ROSE DUST',
      },
      Qty: '1',
      Size: '1234475',
      Fit: 'regular',
    },
    item: {
      itemInfo: {
        itemid: '3001545564',
      },
      miscInfo: {},
      productInfo: {
        variantNo: '3001569004',
        itemPartNumber: '00193511087773',
      },
    },
    labels: {
      update: '',
      cancel: '',
    },
  };

  const state = {
    selectedColor: {
      name: 'ROSE DUST',
    },
    selectedQuantity: '1',
    selectedSize: '1234475',
    selectedFit: 'regular',
    selectedSkuId: 0,
  };

  it('ProductCustomizeForm should be defined', () => {
    const component = shallow(<ProductCustomizeForm {...props} {...state} />);
    expect(component).toBeDefined();
  });

  it('ProductCustomizeForm should render correctly', () => {
    const component = shallow(<ProductCustomizeForm {...props} {...state} />);
    component.find('.button-wrapper').simulate('submit', {
      preventDefault: () => {},
    });
    expect(component).toMatchSnapshot();
  });
});
