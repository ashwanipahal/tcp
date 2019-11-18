import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view';

describe('ReviewPageVanilla component', () => {
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
    };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
