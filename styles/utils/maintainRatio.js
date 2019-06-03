function maintainRatio(height, width) {
  const ratio = (height / width) * 100;

  return `
    padding-top: ${ratio}%;
  `;
}

export default maintainRatio;
