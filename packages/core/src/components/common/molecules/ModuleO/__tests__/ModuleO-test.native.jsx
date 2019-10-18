import React from 'react';
import { shallow } from 'enzyme';
import ModuleO from '../ModuleO.native';

describe('ModuleO', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ModuleO
        isPlcc={false}
        priceOnly={false}
        onQuickViewOpenClick={() => {}}
        item={{
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
        }}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
