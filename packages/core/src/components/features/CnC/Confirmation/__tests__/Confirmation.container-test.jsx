import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationContainer } from '../container/Confirmation.container';

describe('ConfirmationContainer', () => {
  it('should render correctly', () => {
    const tree = shallow(<ConfirmationContainer />);
    expect(tree).toMatchSnapshot();
  });
});
