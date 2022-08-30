import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceAppSubscribeModalVanilla } from '../MyPreferenceAppSubscribeModal.view';

describe('MyPreference Subscribe component', () => {
  const props = {
    className: 'test',
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    labels: {},
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceAppSubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
