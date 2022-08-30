import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  width: 100%;
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  background-color: ${props =>
    props.theme.isGymboree
      ? props.theme.colorPalette.orange[50]
      : props.theme.colors.PRIMARY.COLOR1};
`;

export const StyledStoreLocator = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const StyledFindStoreTitle = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledCurrentLocation = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const StyleStoreOptionList = styled.View`
  font-family: ${props => props.theme.typography.fonts.secondary};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const StyledAutoComplete = styled.View`
  width: 100%;
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
  z-index: 1;
  right: -2px;
  top: 10px;
`;

export const StyledGoogleInput = styled.View`
  position: absolute;
`;

export const StyledLinks = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
`;
