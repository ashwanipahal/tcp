import React from 'react';
import { shallow } from 'enzyme';
import { AccountHeader } from '../AccountHeader.view';

describe('AccountHeader Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<AccountHeader />);
    expect(tree).toMatchSnapshot();
  });
});
