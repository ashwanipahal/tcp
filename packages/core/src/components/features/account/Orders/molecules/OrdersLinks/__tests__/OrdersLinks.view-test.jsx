import React from 'react';
import { shallow } from 'enzyme';
import { OrdersLinksvanilla } from '../views/OrdersLinks.view';

describe('OrdersLinks component', () => {
  let component;
  const props = {
    labels: {},
    onFilterLink: jest.fn(),
  };
  const mockedEvent = {
    target: {
      closest: jest.fn(),
    },
    preventDefault: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<OrdersLinksvanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('test toggleLink function', () => {
    component.setState({ currentSiteId: 'us' });
    const instance = component.instance();
    instance.toggleLink(mockedEvent);
    expect(component.state('currentSiteId')).toBe('ca');
  });
});
