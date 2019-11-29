import { css } from 'styled-components';

export const collapsibleStyles = css`
  border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

  .collapsible-header {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    background: none;

    &[aria-expanded='true'] {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }

    &-text {
      font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      line-height: ${props => props.theme.fonts.lineHeight.normal};
      color: ${props => props.theme.colors.TEXT.DARK};
      text-transform: capitalize;
    }
    > div {
      flex: 1;
      text-align: left;
    }
  }

  .collapsible-icon {
    top: 28px;
  }

  .collapsible-content {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    line-height: ${props => props.theme.fonts.lineHeight.normal};
    color: ${props => props.theme.colors.TEXT.DARK};
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
`;

export const tileStyles = css`
  height: 100%;
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.medium} {
    border: none;
  }
  .store-details-header {
    @media ${props => props.theme.mediaQuery.largeOnly} {
      width: 190px;
    }
  }
  .store-name {
    &--details {
      font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
      line-height: ${props => props.theme.fonts.lineHeight.normal};
    }
  }
  .store-type {
    display: none;
  }
  .tile-footer {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default css`
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  .locations-title {
    font-family: ${props => props.theme.fonts.primaryFontFamily};
    color: ${props => props.theme.colors.TEXT.DARK};
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;
