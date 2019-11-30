import styled from 'styled-components/native';

const FavoriteListFilterWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  border-bottom: 1px solid ${props => props.theme.colorPalette.black};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export default FavoriteListFilterWrapper;
