import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceSubscribeModalVanilla } from '../MyPreferenceSubscribeModal.view.native';

describe('MyPreference Subscribe component', () => {
  const props = {
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    labels: {},
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceSubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
