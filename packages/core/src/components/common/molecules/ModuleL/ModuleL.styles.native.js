import styled from 'styled-components/native';

export const Container = styled.View``;

export const BodyCopyContainer = styled.View`
  width: ${props => props.width};
`;

export const ChildContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const MessageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: flex-start;
`;

export const LinkContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  Container,
  BodyCopyContainer,
  ChildContainer,
  MessageContainer,
  LinkContainer,
  ListContainer,
};
