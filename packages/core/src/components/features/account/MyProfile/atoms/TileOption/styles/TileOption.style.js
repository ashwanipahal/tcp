import { css } from 'styled-components';

const styles = css`
  .tile-container {
    align-items: center;
    flex: 50%;
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    height: 51px;
    border-radius: 6px;
    text-align: center;
    border: solid 2px ${props => props.theme.colors.BORDER.BLUE};
  }

  .selected {
    background-color: ${props => props.theme.colorPalette.gray['500']};
  }

  .tile-text {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    text-align: center;
    display: inline-block;
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .tile-container {
      height: 42px;
    }
  }
`;

export default styles;
