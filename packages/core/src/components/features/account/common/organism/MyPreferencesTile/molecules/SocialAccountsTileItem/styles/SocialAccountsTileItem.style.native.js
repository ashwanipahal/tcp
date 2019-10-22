import styled from 'styled-components/native';

const SocialAccountsTileItemContainer = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
`;

const LeftContainer = {
  flex: 1.5,
  justifyContent: 'flex-start',
};

const RightContainer = {
  flex: 0.5,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export { SocialAccountsTileItemContainer, LeftContainer, RightContainer };
