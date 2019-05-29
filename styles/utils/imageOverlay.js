import { transparentize } from 'polished';

function imageOverlay(colors) {
  const processedColors = colors.map(color => transparentize(color.opacity, color.hex)).toString();
  const background =
    colors.length > 1
      ? `background-image: linear-gradient(${processedColors})`
      : `background-color: ${processedColors}`;

  return `
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    ${background}
  `;
}

export default imageOverlay;
