import styled from 'styled-components';

// import { BodyCopy } from '../../../../../common/atoms';

export const StyleProductDescription = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ImageStyleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StyleLongDescription = styled.View`
  flex-direction: row;
`;

export default { StyleProductDescription, ImageStyleWrapper, StyleLongDescription };
