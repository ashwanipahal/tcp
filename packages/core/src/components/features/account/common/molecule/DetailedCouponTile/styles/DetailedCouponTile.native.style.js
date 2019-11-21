import styled from 'styled-components/native';

const TileWrapper = styled.View`
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  align-items: center;
  width: 100%;
`;

const AbsoluteElement = styled.View`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const Overlay = styled(AbsoluteElement)`
  height: 100%;
  bottom: 0;
  background-color: ${props => props.theme.colors.REWARDS_OVERLAY};
  z-index: 0;
`;

const OverlayContent = styled(AbsoluteElement)`
  height: 100px;
  top: 180px;
  align-items: center;
  color: ${props => props.theme.colorPalette.white};
  z-index: 9;
`;

const OverlayContentText = styled.View`
  align-items: center;
  width: 100%;
  text-align: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const OverlapElement = styled(AbsoluteElement)`
  height: 100%;
  bottom: 0;
  background-color: ${props => props.theme.colors.REWARDS_OVERLAY};
  z-index: 1;
`;

const Notification = styled(AbsoluteElement)`
  background-color: ${props => props.theme.colorPalette.gray[800]};
  color: ${props => props.theme.colorPalette.white};
`;

const TileContentWrapper = styled.View`
  justify-content: space-between;

  border: 1px solid
    ${props =>
      props.isError ? props.theme.colorPalette.red[500] : props.theme.colorPalette.gray[500]};
  width: 100%;
  min-height: 390px;
`;

const TileContent = styled.View`
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 100%;
`;

const TileTopContent = styled.View`
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  text-align: center;
`;

const TileDesc = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  background-color: ${props => props.theme.colorPalette.white};
`;

const ButtonWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const TitleWrapper = styled.View`
  min-height: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const SpaceWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background-color: ${props => props.theme.colorPalette.white};
`;

const BarWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: 0;
  background-color: ${props => props.theme.colorPalette.white};
`;

export {
  TileWrapper,
  TileContentWrapper,
  Notification,
  TileContent,
  TileTopContent,
  TileDesc,
  ButtonWrapper,
  SpaceWrapper,
  Overlay,
  OverlayContent,
  OverlapElement,
  TitleWrapper,
  OverlayContentText,
  BarWrapper,
};
