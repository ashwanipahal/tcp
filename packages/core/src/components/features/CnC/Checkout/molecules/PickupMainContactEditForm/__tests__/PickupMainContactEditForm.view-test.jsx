import React from 'react';
import { shallow } from 'enzyme';
import { PickupMainContactEditFormVanilla } from '../views/PickupMainContactEditForm.view';
import Anchor from '../../../../../../common/atoms/Anchor';

describe('PickupMainContactEditFormVanilla component', () => {
  it('should renders correctly when data not present', () => {
    const props = {
      dispatch: jest.fn(),
      labels: {},
      handleSubmit: jest.fn(),
      isMobile: false,
      isEditing: false,
      className: '',
      showPhoneNumber: false,
      formData: {},
      onEditModeChange: jest.fn(),
      handleExitEditModeClick: jest.fn(),
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    component.instance().renderSectionTitle();
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data are present', () => {
    const props = {
      dispatch: jest.fn(),
      labels: {},
      handleSubmit: jest.fn(),
      isMobile: true,
      isEditing: true,
      className: '',
      showPhoneNumber: false,
      formData: {},
      onEditModeChange: jest.fn(),
      handleExitEditModeClick: jest.fn(),
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    component.instance().renderSectionTitle();
    expect(component).toMatchSnapshot();
  });

  it('should renders on click', () => {
    const props = {
      dispatch: jest.fn(),
      labels: {},
      handleSubmit: jest.fn(),
      isMobile: true,
      isEditing: false,
      className: '',
      showPhoneNumber: false,
      formData: {},
      onEditModeChange: jest.fn(),
      handleExitEditModeClick: jest.fn(),
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    component.instance().renderSectionTitle();
    component.find(Anchor).simulate('click', { preventDefault: jest.fn() });
    expect(component).toMatchSnapshot();
  });
});
