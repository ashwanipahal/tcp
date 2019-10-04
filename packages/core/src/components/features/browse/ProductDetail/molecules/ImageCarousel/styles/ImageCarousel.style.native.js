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
  width: 20;
`;

const styles = css``;

export {
  styles,
  Container,
  FavoriteAndPaginationContainer,
  FavoriteContainer,
  DownloadContainer,
  ImageTouchableOpacity,
};
