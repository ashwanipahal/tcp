import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  &.product-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 10px;
    margin: 0 0 6px 0;
    width: calc(50% - ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS});

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
      padding: 12px ${props => props.theme.spacing.LAYOUT_SPACING.SM};
      width: calc(33.33% - ${props => props.theme.spacing.LAYOUT_SPACING.LRG});
    }
    @media only screen and (min-width: 1350px) {
      margin: 0 0 19px 0;
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 21px;
      width: calc(25% - 42px);
    }
  }
  &.item-title {
    width: 100%;
    height: 22px;
    font-family: Nunito;
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-stretch: normal;
    font-style: normal;
    line-height: ${props => props.theme.fonts.lineHeight.normal};
    letter-spacing: ${props => props.theme.typography.letterSpacings.normal};
    color: ${props => props.theme.colorPalette.black};
  }

  .horizontal-bar {
    width: 100%;
    border-bottom-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    border-bottom-width: 1px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.L};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.L};
      border-bottom-width: 1px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      margin-left: 0px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      border-bottom-width: 1px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      margin-left: 0px;
    }
  }
`;
