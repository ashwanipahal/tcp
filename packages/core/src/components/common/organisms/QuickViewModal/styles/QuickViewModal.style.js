import { css } from 'styled-components';

const styles = css``;

export const customHeaderStyle = css`
  .Modal_Heading {
    border-bottom: none;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: flex;
    justify-content: center;
    height: auto;
    padding-bottom: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      justify-content: center;
      height: auto;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .close-modal {
    &.alignTop {
      top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
    &.alignRight {
      right: 0;
    }
  }
`;

export default styles;
