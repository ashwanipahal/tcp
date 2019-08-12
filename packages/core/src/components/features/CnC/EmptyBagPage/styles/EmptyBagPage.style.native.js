// import styled from 'styled-components';
import styled from 'styled-components';

const StyledEmptyBag = styled.View`
  padding: 24px 10px;
  align-items: center;
`;

const ViewBagButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.DARK};
  padding: 12px 70px;
  margin: 27px 0px;
`;

const StyledSupportMsg = styled.View`
  margin-top: 10px;
`;

export { StyledEmptyBag, ViewBagButton, StyledSupportMsg };
