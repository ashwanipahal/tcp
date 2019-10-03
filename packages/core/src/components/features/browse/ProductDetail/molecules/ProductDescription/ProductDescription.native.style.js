import styled from 'styled-components';

import { BodyCopy } from '../../../../../common/atoms';

import { getIconPath } from '../../../../../../utils/index';

const downArrowIcon = getIconPath('down_arrow_icon');
const upArrowIcon = getIconPath('up_arrow_icon');

export const StyledBodyCopy = styled(BodyCopy)`
  background: url ${props => (props.isAccordionOpen ? `${upArrowIcon}` : `${downArrowIcon}`)}
    no-repeat right 0 bottom 7px;
`;

export default StyledBodyCopy;
