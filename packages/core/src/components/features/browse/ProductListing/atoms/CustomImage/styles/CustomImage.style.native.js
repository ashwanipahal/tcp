import styled, { css } from 'styled-components/native';

const getImageStyle = () => {
  return `
  max-width: 164;
  height: 205;
  resize-mode: contain;
  `;
};

const ImageContainer = styled.Image`
  ${getImageStyle}
`;
const styles = css`
  ${getImageStyle}
`;

export { styles, ImageContainer };
