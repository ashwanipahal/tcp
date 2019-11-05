import React from 'react';
import { shallow } from 'enzyme';
import { AccountNumberContainer } from '../AccountNumber.container.native';

describe('AccountNumberContainer container', () => {
  const props = {
    labels: {},
    commonLabels: {},
    myPlaceNumber: '',
  };

  it('should render AccountNumberContainer component', () => {
    const component = shallow(<AccountNumberContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
