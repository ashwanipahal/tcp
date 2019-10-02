import React from 'react';
import { shallow } from 'enzyme';
import StoreLocations from '../views/StoreLocations.native';
import labelsMock from '../__mocks__/labels.mock';

describe('StoreLocations component', () => {
  it('StoreLocations component renders correctly without props', () => {
    const component = shallow(<StoreLocations labels={labelsMock.StoreLocator} />);
    expect(component).toMatchSnapshot();
  });
});
