import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { configureInternalNavigationFromCMSUrl } from '../../../../utils';
import { Anchor } from '../../atoms';
import { BodyCopyVanilla } from '../../atoms/BodyCopy/views/BodyCopy';
import errorBoundary from '../../hoc/withErrorBoundary';
import withStyles from '../../hoc/withStyles';
import buttonStyles from '../../atoms/Button/Button.style';

const BodyCopyButtonStyled = withStyles(BodyCopyVanilla, buttonStyles);

const AnchorStyled = styled(Anchor)`
  span {
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
  }
`;

/**
 * @desc This component generates button list. The three variations of buttonlist are:
 * This component uses Anchor and Button atoms to render button list
 * 1. stackedCTAList: Buttons are in the stacked form.

 * 2. scrollCTAList: In the web view, peek appears for the next button to slide.
 * The user can slide from left to right to see the next buttons.

 * 3. linkCTAList: Category list buttons with bottom border, just like link with underline
 */
const ButtonCTA = props => {
  const {
    uniqueKey,
    className,
    dataLocator,
    dataLocatorCTA,
    ctaInfo: { className: ctaClassName, ctaVariation, link },
    ...otherProps
  } = props;

  const { url, target, title, text, actualUrl } = link;

  let to = actualUrl;
  if (!actualUrl) {
    to = configureInternalNavigationFromCMSUrl(url);
  }
  return (
    <AnchorStyled
      key={uniqueKey}
      className={ctaClassName}
      to={to}
      asPath={url}
      target={target}
      title={title}
      role="button"
      dataLocator={dataLocatorCTA || `${dataLocator}-link`}
    >
      <BodyCopyButtonStyled
        className={`${className || ''} cta-button-text`}
        tabIndex={-1}
        component="span"
        buttonVariation={ctaVariation}
        dataLocator={dataLocator}
        {...otherProps}
      >
        {text}
      </BodyCopyButtonStyled>
    </AnchorStyled>
  );
};

ButtonCTA.propTypes = {
  uniqueKey: PropTypes.string,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  dataLocatorCTA: PropTypes.string,
  ctaInfo: PropTypes.shape({
    ctaVariation: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

ButtonCTA.defaultProps = {
  uniqueKey: '',
  dataLocatorCTA: '',
};

export default errorBoundary(ButtonCTA);
