import styled from 'styled-components/native';

const GiftBox = styled.View`
  border: solid 1px ${props => props.theme.colors.PRIMARY.GRAY};
  border-style: solid;
`;

const GiftCardRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS} 0;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const GiftCardCal = styled.View`
  flex: 1;
`;

const GiftBoxText = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  text-align: ${props => (props.center ? 'center' : 'left')};
  font-family: ${props => props.theme.typography.fonts.secondary};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  color: ${props => props.theme.colors.TEXT.DARKGRAY};
`;

export { GiftBox, GiftCardRow, GiftCardCal, GiftBoxText };
