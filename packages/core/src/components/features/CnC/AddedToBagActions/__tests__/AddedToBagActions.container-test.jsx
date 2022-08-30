import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagActionsContainer from '../container/AddedToBagActions.container';

describe('AddedToBagActions container', () => {
  it('should render correctly', () => {
    const component = shallow(<AddedToBagActionsContainer />);
    expect(component).toMatchSnapshot();
  });
});
