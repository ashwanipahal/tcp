// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import AddressBook from '../container/AddressBook.container';

describe('AddressBook Container', () => {
  it('should render AddressBook Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<AddressBook mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
