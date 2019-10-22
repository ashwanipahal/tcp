import { css } from 'styled-components';

export default css`
  .myPreferenceModalWrapper {
    margin: 0 50px;
  }

  .disclaimer-sub-text {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
`;
