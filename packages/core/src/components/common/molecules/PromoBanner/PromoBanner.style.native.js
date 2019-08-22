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

export const Style8ContainerView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: #ff0000;
`;

export const PromoText = styled.Text`
  width: 55%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default {
  StyledBodyCopy: BodyCopy,
  Container,
  ContainerView,
  Style8ContainerView,
  PromoText,
};
