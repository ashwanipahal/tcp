import React from 'react';
import { shallow } from 'enzyme';
import { MiniBagContainer } from '../container/MiniBag.container';

describe('MiniBagContainer', () => {
  it('should render correctly', () => {
    const props = {
      updateCartItemCount: jest.fn(),
      closeMiniBagDispatch: jest.fn(),
    };
    const e = {
      preventDefault: jest.fn(),
    };
    const tree = shallow(<MiniBagContainer {...props} />);
    expect(tree).toMatchSnapshot();
    tree.instance().closeModal(e);
    expect(props.updateCartItemCount).toBeCalled();
  });
});
