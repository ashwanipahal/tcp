import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceUnsubscribeModalVanilla } from '../MyPreferenceUnsubscribeModal.view';

describe('ProfileInformation component', () => {
  const props = {
    className: 'test',
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    handleSubmitData: jest.fn(),
    labels: {},
    phoneNumber: '2347368468',
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceUnsubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
