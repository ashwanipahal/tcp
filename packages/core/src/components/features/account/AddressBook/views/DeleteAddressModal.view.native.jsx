import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Address from '@tcp/core/src/components/common/molecules/Address';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  DeleteAddressBody,
  AddressWrapper,
  CustomButtonWrapper,
} from '../styles/DeleteAddress.style.native';
// import Notification from '../../../../common/molecules/Notification';

const colorPallete = createThemeColorPalette();

/**
 * @function DeleteAddressModal The DeleteAddressModal component shows the address to delete.
 * This component includes the adress view, and confirm and cancel buttons
 * @param {data} data object with details to render in modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {className} className css to apply
 */
class DeleteAddressModal extends PureComponent {
  static propTypes = {
    labels: PropTypes.shape({
      addressBook: {
        ACC_LBL_DELETE_ADDRESS_HEADING: PropTypes.string,
        ACC_LBL_DELETE_ADDRESS_TITLE: PropTypes.string,
        lbl_deleteAddressModal_ccAssociatedAddressMsg: PropTypes.string,
      },
      common: {
        lbl_common_YesDelete: PropTypes.string,
        lbl_common_dontDelete: PropTypes.string,
      },
    }),
    isOpen: PropTypes.bool.isRequired,
    setDeleteModalMountState: PropTypes.func.isRequired,
    address: PropTypes.shape({}).isRequired,
    onDeleteAddress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labels: {
      addressBook: {
        ACC_LBL_DELETE_ADDRESS_HEADING: '',
        ACC_LBL_DELETE_ADDRESS_TITLE: '',
        lbl_deleteAddressModal_ccAssociatedAddressMsg: '',
      },
      common: {
        lbl_common_YesDelete: '',
        lbl_common_dontDelete: '',
      },
    },
  };

  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {setDeleteModalMountState} setDeleteModalMountState function to close the modal.
   * @return {[Function]} function called
   */
  onClose = () => {
    const { setDeleteModalMountState } = this.props;
    setDeleteModalMountState({ state: false });
  };

  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {onDeleteAddress} onDeleteAddress function to delete the address.
   * @return {[Function]} function called
   */
  onConfirm = () => {
    const {
      address: { nickName },
      onDeleteAddress,
    } = this.props;
    onDeleteAddress({ nickName });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { isOpen, labels, address } = this.props;
    return (
      isOpen && (
        <ModalNative
          isOpen={isOpen}
          onRequestClose={this.onClose}
          heading={getLabelValue(labels, 'ACC_LBL_DELETE_ADDRESS_HEADING', 'addressBook')}
        >
          <DeleteAddressBody>
            <BodyCopyWithSpacing
              fontSize="fs22"
              textAlign="center"
              fontWeight="semibold"
              fontFamily="secondary"
              text={getLabelValue(labels, 'ACC_LBL_DELETE_ADDRESS_TITLE', 'addressBook')}
            />
            {address.xcont_isBillingAddress === 'true' && (
              <BodyCopyWithSpacing
                fontSize="fs12"
                textAlign="center"
                fontWeight="semibold"
                fontFamily="secondary"
                color="red.500"
                spacingStyles="margin-left-XL margin-right-XL margin-top-XS margin-bottom-XS"
                text={getLabelValue(
                  labels,
                  'lbl_deleteAddressModal_ccAssociatedAddressMsg',
                  'addressBook'
                )}
              />
            )}
            <AddressWrapper>
              <Address address={address} fontWeight="bold" showName />
            </AddressWrapper>
            <CustomButtonWrapper>
              <Button
                fill="BLUE"
                type="submit"
                color="white"
                onPress={this.onConfirm}
                buttonVariation="variable-width"
                text={getLabelValue(labels, 'lbl_common_YesDelete', 'common')}
              />
            </CustomButtonWrapper>
            <CustomButtonWrapper>
              <Button
                fill="RED"
                color={colorPallete.red[300]}
                onPress={this.onClose}
                buttonVariation="variable-width"
                text={getLabelValue(labels, 'lbl_common_dontDelete', 'common')}
              />
            </CustomButtonWrapper>
          </DeleteAddressBody>
        </ModalNative>
      )
    );
  }
}

export default DeleteAddressModal;
export { DeleteAddressModal as DeleteAddressModalVanilla };
