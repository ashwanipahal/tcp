import styled from 'styled-components';

const getRowStyle = props => {
  const { rowProps } = props;
  return rowProps;
};
const getColStyle = props => {
  const { colProps } = props;
  return colProps;
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
  ${getColStyle}
  ${props => (props.outFitSkeleton ? `margin:12px 12px; ` : '')}
`;
