import React from 'react';
import { shallow } from 'enzyme';
import { AccountOverviewContainer } from '../AccountOverview.container';
import AccountOverviewComponent from '../../views/AccountOverview.view';

describe('AccountOverview container', () => {
  it('should render AccountOverview component', () => {
    const component = shallow(<AccountOverviewContainer labels={{ accountOverview: {} }} />);
    expect(component.is(AccountOverviewComponent)).toBeTruthy();
  });
});
