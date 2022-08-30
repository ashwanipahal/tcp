import React from 'react';
import { shallow } from 'enzyme';
import { ModuleOVanilla as ModuleO } from '../ModuleO';

const props = {
  key: 'test',
  loadedProductCount: 4,
  generalProductId: 'sfsdsdgsfgds',
  item: {
    productInfo: {},
    miscInfo: {},
    colorsMap: [
      {
        color: { name: '' },
        colorProductId: '',
        miscInfo: {},
      },
    ],
    imagesByColor: {},
    sqnNmbr: 123,
  },
  isPLPredesign: false,
  productsBlock: {},
  onPickUpOpenClick: () => {},
  className: 'test',
  labels: {},
  sequenceNumber: 12312,
};

describe('Module O component', () => {
  let ModuleOComp;

  beforeEach(() => {
    ModuleOComp = shallow(<ModuleO {...props} />);
  });
  it('renders correctly', () => {
    expect(ModuleOComp).toMatchSnapshot();
  });
});
