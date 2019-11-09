import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyFooterSectionVanilla } from '../views/LoyaltyFooterSection';

describe('LoyaltyFooterSection View Component', () => {
  let props;
  beforeEach(() => {
    props = {
      className: '',
      footerLabels: {},
    };
  });
  let component;

  it('is not ProductDetailView should render correctly', () => {
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
});
