import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';

const openModalApplyNowModal = (openApplyNowModal, step = 1) => {
  if (openApplyNowModal) {
    if (step === 1) {
      return openApplyNowModal({ isModalOpen: true });
    }
    return openApplyNowModal({ isModalOpen: false, isPLCCModalOpen: true });
  }
  return null;
};

const renderApplyNowLink = (text, openApplyNowModal) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      handleLinkClick={e => {
        e.preventDefault();
        openModalApplyNowModal(openApplyNowModal, 2);
      }}
      underline
    >
      {text}
    </Anchor>
  );
};

const renderLearnMoreLink = (text, openApplyNowModal) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        openModalApplyNowModal(openApplyNowModal);
      }}
    >
      {text}
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
  const { closeAddedToBagModal, openOverlay, openApplyNowModal } = props;
  switch (action) {
    case 'ApplyNowAction':
      returnLink = renderApplyNowLink(text, openApplyNowModal);
      break;
    case 'LearnMoreAction':
      returnLink = renderLearnMoreLink(text, openApplyNowModal);
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
