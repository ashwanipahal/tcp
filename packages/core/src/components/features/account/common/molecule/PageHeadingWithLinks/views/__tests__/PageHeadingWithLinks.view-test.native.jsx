import React from 'react';
import { shallow } from 'enzyme';
import { PageHeadingWithLinks } from '../PageHeadingWithLinks.view.native';

describe('PageHeadingWithLinks native View', () => {
  it('should render correctly', () => {
    const props = {
      programDetailsCta: 'test',
      termsConditionCta: 'test',
      heading: 'Test',
    };
    const tree = shallow(<PageHeadingWithLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should empty render correctly', () => {
    const props = {
      heading: '',
      programDetailsCta: '',
      termsConditionCta: '',
    };
    const tree = shallow(<PageHeadingWithLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
