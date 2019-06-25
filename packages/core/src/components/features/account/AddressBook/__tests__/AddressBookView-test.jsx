// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import AddressBook from '../views/AddressBook.view';

describe('AddressBook View', () => {
  it('should render AddressBook Correctly', () => {
    const tree = shallow(<AddressBook />);
    expect(tree).toMatchSnapshot();
  });
});
