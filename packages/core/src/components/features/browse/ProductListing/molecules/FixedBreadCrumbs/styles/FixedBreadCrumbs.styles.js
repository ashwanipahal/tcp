import { css } from 'styled-components';

export default css`
  .breadcrum-item {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
  .breadcrum-last-item {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
  .breadcrum-separation {
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;
