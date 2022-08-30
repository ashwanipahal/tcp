import styled from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

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

export const ItemStyleWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const StyleLongDescription = styled.View`
  flex-direction: row;
`;

export const PageContainer = styled.View`
  ${getAdditionalStyle}
`;

export default { PageContainer, StyleProductDescription, ImageStyleWrapper, StyleLongDescription };
