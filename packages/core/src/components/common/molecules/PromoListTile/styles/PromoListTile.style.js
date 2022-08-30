import { css } from 'styled-components';

const styles = css`
  .image {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    height: 80px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .tileImage {
    width: 60px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 0;
    }
  }
  .tile-anchor {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .border-padding {
    box-sizing: border-box;
    margin-left: 8px;
    margin-right: 10px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: 8px;
    }
  }
`;

export default styles;
