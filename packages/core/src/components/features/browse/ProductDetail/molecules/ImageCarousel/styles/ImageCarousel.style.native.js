import styled, { css } from 'styled-components/native';

const ImageTouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
`;

const Container = styled.View`
  justify-content: center;
  width: 100%;
`;

const FavoriteAndPaginationContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const FavoriteContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DownloadContainer = styled.View`
  width: 21px;
  height: 19px;
  margin-right: 0px;
`;

const ShareDialog = styled.View`
  display: none;
  width: 95%;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: -1;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
`;

const styles = css``;

export {
  styles,
  Container,
  FavoriteAndPaginationContainer,
  FavoriteContainer,
  DownloadContainer,
  ImageTouchableOpacity,
  ShareDialog,
};
