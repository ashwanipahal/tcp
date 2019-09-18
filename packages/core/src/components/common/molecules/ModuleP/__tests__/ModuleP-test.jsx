import React from 'react';
import { shallow } from 'enzyme';
import { ModulePVanilla as ModuleP } from '../ModuleP';

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

describe('Module P component', () => {
  let ModulePComp;

  beforeEach(() => {
    ModulePComp = shallow(<ModuleP {...props} />);
  });
  it('renders correctly', () => {
    expect(ModulePComp).toMatchSnapshot();
  });
});
