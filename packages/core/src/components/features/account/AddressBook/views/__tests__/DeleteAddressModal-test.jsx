import { shallow } from 'enzyme';
import React from 'react';
import { DeleteAddressModalVanilla } from '../DeleteAddressModal.view';
import Address from '../../../../../common/molecules/Address';
import Button from '../../../../../common/atoms/Button';
import Notification from '../../../../../common/molecules/Notification';

describe('Delete Address Modal', () => {
  const data = {
    heading: 'DELETE ADDRESS',
    title: 'Are you sure you want to delete this address?',
    description: {
      firstName: 'test',
      lastName: 'test',
      addressLine: ['addressline 1', 'addressline 2'],
    },
    buttons: {
      cancel: 'No, Dont Cancel',
      confirm: 'Yes Delete',
    },
  };
  it('should render correctly', () => {
    const tree = shallow(
      <DeleteAddressModalVanilla data={data} labels={{ addressBook: {}, common: {} }} />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Address)).toHaveLength(1);
    expect(tree.find(Button)).toHaveLength(2);
  });
  it('should call Cancel Button Correctly', () => {
    const mockedCloseModal = jest.fn();
    const tree = shallow(
      <DeleteAddressModalVanilla
        data={data}
        setDeleteModalMountState={mockedCloseModal}
        labels={{ addressBook: {}, common: {} }}
      />
    );
    tree
      .find(Button)
      .at(1)
      .simulate('click');
    expect(mockedCloseModal).toHaveBeenCalled();
  });
  it('should call confirm Button Correctly', () => {
    const mockedOnConfirm = jest.fn();
    const tree = shallow(
      <DeleteAddressModalVanilla
        data={data}
        onDeleteAddress={mockedOnConfirm}
        labels={{ addressBook: {}, common: {} }}
      />
    );
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(mockedOnConfirm).toHaveBeenCalled();
  });
  it('should show notification on error', () => {
    const tree = shallow(
      <DeleteAddressModalVanilla
        data={data}
        showUpdatedNotificationOnModal
        labels={{
          addressBook: {},
          common: {
            ACC_LBL_ERROR_MESSAGE: 'Your action could not be completed due to a system error',
          },
        }}
      />
    );
    expect(tree.find(Notification)).toHaveLength(1);
  });
});
