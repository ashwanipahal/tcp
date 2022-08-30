import styled from 'styled-components/native';

const PointHistoryView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PointView = styled.View`
  width: 30%;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const PointTransView = styled.View`
  width: 30%;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
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
