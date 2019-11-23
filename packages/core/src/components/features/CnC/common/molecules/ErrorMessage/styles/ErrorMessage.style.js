import { css } from 'styled-components';

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
    background: transparent url('/static/images/circle-alert-fill.svg') no-repeat 0 0;
    background-size: contain;
    flex-shrink: 0;
    border: none;
    height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    width: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-top: 2px;
  }
`;
