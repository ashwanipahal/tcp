import { css } from 'styled-components';

const DeleteAddressModalStyle = css`
  .deleteAddressModal_btnWrapper {
    width: 210px;
    margin: 0 auto;
    button.deleteAddressModal_btn {
      display: block;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
      width: 100%;
    }
  }
  .deleteAddressModal_deleteAddress {
    margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL}
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    display: block;
  }
  .deleteAddressModal_deleteConfirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default DeleteAddressModalStyle;
