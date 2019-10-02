import React from 'react';
import { shallow } from 'enzyme';
import { StyledApplyNowModalVanilla } from '../../molecules/ApplyNowModal/views/ApplyNowModal.view';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    labels: {
      apply_now_double: 'abc',
      apply_now_double_subtext: 'abc',
      apply_now_discount_30: 'abc',
      apply_now_discount_30_subtext: 'abc',
      apply_now_discount_25: 'abc',
      apply_now_discount_25_subtext: 'abc',
      apply_now_discount_20: 'abc',
      apply_now_discount_20_subtext: 'abc',
      apply_now_discount_standard: 'abc',
      apply_now_discount_standard_subtext: 'abc',
    },
    toggleModal: jest.fn(),
    className: 'demo',
    isModalOpen: true,
  };

  const component = shallow(<StyledApplyNowModalVanilla {...props} />);

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
