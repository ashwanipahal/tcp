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

    const component = shallow(
      <FooterTopSignUpFormVanilla
        theme={themeMock}
        onFormSubmit={submitFunction}
        handleSubmit={reduxFormHandleSubmitMock}
        dataLocators={{
          submitButton: submitButtonLocator,
          inputField: fieldName,
        }}
      />
    );
    component.find(`[data-locator="${submitButtonLocator}"]`).simulate('click');
    expect(submitFunction).toHaveBeenCalledTimes(1);
  });

  it('Should verify onSubmit called in on submit enter keypress event.keyCode', () => {
    const submitFunction = jest.fn();

    const component = shallow(
      <FooterTopSignUpFormVanilla
        fieldName={fieldName}
        theme={themeMock}
        onFormSubmit={submitFunction}
        handleSubmit={reduxFormHandleSubmitMock}
        dataLocators={{
          submitButton: submitButtonLocator,
          inputField: fieldName,
        }}
      />
    );
    component.find(`#${fieldName}`).simulate('keypress', { keyCode: 13, preventDefault: () => {} });
    expect(submitFunction).toHaveBeenCalledTimes(1);
  });

  it('Should verify onSubmit called in on submit enter keypress event.which', () => {
    const submitFunction = jest.fn();

    const component = shallow(
      <FooterTopSignUpFormVanilla
        fieldName={fieldName}
        theme={themeMock}
        onFormSubmit={submitFunction}
        handleSubmit={reduxFormHandleSubmitMock}
        dataLocators={{
          submitButton: submitButtonLocator,
          inputField: fieldName,
        }}
      />
    );
    component.find(`#${fieldName}`).simulate('keypress', { which: 13, preventDefault: () => {} });
    expect(submitFunction).toHaveBeenCalledTimes(1);
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
    component.find(`#${fieldName}`).simulate('keypress', { which: 13, preventDefault: () => {} });
    component.setProps({ subscription: { success: true } });
    expect(openModalMock).toHaveBeenCalledTimes(1);
    return new Promise(resolve => {
      setTimeout(() => {
        expect(reduxFormReset).toHaveBeenCalledTimes(1);
        resolve();
      }, 1000);
    });
  });
});
