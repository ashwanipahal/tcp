import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformationContainer } from '../AddEditPersonalInformation.container';
import AddEditPersonalInformationForm from '../../views';

describe('AddEditPersonalInformationForm container', () => {
  let messageSateChangeActionSpy;
  let updateProfileActionSpy;
  let component;
  beforeEach(() => {
    messageSateChangeActionSpy = jest.fn();
    updateProfileActionSpy = jest.fn();
    const props = {
      successMessage: '',
      errorMessage: '',
      messageSateChangeAction: messageSateChangeActionSpy,
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
      lastName: 'test',
      associateId: '25347',
    });
    expect(updateProfileActionSpy).toBeCalledWith({
      firstName: 'test',
      lastName: 'test',
      associateId: '25347',
    });
  });

  it('backHandler should call messageSateChangeAction', () => {
    expect(messageSateChangeActionSpy.mock.calls.length).toBe(0);
    component.unmount();
    expect(messageSateChangeActionSpy.mock.calls.length).toBe(1);
  });
});
