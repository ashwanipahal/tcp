import styled from 'styled-components/native';

const MainWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;
const StyledHeading = styled.Text`
  background-color: ${props => props.theme.colors.PROMO.YELLOW};
  display: flex;
  padding: 5px;
`;
const SubHeading = styled.View`
  margin-top: 10px;
`;

export { StyledHeading, SubHeading, MainWrapper };
