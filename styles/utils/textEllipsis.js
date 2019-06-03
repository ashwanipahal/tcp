function textEllipsis(maxWidth) {
  return `
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: ${maxWidth || '100%'};
  `;
}

export default textEllipsis;
