import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagActions from '../views/AddedToBagActions.view.native';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
      },
      modalInfo: {
        showModal: true,
      },
    };
    const component = shallow(<AddedToBagActions {...props} />);
    expect(component).toMatchSnapshot();
  });
});
