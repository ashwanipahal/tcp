import { css } from 'styled-components';

export default css`
  .count-section {
    position: relative;
  }

  .items-count-content-number {
    font-weight: ${props => props.theme.typography.fontWeights.black};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .items-count-content {
    position: absolute;
    right: 0;
  }
`;
