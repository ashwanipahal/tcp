import styled from 'styled-components';

export const Container = styled.View`
  display: flex;
`;

export const GiftCardItem = styled.View`
  border: solid 1px ${props => props.theme.colorPalette.gray[1300]};
  background-color: ${props => props.theme.colorPalette.white};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const GiftCardMessage = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
