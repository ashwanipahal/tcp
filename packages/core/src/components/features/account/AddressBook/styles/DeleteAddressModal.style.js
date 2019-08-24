import { css } from 'styled-components';

const DeleteAddressModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 80px;
  }
  .deleteAddressModal_btnWrapper {
    width: 225px;
    margin: 0 auto;
  }
  .deleteAddressModal_btn {
    display: block;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    width: 100%;
  }
  .deleteAddressModal_addressToDelete {
    margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} auto
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG} auto;
    display: block;
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    word-break: break-word;
  }
  .deleteAddressModal_deleteConfirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .deleteAddressModal_modalTitle {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
        ${props => props.theme.spacing.ELEM_SPACING.XL};
      padding: 0;
      text-align: initial;
    }
  }
`;

export default DeleteAddressModalStyle;
