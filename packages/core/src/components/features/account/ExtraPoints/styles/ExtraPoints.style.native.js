import styled from 'styled-components/native';

const TilesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InnerTileWrapper = styled.View`
  width: 48%;
  margin-bottom: ${props => (props.isPromoList ? '' : props.theme.spacing.ELEM_SPACING.LRG)};
`;

const MorePointsWrapper = styled.View`
  width: 70%;
  text-align: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-left: auto;
  margin-right: auto;
`;

const MessageInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const FirstInnerTileWrapper = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const MprTermsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const ExtraEarningHeader = styled.View`
  margin-top: 32px;
  border: 2px solid ${props => props.theme.colorPalette.orange[800]};
`;
const AnchorWrapper = styled.View`
  margin-bottom: 32px;
  margin-top: 16px;
`;
const PromoTileWrapper = styled.View`
  width: 48%;
`;

export {
  TilesWrapper,
  InnerTileWrapper,
  FirstInnerTileWrapper,
  MprTermsWrapper,
  MessageInfoWrapper,
  MorePointsWrapper,
  ExtraEarningHeader,
  AnchorWrapper,
  PromoTileWrapper,
};
