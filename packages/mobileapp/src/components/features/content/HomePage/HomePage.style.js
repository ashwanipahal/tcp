import styled from 'styled-components/native';

export const HeaderPromoContainer = styled.View`
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default {
  HeaderPromoContainer,
};
