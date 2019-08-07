import React from 'react';
import { shallow } from 'enzyme';
import { BagPageContainer, mapDispatchToProps } from '../container/BagPage.container';
import BagPage from '../views/BagPage.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    initialActions: jest.fn(),
  };
  it('should render Added to Bag view section', () => {
    const tree = shallow(<BagPageContainer {...props} />);
    expect(tree.is(BagPage)).toBeTruthy();
  });

  it('should render Added to Bag view section', () => {
    const component = shallow(<BagPageContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action closeModal which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initialActions();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
