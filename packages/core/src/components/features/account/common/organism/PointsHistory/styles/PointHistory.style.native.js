import styled from 'styled-components/native';

const PointHistoryView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PointView = styled.View`
  width: 35%;
  padding-bottom: 10px;
`;

const PointTransView = styled.View`
  width: 30%;
  padding-bottom: 10px;
`;

const pointHistoryAnchorStyle = props => {
  const { theme } = props;
  return `
  display: flex;
  flex-direction: row;
  margin:${theme.spacing.LAYOUT_SPACING.SM} 0;
  `;
};

const PointHistorsWrapper = styled.View`
  ${pointHistoryAnchorStyle}
`;

export { PointHistoryView, PointHistorsWrapper, PointTransView, PointView };
