import { shallow } from 'enzyme';
import React from 'react';
import { AccountVanilla, mapDispatchToProps } from '../container/Account.native';

describe('Account View', () => {
  let component;
  let props = {
    labels: {},
  };
  beforeEach(() => {
    component = shallow(<AccountVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should validate getComponent', () => {
    component = shallow(<AccountVanilla {...props} />);
    expect(component.instance().getComponent('accountOverviewMobile')).toEqual(
      'accountOverviewMobile'
    );
  });

  it('should render Account Correctly', () => {
    props = {
      labels: {
        account: {},
      },
      navData: {},
      mainContent: 'AccountOverview',
      handleComponentChange: () => {},
    };
    component = shallow(<AccountVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('#fetchLabels should call on componentDidMount', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchLabels();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should set state correctly based on the navData received from CMS', () => {
    props = {
      labels: {
        account: {},
      },
      accountNavigation: null,
      mainContent: 'AccountOverview',
      handleComponentChange: () => {},
    };
    component = shallow(<AccountVanilla {...props} />);
    component.setProps({
      accountNavigation: {
        accountNav: [
          {
            id: 'payment',
            component: 'payment',
          },
        ],
      },
    });
    const navState = component.state('navData');
    expect(navState[0].value).toBe('paymentGiftCardsPageMobile');
  });
});
