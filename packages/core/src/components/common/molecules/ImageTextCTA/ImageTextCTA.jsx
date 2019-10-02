import React from 'react';
import PropTypes from 'prop-types';
import { configureInternalNavigationFromCMSUrl } from '../../../../utils';
import { Anchor, DamImage, BodyCopy } from '../../atoms';

/**
 * This component uses Anchor and DamImage atoms to render button list
 * ImageTextCTA: Buttons are wrapped inside an anchor which makes image clickable.
 * The image and a text for that image comes as a button list.
 */
const ImageTextCTA = props => {
  const {
    uniqueKey,
    className: ctaClassName,
    dataLocator,
    ctaInfo: { link, className },
    image,
    fontWeight,
    fontSize,
    fontFamily,
    textAlign,
  } = props;

  const navigationUrl = link;
  const { text } = navigationUrl;
  navigationUrl.to = configureInternalNavigationFromCMSUrl(link.url);
  navigationUrl.asPath = link.url;

  return (
    <div className="img-wrapper">
      <div>
        <Anchor
          key={uniqueKey}
          fontSizeVariation="large"
          fontWeightVariation="active"
          dataLocator={dataLocator && dataLocator.cta}
          {...navigationUrl}
          className={ctaClassName}
        >
          {image && (
            <DamImage
              imgData={image}
              className={className}
              data-locator={dataLocator && dataLocator.image}
            />
          )}
          <BodyCopy
            fontWeight={fontWeight}
            fontSize={fontSize}
            className="image-comp"
            fontFamily={fontFamily}
            textAlign={textAlign}
          >
            {text}
          </BodyCopy>
        </Anchor>
      </div>
    </div>
  );
};

ImageTextCTA.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.shape({}).isRequired,
  ctaInfo: PropTypes.shape({
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  image: PropTypes.shape({}).isRequired,
  fontWeight: PropTypes.shape({}).isRequired,
  fontSize: PropTypes.shape({}).isRequired,
  fontFamily: PropTypes.shape({}).isRequired,
  textAlign: PropTypes.shape({}).isRequired,
};

export default ImageTextCTA;
