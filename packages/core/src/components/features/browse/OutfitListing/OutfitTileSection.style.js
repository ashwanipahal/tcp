import { css } from 'styled-components';
import outFitTileCss from './OutfitTile.style';

export default css`
  .outfit-title {
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray[1500]};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
      margin-bottom: 48px;
    }
  }
  .outfit-section-wrapper {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
`;

export const outFitSkeletonCss = css`
  .skeleton-col {
    ${outFitTileCss};
    margin-top: 10px;
    height: 350px;
    background: ${props => props.theme.colorPalette.gray[500]};
    @media ${props => props.theme.mediaQuery.medium} {
      height: 211px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: 330px;
      margin-top: 30px;
    }
  }
`;
