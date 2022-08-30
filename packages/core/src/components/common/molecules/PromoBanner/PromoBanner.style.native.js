import styled from 'styled-components/native';

import BodyCopy from '../../atoms/BodyCopy';

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}` : '')}
  text-align: center;
`;

export { StyledBodyCopy as BodyCopy };

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const ContainerView = styled.View``;

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
  Container,
  ContainerView,
  FlexDirectionDefaultView,
  TopAlignedView,
};
