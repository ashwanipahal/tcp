import React from 'react';
import PropTypes from 'prop-types';
import 'core-js/stable/string/includes';
import { configurePlpNavigationFromCMSUrl } from '../../../../utils';
import { Anchor, Button } from '../../atoms';

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
    ctaInfo: { className: ctaClassName, ctaVariation, link },
    ...otherProps
  } = props;

  const { url, target, title, text, actualUrl } = link;

  let to = actualUrl;
  if (!actualUrl) {
    to = configurePlpNavigationFromCMSUrl(url);
  }

  return (
    <Anchor
      key={uniqueKey}
      className={ctaClassName}
      to={to}
      asPath={url}
      target={target}
      title={title}
    >
      <Button
        className={className}
        buttonVariation={ctaVariation}
        data-locator={dataLocator && dataLocator.cta}
        {...otherProps}
      >
        {text}
      </Button>
    </Anchor>
  );
};

ButtonCTA.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
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

export default ButtonCTA;
