import React from 'react';
import { shallow } from 'enzyme';
import { BodyCopyVanilla } from '../views/BodyCopy';

describe('Body component', () => {
  it('renders correctly without props', () => {
    const component = shallow(<BodyCopyVanilla>Body Copy</BodyCopyVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const props = {
      className: 'body-copy',
      component: 'p',
    };
    const component = shallow(<BodyCopyVanilla {...props}>Body Copy with props</BodyCopyVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.body-copy')).toHaveLength(1);
  });
});
