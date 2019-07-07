import { css } from 'styled-components';

const deleteCardModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 80px;
  }
  .deleteCardModal_cardInfo {
    float: left;
    width: 80%;
    padding-left: 20px;
  }
  .deleteCardModal_expiry {
    float: right;
  }
  .deleteCardModal_btnWrapper {
    padding-top: 80px;
    clear: both;
    button.deleteCardModal_btn {
      display: inline-block;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
      float: right;
      width: 40%;
    }
    button.deleteCardModal_deleteCancel {
      float: left;
    }
  }
  .deleteCardModal_desc {
    .deleteCardModal_img {
      width: 15%;
      float: left;
    }
  }
  .deleteCardModal_addressToDelete {
    margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL}
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    display: block;
    word-break: break-word;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0;
      margin-right: 0;
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .deleteCardModal_deleteConfirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .deleteCardModal_modalTitle {
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

export default deleteCardModalStyle;
