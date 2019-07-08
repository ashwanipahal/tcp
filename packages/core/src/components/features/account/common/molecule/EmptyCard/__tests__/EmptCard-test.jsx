import React from 'react';
import { shallow } from 'enzyme';
import { EmptyCardVanilla } from '../views/EmptyCard.view';

describe('EmptyCard Component', () => {
  it('should render correctly', () => {
    const props = {
      heading: 'Credit Cards',
      description: 'Add your new credit card',
      className: 'abc',
      icon: 'credit-card',
      alt: 'credit card icon',
    };
    const tree = shallow(<EmptyCardVanilla props={props} />);
    expect(tree).toMatchSnapshot();
  });
});
