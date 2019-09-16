import styled from 'styled-components/native';

const getImageStyle = props => {
  const { width, height, resizeMode } = props;
  return `
  width: ${width};
  height: ${height};
  resize-mode: ${resizeMode};
  `;
};

// border: 1px solid #00ff00;

const ImageContainer = styled.Image`
  ${getImageStyle}
`;

export default ImageContainer;
