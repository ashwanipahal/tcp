import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
  height: 45px;
  flex: 1;
  background: white;
  align-items: center;
`;
export const LeftView = styled.View`
  background: ${props => props.height || 'green'};
  height: ${props => props.height || '45px'};
  width: ${props => props.width || '48px'};
`;

export const CenterView = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const PromoImage = styled.Image`
  height: ${props => props.height || '35px'};
  width: ${props => props.width || '38px'};
  align-items: center;
`;

export const ViewBackground = styled.View`
  height: 40px;
  width: 40px;
  background: black;
`;

export default {
  Wrapper,
  LeftView,
  PromoImage,
  ViewBackground,
  CenterView,
};
