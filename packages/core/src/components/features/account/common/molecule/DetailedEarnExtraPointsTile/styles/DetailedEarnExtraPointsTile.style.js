import { css } from 'styled-components';

const styles = css`
  .tileWrapper {
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    background: ${props => props.theme.colors.WHITE};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
    border-bottom: 2px solid
      ${props =>
        props.theme.isGymboree
          ? props.theme.colorPalette.orange[800]
          : props.theme.colorPalette.blue[500]};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
  }

  .earnPointDesc {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }

  .earnExtraPointsTileImage {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    height: 100px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 60px;
      transform: translate3d(-50%, -50%, 0);
    }
    margin-bottom: 5px;
  }
`;

export default styles;
