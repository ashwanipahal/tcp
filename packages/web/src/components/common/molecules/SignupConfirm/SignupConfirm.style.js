import { css } from 'styled-components';

const SignupConfirmStyle = css`
  margin-top: 187px;
  .confirmation-label {
    margin: 19px auto 0;
    ::after {
      content: '';
      height: 2px;
      width: 100px;
      background: ${props => props.theme.colors.TEXT.DARKERBLUE};
      margin: 9px auto 35px;
      display: block;
    }
  }
  .confirmation-image {
    margin: 0 auto 15px;
    display: flex;
  }
  .first-label {
    margin: 0 60px 5px;
  }
  .redeem-label {
    margin: 0 60px 26px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .first-label {
      margin: 0 78px 12px;
    }
    .redeem-label {
      margin: 0 88px 26px;
    }
    .tnc-label {
      margin: 0 78px 183px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    margin-top: 31px;
    .confirmation-label {
      margin: 2px auto;
      ::after {
        margin: 8px auto 48px;
      }
    }
    .first-label {
      margin: 0 90px 24px;
    }
    .tnc-label {
      margin: 0 148px 100px;
    }
  }
`;

export default SignupConfirmStyle;
