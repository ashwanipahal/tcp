import styled from 'styled-components/native';

export const CarouselContainer = styled.View`
  width: 100%;
  padding-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  display: flex;
  margin-bottom: 32px;
`;

export const AccordionContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ImageStyleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
