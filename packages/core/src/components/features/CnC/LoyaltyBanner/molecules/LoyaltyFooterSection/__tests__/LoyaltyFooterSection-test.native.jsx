import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyFooterSectionVanilla } from '../views/LoyaltyFooterSection.native';

describe('LoyaltyFooterSection', () => {
  let props;
  beforeEach(() => {
    props = {
      className: '',
      footerLabels: {},
      openApplyNowModal: jest.fn(),
      closeAddedToBagModal: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      },
    };
  });
  let component;
  it('should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('isProductDetailView should render correctly', () => {
    props.footerLabels.link1Text = 'abc';
    props.footerLabels.link1Action = 'abc';
    props.footerLabels.link1Prefix = 'abc';
    props.footerLabels.link2Text = 'abc';
    props.footerLabels.link2Action = 'abc';
    props.footerLabels.link2Prefix = 'abc';
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('isProductDetailView && plcc && isGuest should render correctly', () => {
    props.footerLabels.link1Text = 'ApplyNowAction';
    props.footerLabels.link1Action = 'ApplyNowAction';
    props.footerLabels.link1Prefix = 'abc';
    props.footerLabels.link2Text = 'LearnMoreAction';
    props.footerLabels.link2Action = 'LearnMoreAction';
    props.footerLabels.link2Prefix = 'abc';
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    component
      .find('Styled(Anchor)')
      .at(0)
      .simulate('press');
    component
      .find('Styled(Anchor)')
      .at(1)
      .simulate('press');
    expect(component).toMatchSnapshot();
  });

  it('isProductDetailView && isGuest should render correctly', () => {
    props.footerLabels.link1Text = 'CreateAccountAction';
    props.footerLabels.link1Action = 'CreateAccountAction';
    props.footerLabels.link1Prefix = 'abc';
    props.footerLabels.link2Text = 'loginAction';
    props.footerLabels.link2Action = 'loginAction';
    props.footerLabels.link2Prefix = 'abc';
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly if show modal', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    component.setState({ showModal: true });
    expect(component).toMatchSnapshot();
  });
  it('should call toggleModal with getComponentId ', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    component.setState({ showModal: false });
    component
      .instance()
      .toggleModal({ getComponentId: { login: 'login', createAccount: 'create' } });
    expect(component.state('showModal')).toBe(true);
    expect(component.state('getComponentId')).toMatchObject({
      login: 'login',
      createAccount: 'create',
    });
  });
  it('should call toggleModal without getComponentId ', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...props} />);
    component.setState({ showModal: false });
    component.instance().toggleModal({});
    expect(component.state('showModal')).toBe(true);
    expect(component.state('getComponentId')).toBe('');
  });
});
