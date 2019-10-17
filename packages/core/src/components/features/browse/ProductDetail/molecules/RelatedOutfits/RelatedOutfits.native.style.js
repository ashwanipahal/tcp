import styled from 'styled-components';

export const StyleRelatedOutfits = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ImageStyleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default { StyleRelatedOutfits, ImageStyleWrapper };
