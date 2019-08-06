import styled from 'styled-components/native';

export const Container = styled.View``;

export const ScrollViewContainer = styled.View`
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const TextLiksViewContainer = styled.View`
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const DivImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  align-items: center;
`;

export default { Container, ScrollViewContainer, TextLiksViewContainer, DivImageContainer };
