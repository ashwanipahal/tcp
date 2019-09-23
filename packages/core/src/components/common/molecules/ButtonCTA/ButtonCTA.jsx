import React from 'react';
import PropTypes from 'prop-types';
import { configureInternalNavigationFromCMSUrl } from '../../../../utils';
import { Anchor, Button } from '../../atoms';
import errorBoundary from '../../hoc/withErrorBoundary';

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
    <Anchor
      key={uniqueKey}
      className={ctaClassName}
      to={to}
      asPath={url}
      target={target}
      title={title}
      dataLocator={dataLocatorCTA || `${dataLocator}-link`}
    >
      <Button
        className={className}
        buttonVariation={ctaVariation}
        dataLocator={dataLocator}
        {...otherProps}
      >
        {text}
      </Button>
    </Anchor>
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
