import React from 'react';
import { shallow } from 'enzyme';
import GiftServicesDetailsModal from '../GiftServicesDetailsModal.view';

describe('GiftServices component', () => {
  it('renders correctly', () => {
    const props = {
      isOpen: true,
      labels: {
        DETAILS_RICH_TEXT: 'DETAILS_RICH_TEXT',
      },
    };
    const component = shallow(<GiftServicesDetailsModal {...props} />);
    expect(component).toMatchSnapshot();
  });
});
