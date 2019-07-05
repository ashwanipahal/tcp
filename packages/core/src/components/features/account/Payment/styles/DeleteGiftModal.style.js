import { css } from 'styled-components';

const deleteGiftModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 80px;
  }
  .deleteGiftModal_btnWrapper {
    button.deleteGiftModal_btn {
      display: inline-block;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
      float: right;
    }
    button.deleteGiftModal_deleteCancel {
      float: left;
    }
  }
  .deleteGiftModal_desc {
    margin: 30px 0 60px 0;
    .deleteGiftModal_img {
      width: 15%;
    }
  }
  .deleteGiftModal_addressToDelete {
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
  .deleteGiftModal_deleteConfirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .deleteGiftModal_modalTitle {
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

export default deleteGiftModalStyle;
