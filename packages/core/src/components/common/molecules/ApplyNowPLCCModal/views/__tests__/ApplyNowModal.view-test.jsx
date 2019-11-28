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

  it('should renders correctly', () => {
    props.isRtpsFlow = true;
    const component = shallow(<StyledApplyNowModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with rtps false ', () => {
    props.isRtpsFlow = false;
    const component = shallow(<StyledApplyNowModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly if isPLCCModalOpen is true', () => {
    props.isPLCCModalOpen = true;
    const tree = shallow(<StyledApplyNowModalVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
