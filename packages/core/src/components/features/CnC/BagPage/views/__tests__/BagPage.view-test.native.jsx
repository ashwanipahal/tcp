import React from 'react';
import { shallow } from 'enzyme';
import { BagPage } from '../BagPage.view.native';

describe('AddedToBagActions native component', () => {
  const props1 = {
    labels: {
      viewBag: '',
      checkout: '',
      tagLine: 'tagline',
      bagHeading: 'test',
      savedLaterButton: 'savedLaterButton',
      itemUpdated: '',
    },
    activeSection: 'BAG',
    navigation: jest.fn(),
    sflItems: {},
    totalCount: 0,
    orderBalanceTotal: 0,
    fetchLabels: jest.fn(),
    isCartItemsUpdating: { isDeleting: true, isUpdating: true },
    toastMessage: jest.fn(),
    toastMessagePositionInfo: jest.fn(),
    showAddTobag: true,
    orderItemsCount: 1,
    isUserLoggedIn: true,
    isNoNEmptyBag: true,
    isBagStage: true,
    bagStickyHeaderInterval: true,
    isShowSaveForLaterSwitch: true,
  };
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 10,
      orderBalanceTotal: 0,
      fetchLabels: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      toastMessage: jest.fn(),
      toastMessagePositionInfo: jest.fn(),
    };
    const component = shallow(<BagPage {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with bag section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
      orderBalanceTotal: 0,
      fetchLabels: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      toastMessage: jest.fn(),
      toastMessagePositionInfo: jest.fn(),
      showAddTobag: true,
      orderItemsCount: 1,
      isUserLoggedIn: true,
      isNoNEmptyBag: true,
      isBagStage: true,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with SFL section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'SFL',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
      orderBalanceTotal: 0,
      fetchLabels: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      toastMessage: jest.fn(),
      toastMessagePositionInfo: jest.fn(),
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'SFL' });
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with active SFL section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
      orderBalanceTotal: 0,
      fetchLabels: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      toastMessage: jest.fn(),
      toastMessagePositionInfo: jest.fn(),
      showAddTobag: true,
      orderItemsCount: 1,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'SFL' });
    expect(component).toMatchSnapshot();
  });

  it('AddedToBagActions native component renders correctly with active BAG section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: '',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'SFL',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
      orderBalanceTotal: 0,
      fetchLabels: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      toastMessage: jest.fn(),
      toastMessagePositionInfo: jest.fn(),
      showAddTobag: true,
      orderItemsCount: 1,
      isUserLoggedIn: true,
      isNoNEmptyBag: true,
      isBagStage: true,
      isPickupModalOpen: true,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with bag section with method', () => {
    const component = shallow(<BagPage {...props1} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    const spyHandleScroll = jest.spyOn(component.instance(), 'handleScroll');
    const event = { nativeEvent: { contentOffset: { y: 4 } } };
    component.instance().handleScroll(event);
    expect(spyHandleScroll).toHaveBeenCalled();
  });
  it('AddedToBagActions native component renders correctly with bag section with method without y', () => {
    const component = shallow(<BagPage {...props1} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    const spyHandleScroll = jest.spyOn(component.instance(), 'handleScroll');
    const event = { nativeEvent: { contentOffset: { y: 0 } } };
    component.instance().handleScroll(event);
    expect(spyHandleScroll).toHaveBeenCalled();
  });
  it('AddedToBagActions native component renders correctly with bag section with method handleChangeActiveSection', () => {
    const component = shallow(<BagPage {...props1} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    const spyHandleScroll = jest.spyOn(component.instance(), 'handleChangeActiveSection');
    component.instance().handleChangeActiveSection('BagPage');
    expect(spyHandleScroll).toHaveBeenCalled();
  });
  it('AddedToBagActions native component renders correctly with bag section with method handleChangeActiveSection', () => {
    const component = shallow(<BagPage {...props1} />);
    const spyRenderModals = jest.spyOn(component.instance(), 'renderPickupModal');
    component.instance().renderPickupModal();
    expect(spyRenderModals).toHaveBeenCalled();
  });
});
