import React from 'react';
import { shallow } from 'enzyme';
import { ToastContainer, mapDispatchToProps } from '../Toast.container.native';

describe('Toast render', () => {
  it('should render correctly', () => {
    const props = {
      errorMessage: 'errormessage',
      errorMessagePosition: 1,
      toastMessageReset: jest.fn(),
    };
    const tree = shallow(<ToastContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action toastMessageReset which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toastMessageReset();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
