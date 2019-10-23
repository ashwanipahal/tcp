import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferenceSubscribeModalVanilla } from '../MyPreferenceSubscribeModal.view.native';

describe('MyPreference Subscribe component', () => {
  const props = {
    className: 'test',
    onRequestClose: jest.fn(),
    handleSubmit: jest.fn(),
    handleSubmitData: jest.fn(),
    labels: {
      'lbl_prefrence_modal_disclaimer_line-1': 'test1',
      'lbl_prefrence_modal_disclaimer_line-2': 'test2',
      'lbl_prefrence_modal_disclaimer_line-3': 'test3',
      'lbl_prefrence_modal_disclaimer_line-4': 'test4',
    },
  };
  it('should render correctly', () => {
    const component = shallow(<MyPreferenceSubscribeModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
