import { css } from 'styled-components';

const styles = css`
  .tile-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 50%;
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    height: 51px;
    border-radius: 6px;
    border: solid 2px ${props => props.theme.colors.BORDER.BLUE};
  }

  .selected {
    background-color: ${props => props.theme.colorPalette.gray['500']};
  }

  .tile-text {
    margin: 0;
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .tile-container {
      height: 42px;
    }
  }
`;

export default styles;
