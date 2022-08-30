import React from 'react';
import { shallow } from 'enzyme';

import PlaceCashDetailsModal from '../PlaceCashDetails.modal.view';

describe('PlaceCashBannerModal should render correctly', () => {
  let component;
  const props = {
    labels: {
      SHOW_DETAILS_RICH_TEXT: '<h2>test data</h2>',
    },
    heading: 'title modal',
    onRequestClose: jest.fn(),
    openState: true,
    additionalClassNameModal: '',
  };

  beforeEach(() => {
    component = shallow(<PlaceCashDetailsModal {...props} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
