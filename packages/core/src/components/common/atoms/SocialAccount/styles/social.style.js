import { css } from 'styled-components';

// need to handle for direction props.

const socialStyle = css`
  .social-accounts__infoList {
    display: flex;
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

  .social-accounts__infoText {
    display: flex;
  }
`;

export default socialStyle;
