import React, { forwardRef } from 'react';
import { shallow } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import withHotfix, { usePropsHotfix, useBrowserHotfix } from '../withHotfix';

describe(__filename, () => {
  let BaseComponent;
  beforeEach(() => {
    BaseComponent = forwardRef((props, ref) => <div ref={ref}>Hello</div>);
    BaseComponent.displayName = 'BaseComponent';
  });
  it('renders even with no hotfixes defined', () => {
    const HotfixedComponent = withHotfix(BaseComponent);
    const tree = shallow(<HotfixedComponent />);
    expect(tree).toMatchSnapshot();
  });
  describe('useBrowserHotfix', () => {
    it('executes even with no hotfixes defined', () => {
      const HotfixedComponent = withHotfix(BaseComponent);
      const { result } = renderHook(() => useBrowserHotfix(HotfixedComponent, {}));
      expect(result.current).toBeDefined();
    });
  });
  describe('usePropsHotfix', () => {
    it('executes even with no hotfixes defined', () => {
      const HotfixedComponent = withHotfix(BaseComponent);
      const { result } = renderHook(() => usePropsHotfix(HotfixedComponent, {}));
      expect(result.current).toBeDefined();
    });
  });
});
