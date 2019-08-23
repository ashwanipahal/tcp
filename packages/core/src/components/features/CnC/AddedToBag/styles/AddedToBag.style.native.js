import styled from 'styled-components';

export const StyledAnchorWrapper = styled.View`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const PlaceHolderView = styled.View`
  height: 150px;
  border: 1px solid black;
  margin: 10px;
  text-align: center;
`;

export const StyledText = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const AddedToBagWrapper = styled.View`
  display: flex;
  flex: 1;
`;

export const StyledWrapper = styled.View`
  height: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
