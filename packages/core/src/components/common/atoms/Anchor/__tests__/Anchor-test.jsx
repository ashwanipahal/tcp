import React from 'react';
import { shallow } from 'enzyme';
import { AnchorVanilla } from '../views/Anchor';

describe('Anchor component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-anchor',
    };
    const component = shallow(<AnchorVanilla {...props}>Random anchor</AnchorVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-anchor')).toHaveLength(1);
  });

  it('renders correctly with nolink variation', () => {
    const props = {
      className: 'sample-anchor-nolink',
      noLink: true,
    };
    const component = shallow(
      <AnchorVanilla {...props}>Random anchor with no link component</AnchorVanilla>
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-anchor-nolink')).toHaveLength(1);
  });
});
