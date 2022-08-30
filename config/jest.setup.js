const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

jest.mock('../packages/core/src/components/common/hoc/withErrorBoundary/errorBoundary', () => {
  return WrappedComponent => WrappedComponent;
});
