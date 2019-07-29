import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');

const customSelectStyle = css`
  position: relative;

  .customSelectTitle {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    background: url(${downArrowIcon}) no-repeat right center;
  }
`;

export default customSelectStyle;
