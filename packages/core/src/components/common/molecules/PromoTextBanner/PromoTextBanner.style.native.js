import styled from 'styled-components/native';

import BodyCopy from '../../atoms/BodyCopy';

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}` : '')}
`;

export { StyledBodyCopy as BodyCopy };

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const ContainerView = styled.View``;

export default {
  StyledBodyCopy: BodyCopy,
  Container,
  ContainerView,
};
