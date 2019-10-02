import styled from 'styled-components/native';

export const RibbonContainer = styled.View`
  position: relative;
  ${props => (props.position === 'right' ? `align-items: flex-end;` : '')};
`;

export const PromoBannerContainer = styled.View`
  position: absolute;
  top: 11px;
  ${props => (props.position === 'right' ? `right: 30px;` : `left: 30px;`)};
`;

export const ImageContainer = styled.View`
  padding: 16px 14px 8px 14px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  display: flex;
  padding-top: 12px;
`;

export const ModuleContainer = styled.View`
  padding: 32px 0;
`;

export const TCPOverlayTextContainer = styled.View`
  position: absolute;
  top: 91;
  right: 14;
  width: 225px;
`;

export const GymboreeOverlayTextContainer = styled.View`
  position: absolute;
  top: 154;
  right: 14;
  width: 225px;
`;
