function underlineLastLine(color = '#000', thickness = 2, bottomPadding = 18) {
  return `
    span {
        position: relative;
        display: inline;

        &::after {
          content: '';
          position: absolute;
          bottom: -${bottomPadding}px;
          left: 0;
          width: 100%;
          height: 1px;
          border-bottom: ${thickness}px solid ${color};
        }
      }
  `;
}

export default underlineLastLine;
