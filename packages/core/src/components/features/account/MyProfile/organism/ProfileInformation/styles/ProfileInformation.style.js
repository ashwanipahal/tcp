import { css } from 'styled-components';

export default css`
  .profileInfoCol {
    display: flex;
    flex-direction: column;
  }

  .profileInformationCol {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .profileInfoSeparator {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }

  .profileInformationAddress {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }

  .hideOnMobile {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }
`;
