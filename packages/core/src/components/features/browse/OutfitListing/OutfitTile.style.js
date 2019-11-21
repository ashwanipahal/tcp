import { css } from 'styled-components';

export default css`
  float: left;
  position: relative;
  @media ${props => props.theme.mediaQuery.medium} {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 49px
      ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    width: calc(33.3% - 33px);
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 90px 0 0;
    width: calc(33.3% - 60px);
  }
  .outfit-tile {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0
      ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 0;
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
      text-indent: -9999px;
      z-index: 1;
    }
    &:hover {
      .outfit-tile {
        opacity: 0.3;
      }
      .shop-look-label {
        text-indent: 0px;
        opacity: 1;
      }
    }
  }
`;
