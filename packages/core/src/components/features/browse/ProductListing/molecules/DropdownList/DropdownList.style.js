import { css } from 'styled-components';

export default css`
  width: auto;
  position: absolute;
  z-index: 9;
  max-width: none;
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: #fff;
  text-align: center;

  .item-list-wrapper {
    max-height: 380px;
    overflow-y: scroll;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    text-align: left;
  }
  .list-container {
    width: 300px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    position: absolute;
    z-index: 20;
    max-width: none;
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    margin-top: -1px;
    background-color: #fff;
  }
  .item-list-common {
    width: 100%;
    display: inline-block;
    position: static;
    column-count: 3;
  }
  .apply-button {
    width: 210px;
  }
`;
