import { css } from 'styled-components';

export default css`
  width: 100%;
  padding: 20px 0px;
  margin-bottom: 0px;

  .custom-select-common {
    display: inline-block;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
    padding-bottom: 10px;
  }
  .color-chip {
    border-radius: 10px;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .size-title,
  .color-name {
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 124px;
    text-align: left;
    display: inline-block;
  }
  .color-name {
    vertical-align: top;
    width: 93px;
  }
`;
