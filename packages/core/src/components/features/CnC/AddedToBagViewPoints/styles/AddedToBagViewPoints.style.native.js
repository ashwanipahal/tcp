import styled from 'styled-components/native';

const ViewPointsWrapper = styled.View`
  display: flex;
  margin: 0 10px;
`;

const DefaultView = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Horizontal = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.PRIMARY.DARK};
  margin-bottom: 10px;
`;

export { DefaultView, ViewPointsWrapper, Horizontal };
