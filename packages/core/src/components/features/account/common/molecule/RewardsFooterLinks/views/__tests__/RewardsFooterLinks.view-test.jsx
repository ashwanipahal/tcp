import React from 'react';
import { shallow } from 'enzyme';
import { RewardsFooterLinks } from '../RewardsFooterLinks.view';

describe('PageHeadingWithLinks View', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      programDetailsCta: 'link1',
      termsConditionCta: 'link2',
    };
    const tree = shallow(<RewardsFooterLinks {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
