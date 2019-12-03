import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view';

describe('ReviewPageVanilla component', () => {
  const defaultProps = {
    checkoutRoutingDone: false,
    labels: {},
    reviewDidMount: () => {},
    handleSubmit: () => {},
  };
  const tree = shallow(<ReviewPageVanilla {...defaultProps} />);
  it('should renders correctly props not present', () => {
    const props = {
      labels: {},
      handleSubmit: jest.fn(),
      reviewDidMount: () => {},
      ServerErrors: {},
      checkoutRoutingDone: true,
    };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when not routing done ', () => {
    const props = {
      checkoutRoutingDone: false,
      labels: {},
      reviewDidMount: () => {},
      handleSubmit: () => {},
      orderHasPickUp: true,
    };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when order has shipping ', () => {
    const props = {
      checkoutRoutingDone: false,
      labels: {},
      reviewDidMount: () => {},
      handleSubmit: () => {},
      orderHasShipping: true,
    };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call handleDefaultLinkClick', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    tree.instance().handleDefaultLinkClick(event);
    expect(event.preventDefault).toBeCalled();
  });
});
