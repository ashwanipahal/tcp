import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformationContainer } from '../AddEditPersonalInformation.container';
import AddEditPersonalInformationForm from '../../views';

describe('AddEditPersonalInformationForm container', () => {
  let messageStateChangeActionSpy;
  let updateProfileActionSpy;
  let component;
  beforeEach(() => {
    messageStateChangeActionSpy = jest.fn();
    updateProfileActionSpy = jest.fn();
    const props = {
      successMessage: '',
      errorMessage: '',
      messageStateChangeAction: messageStateChangeActionSpy,
      updateProfileAction: updateProfileActionSpy,
      labels: {},
    };
    component = shallow(<AddEditPersonalInformationContainer {...props} />);
  });
  it('should render AddEditPersonalInformationForm component', () => {
    expect(component.is(AddEditPersonalInformationForm)).toBeTruthy();
  });

  it('AddEditPersonalInformationForm should call updateProfileAction with correct params', () => {
    component.instance().updateProfileInformation({
      firstName: 'test',
      Email: 'test@gmail.com',
      lastName: 'test',
      phoneNumber: '34274638645',
      associateId: '25347',
      userBirthMonth: '2',
      userBirthYear: '1999',
      airMilesAccountNumber: '4637648',
    });
    expect(updateProfileActionSpy).toBeCalledWith({
      firstName: 'test',
      email: 'test@gmail.com',
      lastName: 'test',
      phone: '34274638645',
      associateId: '25347',
      userBirthday: '2|1999',
      airmiles: '4637648',
    });
  });

  it('backHandler should call messageStateChangeActionAction', () => {
    expect(messageStateChangeActionSpy.mock.calls.length).toBe(0);
    component.unmount();
    expect(messageStateChangeActionSpy.mock.calls.length).toBe(1);
  });
});
