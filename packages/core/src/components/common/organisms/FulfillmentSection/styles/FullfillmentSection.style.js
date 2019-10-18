import { css } from 'styled-components';

const styles = css`
  &.fulfillment-section {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    height: 42px;
    width: 347px;

    @media ${props => props.theme.mediaQuery.medium} {
      height: 42px;
      width: 213px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 100%;
      height: 51px;
    }
  }
`;
export default styles;
