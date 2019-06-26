const createRwdStyle = styleConfig => props => {
  const defaultStyle = Object.keys(styleConfig).map(key => {
    let styleValue = '';
    let style = '';
    if (props[key]) {
      styleValue = typeof props[key] === 'string' ? props[key] : props[key][0];
      style = `${styleConfig[key].prop}: ${styleValue};`;
    }
    return style;
  });

  return defaultStyle.join('');
};

export default createRwdStyle;
