import { css } from 'styled-components';

const SmsSignupModalStyle = css`
  padding-top: 109px;
  .offer-type__label {
    padding-top: 4px;
    ::after {
      content: '';
      height: 2px;
      width: 100px;
      background: ${props => props.theme.colors.TEXT.DARKERBLUE};
      margin: 19px auto 48px;
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
  .dollar-text {
    vertical-align: top;
    line-height: 66px;
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
