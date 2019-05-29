function underlineText(color, thickness, bottomPadding) {
  return `
    padding-bottom: ${bottomPadding - thickness}px;

    span {
      background-image: linear-gradient(to right, ${color} 0%, ${color} 100%);
      background-repeat: repeat-x;
      background-position: 0 100%;
      background-size: 100% ${thickness}px;
      padding-bottom: ${bottomPadding}px;
    }
  `;
}

export default underlineText;
