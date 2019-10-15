import styled, { css } from 'styled-components';

const getRowStyle = props => {
  const { rowProps } = props;
  return rowProps;
};

const getColStyle = props => {
  const { colProps } = props;
  return colProps;
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${getRowStyle}
`;
export const Col = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  background: #d8d8d8;
  position: relative;
  width: 100px;
  height: 150px;
  ${getColStyle}
`;
const style = css`
  position: relative;
  .left-carousel {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
  .right-carousel {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
`;
export default style;
