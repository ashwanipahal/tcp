import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved

export const SkeletonWrapper = styled.View`
  height: 138px;
  margin: 14px 12px;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
`;

export const StoreDetailSkeleton = styled.Image`
  width: 60%;
  background-color: #d8d8d8;
`;

export const StoreInfoSkeleton = styled.View`
  width: 30%;
  background-color: #d8d8d8;
`;
