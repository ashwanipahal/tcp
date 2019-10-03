import styled from 'styled-components/native';

const MainWrapper = styled.View`
  flex-direction: column;
  margin: 0 10px;
`;
const StyledHeading = styled.Text`
  background-color: ${props => props.theme.colors.PROMO.YELLOW};
  text-align: center;
  padding: 5px;
`;
const SubHeading = styled.View`
  margin-top: 10px;
`;

export { StyledHeading, SubHeading, MainWrapper };
