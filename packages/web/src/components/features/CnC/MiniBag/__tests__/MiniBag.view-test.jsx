import React from 'react';
import { shallow } from 'enzyme';
import { MiniBagVanilla } from '../views/MiniBag.view';

describe('MiniBag template', () => {
  it('should render correctly', () => {
    const props = {
      className: '',
      closeMiniBagDispatch: jest.fn(),
      openState: true,
      labels: {},
      router: {},
      userName: '',
      subTotal: '',
      currencySymbol: '',
      currentPoints: '',
      totalRewards: '',
      isCartItemsUpdating: true,
    };
    const tree = shallow(<MiniBagVanilla {...props} />);
    tree.setProps({
      router: {
        asPath: 'Pickup',
      },
    });
    expect(tree).toMatchSnapshot();
    expect(tree.find('Styled(Modal)')).toHaveLength(1);
  });
});
