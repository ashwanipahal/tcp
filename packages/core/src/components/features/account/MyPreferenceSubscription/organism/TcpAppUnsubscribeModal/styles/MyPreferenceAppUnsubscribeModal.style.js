import { css } from 'styled-components';

export default css`
  .myPreferenceModalWrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 55px;
    }
  }

  .disclaimer-sub-text {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
`;
