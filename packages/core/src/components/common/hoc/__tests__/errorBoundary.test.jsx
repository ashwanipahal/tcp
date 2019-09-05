import React from 'react';
import { shallow } from 'enzyme';

const SafeComponent = jest.requireActual('../withErrorBoundary/errorBoundary');

jest.mock('@tcp/core/src/utils/errorReporter.util', () => ({
  trackError: jest.fn(),
}));

describe('<ErrorFallbackComponent />', () => {
  test('renders correctly', () => {
    function TestComponent() {
      return 'test';
    }
    const SafeComponentTag = SafeComponent.default(TestComponent);
    expect(SafeComponentTag).toMatchSnapshot();
  });

  test('renders correctly', () => {
    function TestComponent() {
      return 'test';
    }
    TestComponent.prototype.render = function _render() {
      return 'test';
    };
    const SafeComponentTag = SafeComponent.default(TestComponent);
    expect(SafeComponentTag).toMatchSnapshot();
  });

  test('renderErrorComponent correctly', () => {
    const SafeComponentTag = SafeComponent.renderErrorComponent({}, 'test');
    expect(SafeComponentTag).toMatchSnapshot();
  });

  test('logError correctly', () => {
    const SafeComponentTag = SafeComponent.logError({});
    expect(SafeComponentTag).toBe(true);
  });

  test('renderClientSafeComponent correctly', () => {
    const SafeComponentTag = SafeComponent.renderClientSafeComponent(() => {}, 'test');
    const ErrorFallbackComponentTag = shallow(<SafeComponentTag />);
    expect(ErrorFallbackComponentTag).toMatchSnapshot();
  });

  test('getDerivedStateFromError correctly', () => {
    const SafeComponentTag = SafeComponent.renderClientSafeComponent(() => {}, 'test');
    const derivedStateFromError = SafeComponentTag.getDerivedStateFromError();
    SafeComponentTag.prototype.componentDidCatch();
    expect(typeof derivedStateFromError).toBe('object');
  });

  test('functionalSafeComponent correctly', () => {
    const SafeComponentTag = SafeComponent.functionalSafeComponent(() => {});
    const SafeComponentTagClass = new SafeComponentTag();
    SafeComponentTagClass.state = { hasError: false };
    SafeComponentTagClass.render();
    expect(typeof SafeComponentTag).toBe('function');
  });

  test('functionalSafeComponent correctly - error', () => {
    const SafeComponentTag = SafeComponent.functionalSafeComponent(() => {});
    const SafeComponentTagClass = new SafeComponentTag();
    SafeComponentTagClass.state = { hasError: true };
    SafeComponentTagClass.render();
    expect(typeof SafeComponentTag).toBe('function');
  });

  test('nonFunctionalSafeComponent correctly', () => {
    const TestComp = function _comp() {
      return 'true';
    };

    TestComp.prototype.render = () => {
      return true;
    };
    const SafeComponentTag = SafeComponent.nonFunctionalSafeComponent(TestComp);
    SafeComponentTag.prototype.state = { hasError: true };
    const SafeComponentTagClass = new SafeComponentTag();
    SafeComponentTagClass.render();
    expect(typeof SafeComponentTag).toBe('function');
  });

  test('nonFunctionalSafeComponent correctly', () => {
    const TestComp = function _comp() {
      return 'true';
    };

    TestComp.prototype.render = () => {
      return true;
    };
    const SafeComponentTag = SafeComponent.nonFunctionalSafeComponent(TestComp);
    SafeComponentTag.prototype.state = { hasError: true };
    const SafeComponentTagClass = new SafeComponentTag();
    SafeComponentTagClass.state = { hasError: true };
    SafeComponentTagClass.render();
    expect(typeof SafeComponentTag).toBe('function');
  });

  test('wrapMethod correctly', () => {
    const Comp = function _comp() {
      return true;
    };
    Comp.prototype.render = () => true;
    const SafeComponentTag = SafeComponent.wrapMethod('render', Comp);
    Comp.prototype.render();
    expect(typeof SafeComponentTag).toBe('undefined');
  });

  test('wrapMethod correctly', () => {
    const Comp = function _comp() {
      return true;
    };
    Comp.prototype.render = () => {
      // eslint-disable-next-line no-throw-literal
      throw {};
    };
    const SafeComponentTag = SafeComponent.wrapMethod('render', Comp);
    Comp.prototype.render();
    expect(typeof SafeComponentTag).toBe('undefined');
  });

  test('wrapMethod correctly - shouldComponentUpdate', () => {
    const Comp = function _comp() {
      return true;
    };
    Comp.prototype.shouldComponentUpdate = () => {
      // eslint-disable-next-line no-throw-literal
      throw {};
    };
    const SafeComponentTag = SafeComponent.wrapMethod('shouldComponentUpdate', Comp);
    Comp.prototype.shouldComponentUpdate();
    expect(typeof SafeComponentTag).toBe('undefined');
  });

  test('wrapMethod correctly - nonExisting', () => {
    const Comp = function _comp() {
      return true;
    };
    Comp.prototype.nonExisting = () => {
      // eslint-disable-next-line no-throw-literal
      throw {};
    };
    const SafeComponentTag = SafeComponent.wrapMethod('nonExisting', Comp);
    Comp.prototype.nonExisting();
    expect(typeof SafeComponentTag).toBe('undefined');
  });

  test('wrapMethod correctly | non render', () => {
    const Comp = function _comp() {
      return true;
    };
    Comp.prototype.shouldComponentUpdate = () => true;
    const SafeComponentTag = SafeComponent.wrapMethod('shouldComponentUpdate', Comp);
    Comp.prototype.shouldComponentUpdate();
    expect(typeof SafeComponentTag).toBe('undefined');
  });
});
