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
  .Instagram-icon--enable {
    width: 50px;
    height: 50px;
    background: url('/static/images/instagram@2x.png') no-repeat;
  }
  .Instagram-icon--disable {
    width: 50px;
    height: 50px;
    background: url('/static/images/instagram-fade@2x.png') no-repeat;
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
`;

export default socialStyle;
