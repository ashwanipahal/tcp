function imageCover(alignment) {
  const hAlignment = `
    width: 100%;
    height: auto;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  `;

  const vAlignment = `
    width: auto;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `;

  return `
    position: absolute;
    max-width: none;
    max-height: none;
    ${alignment === 'horizontal' ? hAlignment : vAlignment}
  `;
}

export default imageCover;
