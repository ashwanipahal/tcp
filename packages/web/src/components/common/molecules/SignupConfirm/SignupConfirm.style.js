import { css } from 'styled-components';

const SignupConfirmStyle = css`
  padding: 219px 0 4px;
  .confirmation__label {
    margin: 19px auto 60px;
    ::after {
      content: '';
      height: 2px;
      width: 100px;
      background: #439ad4;
      margin: 19px auto 60px;
      display: block;
    }
  }
`;

export default SignupConfirmStyle;
