import React from 'react';
import { shallow } from 'enzyme';
import { ItemAvailability } from '../views/ItemAvailability.view';

describe.only('ItemAvailability Component', () => {
  let component;
  const props = {
    error: 'This is test error.',
    chooseDiff: 'Choose different product',
  };

  beforeEach(() => {
    component = shallow(<ItemAvailability {...props} />);
  });

  it('ItemAvailability should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ItemAvailability should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
