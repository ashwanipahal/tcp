import React from 'react';
import { shallow } from 'enzyme';
import { RenderTree } from '@fabulas/astly';
import { RichTextVanilla } from '../views/RichText';

describe('Rich Text component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-richtext',
      richTextHtml: '<button class="asdfasdf" type="button">test133</button>',
    };
    const component = shallow(<RichTextVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render RenderTree component if isNativeView is true', () => {
    const props = {
      className: 'sample-richtext',
      richTextHtml: '<button class="asdfasdf" type="button">test133</button>',
      isNativeView: true,
    };
    const component = shallow(<RichTextVanilla {...props} />);
    expect(component.is(RenderTree)).toBeTruthy();
  });
});
