import { shallow } from 'enzyme';
import React from 'react';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { DeleteAddressModalVanilla } from '../DeleteAddressModal.view';
import Address from '../../../../../common/molecules/Address';
import Button from '../../../../../common/atoms/Button';

describe('Delete Address Modal', () => {
  let address;
  let labels;
  let onDeleteAddress;
  let setDeleteModalMountState;
  let deleteModalMountedState = true;
  beforeEach(() => {
    address = {
      firstName: 'test',
      lastName: 'test',
      addressLine: ['addressline 1', 'addressline 2'],
    };
    labels = {
      addressBook: {
        ACC_LBL_DELETE_ADDRESS_HEADING: '',
        ACC_LBL_DELETE_ADDRESS_TITLE: '',
        lbl_deleteAddressModal_ccAssociatedAddressMsg: '',
      },
      common: {
        lbl_common_YesDelete: '',
        lbl_common_dontDelete: '',
      },
    };
    onDeleteAddress = jest.fn();
    setDeleteModalMountState = jest.fn();
    deleteModalMountedState = true;
  });
  it('should render correctly', () => {
    const tree = shallow(
      <DeleteAddressModalVanilla
        address={address}
        labels={labels}
        isOpen={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        onDeleteAddress={onDeleteAddress}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Address)).toHaveLength(1);
    expect(tree.find(Button)).toHaveLength(2);
  });
  it('should call Cancel Button Correctly', () => {
    const tree = shallow(
      <DeleteAddressModalVanilla
        address={address}
        labels={labels}
        isOpen={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        onDeleteAddress={onDeleteAddress}
      />
    );
    tree.instance().onClose();
    expect(setDeleteModalMountState).toHaveBeenCalled();
  });
  it('should call confirm Button Correctly', () => {
    const tree = shallow(
      <DeleteAddressModalVanilla
        address={address}
        labels={labels}
        isOpen={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        onDeleteAddress={onDeleteAddress}
      />
    );
    tree.instance().onConfirm();
    expect(onDeleteAddress).toHaveBeenCalled();
  });
  it('should show message if address is associated with CC', () => {
    address.xcont_isBillingAddress = 'true';
    const tree = shallow(
      <DeleteAddressModalVanilla
        address={address}
        labels={labels}
        isOpen={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        onDeleteAddress={onDeleteAddress}
      />
    );
    expect(tree.find(BodyCopyWithSpacing)).toHaveLength(2);
  });
  it('should show message if address is associated with CC', () => {
    address.xcont_isBillingAddress = 'false';
    const tree = shallow(
      <DeleteAddressModalVanilla
        address={address}
        labels={labels}
        isOpen={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        onDeleteAddress={onDeleteAddress}
      />
    );
    expect(tree.find(BodyCopyWithSpacing)).toHaveLength(1);
  });
});
