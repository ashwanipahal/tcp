import { shallow } from 'enzyme';
import React from 'react';
import AccountModalView from '../views/AccountModal.view';
import { DeleteAddressModalVanilla } from '../views/DeleteAddressModal.view';
import Notification from '../../../../common/molecules/Notification';

describe('Account Modal View', () => {
  const data = {
    heading: 'DELETE ADDRESS',
    title: 'Are you sure you want to delete this address?',
    description: 'hi',
    buttons: {
      cancel: 'No, Dont Cancel',
      confirm: 'Yes Delete',
    },
  };
  const labels = {
    successMessage: 'success',
    errorMessage: 'error',
  };
  it('should render AccountModalView Correctly', () => {
    const tree = shallow(
      <AccountModalView
        openState
        data={data}
        modalType="deleteAddress"
        labels={labels}
        showUpdatedNotificationOnModal={null}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should call close modal function', () => {
    const mockedCloseModal = jest.fn();
    const tree = shallow(
      <AccountModalView
        openState
        data={{
          heading: 'DELETE ADDRESS',
          title: 'Are you sure you want to delete this address?',
          description: 'hi',
          buttons: {
            cancel: 'No, Dont Cancel',
            confirm: 'Yes Delete',
          },
        }}
        modalType="deleteAddress"
        closeModalComponent={mockedCloseModal}
        labels={labels}
        showUpdatedNotificationOnModal={null}
      />
    );
    expect(tree).toMatchSnapshot();
    tree.instance().onCloseModal();
    expect(mockedCloseModal).toHaveBeenCalled();
  });
  it('should not render AccountModal Correctly', () => {
    const tree = shallow(
      <AccountModalView
        openState={false}
        data={{}}
        labels={labels}
        showUpdatedNotificationOnModal={null}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.isEmptyRender()).toBeTruthy();
  });
  it('should render AccountModalView Correctly but delete address should not get mounted', () => {
    const tree = shallow(
      <AccountModalView
        openState
        data={data}
        modalType="random"
        labels={labels}
        showUpdatedNotificationOnModal={null}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(DeleteAddressModalVanilla)).toHaveLength(0);
  });
  it('should render Notification with error', () => {
    const tree = shallow(
      <AccountModalView
        openState
        data={data}
        modalType="random"
        labels={labels}
        showUpdatedNotificationOnModal="error"
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(DeleteAddressModalVanilla)).toHaveLength(0);
    expect(tree.find(Notification)).toHaveLength(1);
  });
});
