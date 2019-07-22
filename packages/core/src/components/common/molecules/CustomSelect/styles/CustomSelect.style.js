import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');

const customSelectStyle = css`
  .customSelectTitle {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background: url(${downArrowIcon}) no-repeat right center;
  }
`;

export default customSelectStyle;
