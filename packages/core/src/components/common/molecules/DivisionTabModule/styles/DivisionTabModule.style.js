import { css } from 'styled-components';

const DivisionTabStyles = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  .heading {
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .heading:before,
  .heading:after {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: '\a0';
    background-color: ${props => props.theme.colorPalette.gray[600]};
  }
  .heading:after {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .heading:before {
    margin-left: calc(-50% - ${props => props.theme.spacing.ELEM_SPACING.SM});
  }
  .button-tabs {
    flex-wrap: wrap;
  }
`;

export default DivisionTabStyles;
