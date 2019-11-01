import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { BagPageViewVanilla } from '../BagPage.view';

describe('Bag page View', () => {
  const props = {
    labels: {},
    initialActions: jest.fn(),

    className: 'test',
    orderItemsCount: 10,
    totalCount: 10,
    handleCartCheckout: jest.fn(),
    showAddTobag: true,
    showConfirmationModal: true,
    closeCheckoutConfirmationModal: jest.fn(),
    removeUnqualifiedItemsAndCheckout: jest.fn(),
    setVenmoPaymentInProgress: jest.fn(),
    sflItems: {},
    orderBalanceTotal: 50,
  };

  it('should render Added to Bag view section', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render SFL section', () => {
    const sflProps = {
      ...props,
      sflItems: fromJS([{}]),
    };
    const component = shallow(<BagPageViewVanilla {...sflProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should not render SFL section', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call removeScrollListener', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'removeScrollListener');
    component.instance().removeScrollListener();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call addScrollListenerMobileHeader', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'addScrollListenerMobileHeader');
    component.instance().addScrollListenerMobileHeader();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call addScrollListener', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'addScrollListener');
    component.instance().addScrollListener();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call getBagCondensedHeader', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'getBagCondensedHeader');
    component.instance().getBagCondensedHeader('<div></div>');
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call getBagPageHeaderRef', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'getBagPageHeaderRef');
    component.instance().getBagPageHeaderRef('<span></span>');
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call getBagActionsContainerRef', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'getBagActionsContainerRef');
    component.instance().getBagActionsContainerRef('<p></p>');
    expect(spyOpenModal).toHaveBeenCalled();
  });
  it('should render with showCondensedHeader: true,', () => {
    props.isShowSaveForLaterSwitch = true;
    const component = shallow(<BagPageViewVanilla {...props} />);
    component.setState({
      showCondensedHeader: true,
      showStickyHeaderMob: true,
      activeSection: 'SFL',
    });
    component.instance().handleChangeActiveSection('BAG');
    component.instance().renderActions();
    component.instance().renderLeftSection();
    expect(component).toMatchSnapshot();
  });
  it('should render with only SFL condition', () => {
    props.isShowSaveForLaterSwitch = true;
    props.totalCount = null;
    props.sflItems = { size: 2 };
    const component = shallow(<BagPageViewVanilla {...props} />);
    component.setState({
      showCondensedHeader: true,
      showStickyHeaderMob: true,
      activeSection: 'SFL',
    });
    component.setProps({ orderItemsCount: 20 });
    component.instance.bagActionsContainer = '<div></div>';
    expect(component).toMatchSnapshot();
  });
  it('should call componentWillUnmount', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    component.instance().componentWillUnmount();
  });
  it('should call renderRecommendations', () => {
    props.orderItemsCount = 0;
    props.sflItems = { size: 2 };
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'renderRecommendations');
    component.instance().renderRecommendations();
    expect(spyOpenModal).toHaveBeenCalled();
  });
  it('should call renderHeaderError', () => {
    props.orderItemsCount = 0;
    props.sflItems = { size: 2 };
    props.labels = {};
    const component = shallow(<BagPageViewVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'renderHeaderError');
    component.instance().renderHeaderError(true, [props]);
    expect(spyOpenModal).toHaveBeenCalled();
  });
  it('renders correctly with bag section with method', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    const spyHandleScroll = jest.spyOn(component.instance(), 'handleScroll');
    const event = { nativeEvent: { contentOffset: { y: 4 } } };
    component.instance().handleScroll(event);
    expect(spyHandleScroll).toHaveBeenCalled();
  });
  it('renders correctly with bag section with method without y', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    component.setState({ activeSection: 'BAG', showCondensedHeader: true });
    const spyHandleScroll = jest.spyOn(component.instance(), 'handleScroll');
    const event = { nativeEvent: { contentOffset: { y: 0 } } };
    component.instance().handleScroll(event);
    expect(spyHandleScroll).toHaveBeenCalled();
  });
});
