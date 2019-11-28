import React from 'react';
import { PropTypes } from 'prop-types';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';

const openModalApplyNowModal = (openApplyNowModal, step = 1) => {
  if (openApplyNowModal) {
    if (step === 1) {
      return openApplyNowModal({ isModalOpen: true, status: null });
    }
    return openApplyNowModal({ isModalOpen: false, isPLCCModalOpen: true, status: null });
  }
  return null;
};

const renderApplyNowLink = (text, closeAddedToBagModal, openApplyNowModal, cartOrderItems) => {
  const pageData = 'shopping bag';
  const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      handleLinkClick={e => {
        e.preventDefault();
        openModalApplyNowModal(openApplyNowModal, 2);
        closeAddedToBagModal();
      }}
      underline
    >
      <ClickTracker
        clickData={{
          pageType: pageData,
          pageSection: pageData,
          pageSubSection: pageData,
          products: productsData,
          pageName: pageData,
          customEvents: ['event116'],
          eventName: 'loyaltyclick',
        }}
      >
        {text}
      </ClickTracker>
    </Anchor>
  );
};

const renderLearnMoreLink = (text, closeAddedToBagModal, openApplyNowModal, cartOrderItems) => {
  const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        openModalApplyNowModal(openApplyNowModal);
        closeAddedToBagModal();
      }}
    >
      <ClickTracker
        clickData={{
          pageName: 'shopping bag',
          eventName: 'loyaltyclick',
          customEvents: ['event117'],
          products: productsData,
        }}
      >
        {text}
      </ClickTracker>
    </Anchor>
  );
};

const onLinkClick = ({ e, componentId, closeAddedToBagModal, openOverlay }) => {
  e.preventDefault();
  closeAddedToBagModal();
  openOverlay({
    component: componentId,
    variation: 'primary',
  });
};

const renderCreateAccountLink = (text, closeAddedToBagModal, openOverlay) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        onLinkClick({ e, componentId: 'createAccount', closeAddedToBagModal, openOverlay });
      }}
    >
      {text}
    </Anchor>
  );
};

const renderLoginLink = (text, closeAddedToBagModal, openOverlay) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        onLinkClick({ e, componentId: 'login', closeAddedToBagModal, openOverlay });
      }}
    >
      {text}
    </Anchor>
  );
};

const getLinkWithName = (props, action, text) => {
  let returnLink;
  const { closeAddedToBagModal, openOverlay, openApplyNowModal, cartOrderItems } = props;
  switch (action) {
    case 'ApplyNowAction':
      returnLink = renderApplyNowLink(
        text,
        closeAddedToBagModal,
        openApplyNowModal,
        cartOrderItems
      );
      break;
    case 'LearnMoreAction':
      returnLink = renderLearnMoreLink(
        text,
        closeAddedToBagModal,
        openApplyNowModal,
        cartOrderItems
      );
      break;
    case 'CreateAccountAction':
      returnLink = renderCreateAccountLink(text, closeAddedToBagModal, openOverlay);
      break;
    case 'loginAction':
      returnLink = renderLoginLink(text, closeAddedToBagModal, openOverlay);
      break;
    default:
      break;
  }
  return returnLink;
};

const LoyaltyFooterSection = props => {
  const { className, footerLabels } = props;
  return (
    <div className={`${className} footer-wrapper`}>
      <div className="links-wrapper">
        {footerLabels.link1Prefix && (
          <BodyCopy
            className="symbolWrapper"
            color="text.primary"
            component="span"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs9"
          >
            {footerLabels.link1Prefix}
          </BodyCopy>
        )}
        {footerLabels.link1Action &&
          getLinkWithName(props, footerLabels.link1Action, footerLabels.link1Text)}
        {footerLabels.link1Action && footerLabels.link2Action && <span className="space-between" />}
        {footerLabels.link2Prefix && (
          <BodyCopy
            className="symbolWrapper"
            color="text.primary"
            component="span"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs9"
          >
            {footerLabels.link2Prefix}
          </BodyCopy>
        )}
        {footerLabels.link2Action &&
          getLinkWithName(props, footerLabels.link2Action, footerLabels.link2Text)}
      </div>
    </div>
  );
};

LoyaltyFooterSection.propTypes = {
  footerLabels: PropTypes.shape.isRequired,
  className: PropTypes.string,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
