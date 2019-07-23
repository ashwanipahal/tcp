import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: ${props => props.theme.colors.PRIMARY.COLOR3};
`;
export const ChildContainer = styled.TouchableOpacity`
  align-items: center;
`;

export const MessageContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 6px;
  height: 10px;
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  Container,
  ChildContainer,
  Image,
  MessageContainer,
};
