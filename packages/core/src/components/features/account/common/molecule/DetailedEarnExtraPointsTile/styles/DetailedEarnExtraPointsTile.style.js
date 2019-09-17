import { css } from 'styled-components';

const styles = css`
  .tileWrapper {
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    background: ${props => props.theme.colors.WHITE};
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
    border-bottom: 2px solid
      ${props =>
        props.theme.isGymboree
          ? props.theme.colorPalette.orange[800]
          : props.theme.colorPalette.blue[500]};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .earnPointDesc {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .earnExtraPointsTileImage {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      height: 60px;
    }
    margin-bottom: 5px;
  }
`;

export default styles;
