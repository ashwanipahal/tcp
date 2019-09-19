import React from 'react';
import { shallow } from 'enzyme';
import {
  BillingPageContainerVanilla,
  mapDispatchToProps,
} from '../container/BillingPage.container';

describe('BillingPageContainer', () => {
  it('should render correctly', () => {
    const props = {
      cvvCodeInfoContentId: '1234',
      getCVVCodeInfo: jest.fn(),
    };
    const tree = shallow(<BillingPageContainerVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should call mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getCVVCodeInfo();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
