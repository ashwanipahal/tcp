import styled from 'styled-components/native';

const FavoriteListFilterWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
export default FavoriteListFilterWrapper;
