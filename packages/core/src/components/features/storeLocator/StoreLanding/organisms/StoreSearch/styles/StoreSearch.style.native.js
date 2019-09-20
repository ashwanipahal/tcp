import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  width: 100%;
  padding: 24px 14px;
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  background-color: ${props =>
    props.theme.isGymboree
      ? props.theme.colorPalette.orange[50]
      : props.theme.colors.PRIMARY.COLOR1};
`;

export const StyledStoreLocator = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const StyledFindStoreTitle = styled.View`
  margin-bottom: 12px;
`;

export const StyledCurrentLocation = styled.View`
  margin-left: 8px;
`;

export const StyleStoreOptionList = styled.View`
  font-family: ${props => props.theme.typography.fonts.secondary};
  margin-top: 8px;
`;

export const StyledAutoComplete = styled.View`
  width: 100%;
  position: relative;
`;

export const StyledCheckbox = styled.View`
  min-width: 150px;
  flex-direction: row;
`;

export const StyledCheckBoxBodyCopy = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StyledSearch = styled.View`
  position: absolute;
  right: -2px;
  bottom: 30px;
`;

export const StyledLinks = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  font-size: 12px;
`;
