import { css } from 'styled-components';

export const collapsibleOverrideStyles = css`
  border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

  .collapsible-header {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    background: none;

    &[aria-expanded='true'] {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }

    &-text {
      font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      line-height: ${props => props.theme.fonts.lineHeight.normal};
      color: ${props => props.theme.colors.TEXT.DARK};
    }
    > div {
      flex: 1;
      text-align: left;
    }
  }

  .collapsible-icon {
    top: 28px;
  }
`;

export default css`
  .meta {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .data-list-wrapper {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    line-height: ${props => props.theme.fonts.lineHeight.normal};
    color: ${props => props.theme.colors.TEXT.DARK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .data-list {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
  .text-left {
    flex: 1;
    text-align: left;
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    text-transform: capitalize;
  }
  .text-right {
    flex: 1;
    text-align: right;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
