import styled from 'styled-components/native';

const CardTileWrapper = styled.View`
  display: flex;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  min-height: ${props => (props.card && props.card.ccType === 'VENMO' ? '173px' : 0)};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardTileContext = styled.View`
  display: flex;
  flex-direction: row;
  align-items: ${props => (props.defaultPayment ? 'flex-start' : 'baseline')};
  justify-content: space-between;
`;

const CardTileHeading = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  flex-basis: 60%;
`;

const CardTileDefaultSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => (props.isVenmo ? props.theme.spacing.ELEM_SPACING.XL : 0)};
  margin-bottom: ${props => (props.isGiftCard ? props.theme.spacing.ELEM_SPACING.XXXL : 0)};
`;

const CardTileImgWrapper = styled.View`
  width: 90px;
  height: 56px;
  margin-bottom: auto;
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const CardTileImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const DefaultBadgeWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[800]};
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  border-top-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-left-radius: ${props => props.theme.spacing.ELEM_SPACING.SM};
  display: flex;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const BadgeContent = styled.Text`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  color: ${props => props.theme.colorPalette.white};
`;

const VenmoCardTileHeading = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardTileExpiry = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CardAddress = styled.View`
  flex-wrap: wrap;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
`;

const CardCtaRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const CardCtaLinks = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const CardCtaLinkMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const RecaptchaContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: 89px;
`;

export {
  CardTileWrapper,
  CardTileHeading,
  CardTileContext,
  BadgeContent,
  VenmoCardTileHeading,
  CardTileExpiry,
  CardTileDefaultSection,
  CardTileImgWrapper,
  CardTileImg,
  DefaultBadgeWrapper,
  CardAddress,
  CardCtaRow,
  CardCtaLinks,
  CardCtaLinkMargin,
  RecaptchaContainer,
};
