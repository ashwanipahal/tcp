import styled from 'styled-components';

export const StyledAnchorWrapper = styled.View`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  flex: 1;
`;

export const PlaceHolderView = styled.View`
  height: 150px;
  border: 1px solid black;
  margin: 10px;
  text-align: center;
`;

export const StyledText = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const AddedToBagWrapper = styled.View`
  display: flex;
  flex: 1;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const applyPositionClassStyleAddedToBagWrapper = props => {
  if (props.isPayPalWebViewEnable === true) {
    return `
    top: 0;
    position:absolute;
    height:100%;
    width:100%;
    `;
  }
  return 'position:relative';
};
const applyPositionClassStyleWrapper = props => {
  if (props.isPayPalWebViewEnable === true) {
    return `
    top: 0;
    position:absolute;
    height:100%;
    width:100%;
    `;
  }
  return 'position:relative';
};
export const StyledWrapper = styled.View`
  height: 100%;
  background-color: ${props => props.theme.colors.WHITE};
`;

export const RowWrapper = styled.SafeAreaView`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  flex-direction: row;
`;

export const ImageWrapper = styled.View`
  width: 20%;
  align-self: flex-end;
`;

export const StyledHeader = styled.Text`
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
  justify-content: center;
  align-content: center;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ModalHeading = styled.Text`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 80%;
`;
