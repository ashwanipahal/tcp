import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceAppUnsubscribeModalVanilla } from '../MyPreferenceAppUnsubscribeModal.view.native';

describe('ProfileInformation component', () => {
  const props = {
    className: 'test',
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    labels: {},
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceAppUnsubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
