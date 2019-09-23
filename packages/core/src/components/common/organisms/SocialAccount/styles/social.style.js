import { css } from 'styled-components';

// need to handle for direction props.

const socialStyle = css`
  .social-accounts__infoList {
    display: flex;
    padding: 15px 0;
  }
  .Facebook-icon--enable {
    width: 50px;
    height: 50px;
    background: url('/static/images/facebook@2x.png') no-repeat;
  }
  .Facebook-icon--disable {
    width: 50px;
    height: 50px;
    background: url('/static/images/facebook-fade@2x.png') no-repeat;
  }

  .social-accounts__align {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .social_accounts_cross_plus-icon {
    position: relative;
    z-index: 1000;
    width: 165px;
    right: 160px;
    text-align: right;
    cursor: pointer;
  }
  .social-account-icon {
    position: absolute;
    right: 0;
  }
  .social-accounts-alignment {
    padding: 0 ${props => props.theme.spacing.LAYOUT_SPACING.LRG}
      ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .button-style {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXL} 0 0;
  }
  .points-theme {
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
    color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
  }
`;

export default socialStyle;
