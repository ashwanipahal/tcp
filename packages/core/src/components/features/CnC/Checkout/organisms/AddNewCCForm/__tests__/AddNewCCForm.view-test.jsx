import React from 'react';
import { shallow } from 'enzyme';
import AddNewCCForm from '../views/AddNewCCForm.view';

describe('AddNewCCForm', () => {
  it('should render correctly', () => {
    const props = {
      cvvError: null,
      cardType: null,
      labels: {},
    };
    const tree = shallow(<AddNewCCForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
