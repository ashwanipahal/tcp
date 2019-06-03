// WARNING
// Requires polyfill for IE11
// Enabled by calling objectFitImages() inside componentDidMount()

function objectFit(position) {
  return `
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${position || 'center'};
    font-family: 'object-fit: cover; object-position: ${position || 'center'};';
  `;
}

export default objectFit;
