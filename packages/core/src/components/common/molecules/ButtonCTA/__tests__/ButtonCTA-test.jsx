import React from 'react';
import { shallow } from 'enzyme';
import ButtonCTA from '../ButtonCTA';

describe('Button CTA component', () => {
  it('renders correctly', () => {
    const compProps = {
      ctaProps: {
        className: 'ctaClassName',
        ctaVariation: 'fixed-width',
        link: {
          url: '/test',
          text: 'text',
          title: 'title',
        },
      },
    };
    const component = shallow(
      <ButtonCTA className="dropdown-items" uniqueKey="test_key" {...compProps} />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.ctaClassName')).toHaveLength(1);
  });
});
