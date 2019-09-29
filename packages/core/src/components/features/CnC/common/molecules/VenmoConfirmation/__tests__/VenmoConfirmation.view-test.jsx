import React from 'react';
import { shallow } from 'enzyme';
import { VenmoConfirmationVanilla } from '../views/VenmoConfirmation.view';

describe('VenmoConfirmation component', () => {
  const props = {
    className: '',
    labels: {},
  };

  it('renders correctly without props', () => {
    const component = shallow(<VenmoConfirmationVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
