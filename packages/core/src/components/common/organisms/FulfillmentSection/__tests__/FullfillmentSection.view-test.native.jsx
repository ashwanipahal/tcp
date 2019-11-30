import React from 'react';
import { shallow } from 'enzyme';
import FullfillmentSection from '../views/FullfillmentSection.view.native';

describe('FullfillmentSection should render correctly', () => {
  it('should render component with anchor', () => {
    const props = {
      buttonLabel: 'labelsText',
      isAnchor: true,
      currentProduct: '12345',
      onPickUpOpenClick: jest.fn(),
      closeQuickViewClick: false,
    };
    const component = shallow(<FullfillmentSection {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component', () => {
    const props = {
      buttonLabel: 'labelsText',
      isAnchor: false,
      currentProduct: '12345',
      onPickUpOpenClick: jest.fn(),
      closeQuickViewClick: false,
    };
    const component = shallow(<FullfillmentSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
