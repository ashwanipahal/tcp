import React from 'react';
import { shallow } from 'enzyme';
import BagPage from '../BagPage.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    initialActions: jest.fn(),
  };

  it('should render Added to Bag view section', () => {
    const component = shallow(<BagPage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
