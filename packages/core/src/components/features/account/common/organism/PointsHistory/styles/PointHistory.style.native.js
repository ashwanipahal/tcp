import styled from 'styled-components/native';

const PointHistoryView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PointView = styled.View`
  width: 28%;
`;

const PointTransView = styled.View`
  width: 44%;
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
