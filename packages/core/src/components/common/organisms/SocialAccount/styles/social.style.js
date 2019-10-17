import { css } from 'styled-components';

// need to handle for direction props.

const socialStyle = css`
  .social-accounts__infoList {
    display: flex;
    padding: 15px 0;
  }
  .Facebook-icon--enable {
    width: 62px;
    height: 55px;
    background: url('/static/images/facebook@2x.png') no-repeat;
  }
  .Instagram-icon--enable {
    width: 62px;
    height: 55px;
    background: url('/static/images/instagram@2x.png') no-repeat;
  }
  .Instagram-icon--disable {
    width: 62px;
    height: 55px;
    background: url('/static/images/instagram-fade@2x.png') no-repeat;
  }

  .Twitter-icon--enable {
    width: 62px;
    height: 55px;
    background: url('/static/images/twitter@2x.png') no-repeat;
  }
  .Twitter-icon--disable {
    width: 62px;
    height: 55px;
    background: url('/static/images/twitter-fade@2x.png') no-repeat;
  }

  .Facebook-icon--disable {
    width: 62px;
    height: 55px;
    background: url('/static/images/facebook-fade@2x.png') no-repeat;
  }

  .social-accounts__align {
    display: flex;
    align-items: center;
    padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .social_accounts_cross_plus-icon {
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    width: 230px;
    height: 55px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      right: 110px;
    }
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
