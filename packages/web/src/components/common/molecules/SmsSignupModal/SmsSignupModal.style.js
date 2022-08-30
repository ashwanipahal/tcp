import { css } from 'styled-components';

const SignupModalStyle = css`
  .alignRight {
    right: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      right: 16px;
    }
  }
  .alignTop {
    top: 14px;
    z-index: 1;
    @media ${props => props.theme.mediaQuery.medium} {
      top: 16px;
    }
  }
`;

export default SignupModalStyle;
