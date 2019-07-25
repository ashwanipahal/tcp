import React from 'react';
import { shallow } from 'enzyme';
import { LegalLinksVanilla } from '../views';
import mock from './mock';

describe('Legal Links component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'test-legalLinks',
      links: mock.links,
    };
    const component = shallow(<LegalLinksVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.test-legalLinks li')).toHaveLength(5);
  });
});
