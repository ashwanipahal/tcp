import { css } from 'styled-components';

export default css`
  .myPreferenceModalWrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 50px;
    }
  }

  .disclaimer-sub-text {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
`;
