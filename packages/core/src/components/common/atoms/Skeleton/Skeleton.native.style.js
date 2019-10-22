import styled from 'styled-components';

const getRowStyle = props => {
  const { rowProps } = props;
  return rowProps;
};

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${getRowStyle}
`;
export const Col = styled.View`
  margin-bottom: 5px;
  margin-right: 5px;
  background: #d8d8d8;
  position: relative;
`;
