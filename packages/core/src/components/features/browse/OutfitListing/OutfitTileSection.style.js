import { css } from 'styled-components';

export default css`
  .outfit-wrapper {
    float: left;
    position: relative;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 49px
        ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
      width: calc(33.3% - 33px);
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 90px ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
      width: calc(33.3% - 60px);
    }
  }
  .outfit-tile-wrapper {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0
      ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    }
  }

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
  .shop-look-label {
    text-align: center;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray[1500]};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .shop-look-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      text-indent: 0px;
      display: none;
      z-index: 1;
    }
    .outfit-wrapper {
      &:hover {
        opacity: 0.3;
      }
    }
  }
`;
