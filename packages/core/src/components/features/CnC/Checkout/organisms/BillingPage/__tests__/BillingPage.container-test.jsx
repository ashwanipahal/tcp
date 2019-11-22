import React from 'react';
import { shallow } from 'enzyme';
import { BillingPageContainerVanilla } from '../container/BillingPage.container';

describe('BillingPageContainer', () => {
  it('should render correctly', () => {
    const props = {
      cvvCodeInfoContentId: '1234',
      getCVVCodeInfo: jest.fn(),
    };
    const tree = shallow(<BillingPageContainerVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
