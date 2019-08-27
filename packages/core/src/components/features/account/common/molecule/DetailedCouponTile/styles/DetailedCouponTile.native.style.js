import styled from 'styled-components/native';

const TileWrapper = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-bottom: 0;
  align-items: center;
`;

const Notification = styled.Text`
  background-color: ${props => props.theme.colorPalette.gray[800]};
  color: ${props => props.theme.colorPalette.white};
  position: absolute;
  flex-direction: row;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const TileContentWrapper = styled.View`
  justify-content: space-between;
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  width: 100%;
`;

const TileContent = styled.View`
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 100%;
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

const DateLbl = styled.View`
  font-weight: normal;
`;

const ButtonWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export {
  TileWrapper,
  TileContentWrapper,
  Notification,
  TileContent,
  TileTopContent,
  TileDesc,
  DateLbl,
  ButtonWrapper,
};
