import styled, { css } from 'styled-components/native';

const PageStyle = css`
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const GiftCardSectionHeading = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs26};
  font-family: ${props => props.theme.typography.fonts.primary};
  color: ${props => props.theme.colors.TEXT.DARK};
`;

const GiftCardBody = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

const GiftCardButtonCal = styled.View`
  width: 50%;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

const HeadsUpMessage = styled.Text`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export {
  PageStyle,
  Container,
  GiftCardSectionHeading,
  GiftCardBody,
  GiftCardButtonCal,
  HeadsUpMessage,
};
