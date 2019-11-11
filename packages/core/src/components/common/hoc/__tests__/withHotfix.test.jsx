import React, { forwardRef } from 'react';
import { shallow } from 'enzyme';
import withHotfix from '../withHotfix';

describe(__filename, () => {
  it('renders even with no hotfixes defined', () => {
    const BaseComponent = forwardRef((props, ref) => <div ref={ref}>Hello</div>);
    BaseComponent.displayName = 'BaseComponent';
    const Component = withHotfix(BaseComponent);
    const tree = shallow(<Component />);
    expect(tree).toMatchSnapshot();
  });
  describe.skip('useBrowserHotfix', () => {});
  describe.skip('usePropsHotfix', () => {});
});
