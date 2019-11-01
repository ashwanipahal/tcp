import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceAppSubscribeModalVanilla } from '../MyPreferenceAppSubscribeModal.view.native';

describe('MyPreference Subscribe component', () => {
  const props = {
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    labels: {},
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceAppSubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
