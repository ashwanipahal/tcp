import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, DamImage, BodyCopy } from '../../atoms';

/**
 * This component uses Anchor and DamImage atoms to render button list
 * ImageCTAList: Buttons are wrapped inside an anchor which makes image clickable.
 * The image and a text for that image comes as a button list.
 */
const ImageCTA = props => {
  const {
    uniqueKey,
    className,
    dataLocator,
    ctaProps: { link, className: ctaClassName },
    image,
    fontWeight,
    fontSize,
    fontFamily,
    textAlign,
  } = props;

  const { url, target, title, text } = link;

  return (
    <div className="img-wrapper">
      <div>
        <Anchor
          key={uniqueKey}
          href={url}
          target={target}
          title={title}
          fontSizeVariation="large"
          fontWeightVariation="active"
          dataLocator={dataLocator && dataLocator.cta}
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

ImageCTA.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.shape({}).isRequired,
  ctaProps: PropTypes.shape({
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

export default ImageCTA;
