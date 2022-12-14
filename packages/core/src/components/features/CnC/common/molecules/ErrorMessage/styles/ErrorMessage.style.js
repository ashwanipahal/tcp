import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

export default css`
  display: flex;
  flex: 1;
  padding-top: 6px;
  padding-bottom: 13px;
  padding-left: 1px;
  background-color: ${props => (props.noBackground ? 'none' : props.theme.colors.PRIMARY.PALEGRAY)};
  img {
    height: 13px;
    width: 13px;
    padding: 3px 13px 0 6px;
  }
  ${props => (props.customClass ? props.customClass : '')};

  .warning-icon {
    background: transparent url(${getIconPath('circle-alert-fill')}) no-repeat 0 0;
    background-size: contain;
    flex-shrink: 0;
    border: none;
    height: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-top: 2px;
  }

  .place-cash-error {
    color: ${props => props.theme.colors.TEXT.RED};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    .click-here {
      color: ${props => props.theme.colors.TEXT.RED};
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      padding: 0 2px 0 2px;
    }
  }
`;
