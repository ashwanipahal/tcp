import styled from 'styled-components/native';

import { BodyCopy } from '../../../../atoms';

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}` : '')}
  text-align: center;
`;

export { StyledBodyCopy as BodyCopy };

export const FlexDirectionDefaultView = styled.View``;

export const TopAlignedView = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export default {
  StyledBodyCopy: BodyCopy,
  FlexDirectionDefaultView,
  TopAlignedView,
};
