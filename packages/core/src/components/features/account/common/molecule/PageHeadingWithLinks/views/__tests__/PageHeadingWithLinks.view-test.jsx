import React from 'react';
import { shallow } from 'enzyme';
import { PageHeadingWithLinks } from '../PageHeadingWithLinks.view';

describe('PageHeadingWithLinks View', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      heading: 'test',
      programDetailsCta: 'test',
      termsConditionCta: 'test',
    };
    const tree = shallow(<PageHeadingWithLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should empty render correctly', () => {
    const props = {
      labels: {},
      heading: '',
      programDetailsCta: '',
      termsConditionCta: '',
    };
    const tree = shallow(<PageHeadingWithLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
