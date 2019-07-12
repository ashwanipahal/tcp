import { css } from 'styled-components';

const SmsSignupModalStyle = css`
  padding: 109px 0 4px;
  .offer-type__label {
    ::after {
      content: '';
      height: 2px;
      width: 100px;
      background: #439ad4;
      margin: 19px auto 60px;
      display: block;
    }
  }
  .off-text {
    font-size: 107px;
    margin-top: -30px;
  }
  .get-text,
  .ten-text {
    font-size: 66px;
  }
  .dollar-text: {
    vertical-align: super;
  }
  @media ${props => props.theme.mediaQuery.large} {
    padding: 32px 0 4px;
    .offer-type__label {
      ::after {
        margin-bottom: 0;
      }
    }
  }
`;
export default SmsSignupModalStyle;
