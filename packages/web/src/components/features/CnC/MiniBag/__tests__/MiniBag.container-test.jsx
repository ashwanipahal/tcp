import React from 'react';
import { shallow } from 'enzyme';
import { MiniBagContainer } from '../container/MiniBag.container';

describe('MiniBagContainer', () => {
  it('should render correctly', () => {
    const mockedToggleMiniBagModal = jest.fn();
    const e = {
      preventDefault: jest.fn(),
    };
    const tree = shallow(<MiniBagContainer toggleMiniBagModal={mockedToggleMiniBagModal} />);
    expect(tree).toMatchSnapshot();
    tree.instance().closeModal(e);
    expect(mockedToggleMiniBagModal).toBeCalled();
  });
});
