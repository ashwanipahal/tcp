import React from 'react';
import { shallow } from 'enzyme';
import ExistingPLCCUserView from '../ExistingPLCCUser.view.native';

describe('ApplicationInProgress component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      bagItems: true,
      toggleModal: jest.fn(),
    };
    const component = shallow(<ExistingPLCCUserView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly while having no bag items', () => {
    const props = {
      labels: {},
      bagItems: false,
      toggleModal: jest.fn(),
    };
    const component = shallow(<ExistingPLCCUserView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
