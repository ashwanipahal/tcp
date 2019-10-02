import styled from 'styled-components/native';

const WrapLayout = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WrapItem = styled.View`
  width: 48%;
`;

export { WrapLayout, WrapItem };
