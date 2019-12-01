import React from 'react';
import { shallow } from 'enzyme';
import { FulfillmentSectionVanilla } from '../views/FullfillmentSection.view.native';

const props = {
  generalProductId: '897',
  onPickUpOpenClick: jest.fn(),
  closeQuickViewClick: jest.fn(),
  buttonLabel: 'Click',
  isAnchor: false,
};
describe('testing block for FulfillmentSection', () => {
  it('FulfillmentSection should be rendered correclty ', () => {
    const component = shallow(<FulfillmentSectionVanilla {...props} />);
    expect(component).toBeDefined();
  });
  const propsTwo = { ...props, isAnchor: true };
  it('FulfillmentSection should be rendered correclty ', () => {
    const component = shallow(<FulfillmentSectionVanilla {...propsTwo} />);
    expect(component).toMatchSnapshot();
  });
});
