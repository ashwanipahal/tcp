import React from 'react';
import { shallow } from 'enzyme';
import { ProductCustomizeForm } from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ProductCustomizeForm/ProductCustomizeForm';

describe('ProductCustomizeForm Component', () => {
  let component;
  const props = {
    handleSubmit: jest.fn(),
    colorFitsSizesMap: [],
    initialValues: {
      color: {
        name: 'ROSE DUST',
      },
      quantity: '1',
      size: '1234475',
      fit: 'regular',
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
  };

  beforeEach(() => {
    component = shallow(<ProductCustomizeForm {...props} {...state} />);
  });

  it('ProductCustomizeForm should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ProductCustomizeForm should render correctly', () => {
    component.find('.button-wrapper').simulate('submit', {
      preventDefault: () => {},
    });
    expect(component).toMatchSnapshot();
  });
});
