import styled from 'styled-components/native';

export const RibbonContainer = styled.View`
  position: relative;
  ${props => (props.position === 'right' ? `align-items: flex-end;` : '')};
`;

export const PromoTextContainer = styled.View`
  position: absolute;
  top: 11px;
  ${props => (props.position === 'right' ? `right: 30px;` : `left: 30px;`)};
`;
