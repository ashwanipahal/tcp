import styled from 'styled-components/native';

const SocialAccountsTileItemContainer = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
`;

const LeftContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ImageWrapper = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { SocialAccountsTileItemContainer, LeftContainer, RightContainer, ImageWrapper };
