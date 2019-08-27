import React from 'react';
import { mount } from 'enzyme';
import Script from '..';

// TODO: Skipping due to issues with mismatched react versions between workspaces.
// https://github.com/zeit/next.js/issues/7626
// https://github.com/facebook/react/issues/13991
describe.skip('Script component', () => {
  let tree;
  let script;
  const props = {
    id: 'test_script',
    src: 'http://example.com/foo.js',
  };

  beforeAll(() => {
    tree = mount(<Script {...props} />);
    script = document.head.querySelector(`#${props.id}`);
  });

  it('injects a script into the document head', () => {
    expect(script).toBeDefined();
    expect(script.tagName).toEqual('SCRIPT');
    expect(document.head.querySelectorAll('script')).toHaveLength(1);
  });

  it('assigns props to the created script element', () => {
    expect(script.id).toEqual(props.id);
    expect(script.src).toEqual(props.src);
  });

  it('does not append another script if re-rendered', () => {
    tree.setProps({ src: 'new.js' });
    expect(document.head.querySelectorAll('script')).toHaveLength(1);
  });
});
