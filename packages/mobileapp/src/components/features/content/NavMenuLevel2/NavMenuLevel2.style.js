import styled from 'styled-components/native';

export const TitleView = styled.View`
  background: #ebf7ff;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const ItemView = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const HeadingView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
  border-bottom-color: #c3c3c3;
  border-bottom-width: 1;
`;

export const SizeSelector = styled.TouchableOpacity`
  margin: 10px 12px;
  width: 54;
  height: 54;
  border-radius: 27;
  background-color: white;
  border: 1px solid #9b9b9b;
  align-items: center;
  justify-content: center;
`;

export const ShopBySizeViewWrapper = styled.View`
  margin: 20px 5px;
  flex-direction: row;
  flex-wrap: wrap;
`;
