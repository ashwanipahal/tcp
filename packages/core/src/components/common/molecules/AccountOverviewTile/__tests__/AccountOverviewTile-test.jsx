import React from 'react';
import { shallow } from 'enzyme';
import { AccountOverviewTile } from '../views/AccountOverviewTile.view';

describe('AccordionList component', () => {
  it('renders correctly AccountOverviewTile', () => {
    const props = {
      className: 'test',
      title: 'test',
      ctaTitle: 'test',
      ctaPath: 'test',
      dataLocatorPrefix: 'test',
    };
    const component = shallow(<AccountOverviewTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders empty correctly AccountOverviewTile', () => {
    const props = {
      className: '',
      title: '',
      ctaTitle: '',
      ctaPath: '',
      dataLocatorPrefix: '',
    };
    const component = shallow(<AccountOverviewTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
