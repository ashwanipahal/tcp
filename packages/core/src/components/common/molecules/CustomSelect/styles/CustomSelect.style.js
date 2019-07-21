import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');

const customSelectStyle = css`
  .customSelectTitle {
    border-bottom: 1px solid #979797;
    margin-top: 10px;
    background: url(${downArrowIcon}) no-repeat right center;
  }
`;

export default customSelectStyle;
