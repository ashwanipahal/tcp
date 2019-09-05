import React from 'react';
import { shallow } from 'enzyme';
import { StyledApplyNowModalVanilla } from '../ApplyNowModal.view';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    labels: {
      plcc_form_contact_info_header: 'contact information',
    },
    toggleModal: jest.fn(),
    className: 'demo',
    isModalOpen: true,
  };

  it('should renders correctly', () => {
    const component = shallow(<StyledApplyNowModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call renderBenefitsList', async () => {
    const component = shallow(<StyledApplyNowModalVanilla {...props} />);
    component.instance().renderBenefitsList(props.labels);
  });
});
