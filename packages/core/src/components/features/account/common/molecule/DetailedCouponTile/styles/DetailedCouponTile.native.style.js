import styled from 'styled-components/native';

const TileWrapper = styled.View`
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XL}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  align-items: center;
`;

const Notification = styled.Text`
  background-color: ${props => props.theme.colorPalette.gray[800]};
  color: ${props => props.theme.colorPalette.white};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const TileContentWrapper = styled.View`
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
`;

const TileContent = styled.View`
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const TileTopContent = styled.View`
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  text-align: center;
`;

const TileDesc = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ButtonWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const SpaceWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
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
};
