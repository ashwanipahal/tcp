import styled from 'styled-components/native';

export const Container = styled.View``;

export const ScrollViewContainer = styled.View`
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const TextLinksViewContainer = styled.View`
  padding-left: 16px;
`;

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
`;

export const DivImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  align-items: center;
`;

export const SeperatorView = styled.View`
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const ContainerView = styled.View`
  align-items: center;
  width: 100%;
`;

export default {
  Container,
  ScrollViewContainer,
  TextLinksViewContainer,
  DivImageContainer,
  Wrapper,
  SeperatorView,
  ContainerView,
};
