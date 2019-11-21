import React from 'react';
import { shallow } from 'enzyme';
import { FooterTopSignUpFormVanilla } from '../FooterTopSignUpForm';

const themeMock = {
  gridDimensions: {
    gridBreakPointsKeys: ['small', 'medium', 'large'],
  },
};
const submitButtonLocator = 'form_submit_btn';
const fieldName = 'inputField';
const reduxFormValuesMock = { [fieldName]: '' };

const reduxFormHandleSubmitMock = cb => () => {
  cb(reduxFormValuesMock).then(() => {});
};

describe('FooterTopSignUpFormVanilla component', () => {
  it('renders correctly', () => {
    const component = shallow(<FooterTopSignUpFormVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('Should verify onSubmit called in on submit button click', () => {
    const submitFunction = jest.fn();
    const validateForm = jest.fn().mockResolvedValue({ success: true });

    const component = shallow(
      <FooterTopSignUpFormVanilla
        theme={themeMock}
        onFormSubmit={submitFunction}
        validateForm={validateForm}
        handleSubmit={reduxFormHandleSubmitMock}
        dataLocators={{
          submitButton: submitButtonLocator,
          inputField: fieldName,
        }}
      />
    );
    component.find(`.footer_top__signup_form`).simulate('submit');
    component.setProps({ submitSucceeded: true, subscription: { success: true } });

    return Promise.resolve(component).then(() => {
      expect(submitFunction).toHaveBeenCalledTimes(1);
    });
  });

  it('Should verify to open modal after form submission', () => {
    const submitFunction = jest.fn();
    const openModalMock = jest.fn();
    const reduxFormReset = jest.fn();

    const component = shallow(
      <FooterTopSignUpFormVanilla
        fieldName={fieldName}
        theme={themeMock}
        onFormSubmit={submitFunction}
        reset={reduxFormReset}
        handleSubmit={reduxFormHandleSubmitMock}
        openSuccessModal={openModalMock}
        dataLocators={{
          submitButton: submitButtonLocator,
          inputField: fieldName,
        }}
      />
    );

    component.setProps({ submitSucceeded: true, subscription: { success: true } });
    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(reduxFormReset).toHaveBeenCalledTimes(1);
  });
});
