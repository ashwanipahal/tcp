import React from 'react';
import { shallow } from 'enzyme';
import AccountNumber from '../AccountNumber.view.native';

describe('AccountNumber view', () => {
  const props = {
    labels: {},
    commonLabels: {},
    myPlaceNumber: '',
  };
  it('should render AccountNumber component', () => {
    const component = shallow(<AccountNumber {...props} />);
    component.setState({ toggleArrowDown: false });
    expect(component).toMatchSnapshot();
  });
});
