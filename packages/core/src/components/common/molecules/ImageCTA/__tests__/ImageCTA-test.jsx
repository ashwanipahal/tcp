import React from 'react';
import { shallow } from 'enzyme';
import ImageCTA from '../ImageCTA';

describe('Image CTA component', () => {
  it('renders correctly', () => {
    const compProps = {
      compClassName: 'scroll-cta-wrapper',
      ctaProps: {
        className: 'image-cta',
        link: {
          url: '/test',
          text: 'text',
          title: 'title',
        },
      },
      image: {
        crop_d: '',
        crop_t: '',
        crop_m: '',
        url: '/test',
        alt: 'test',
      },
      compWrapper: `scroll-button-list-wrapper`,
    };
    const component = shallow(
      <ImageCTA
        className="dropdown-items"
        uniqueKey="test_key"
        {...compProps}
        fontWeight="extrabold"
        fontSize="fs13"
        fontFamily="secondary"
        textAlign="center"
      />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.image-cta')).toHaveLength(1);
  });
});
