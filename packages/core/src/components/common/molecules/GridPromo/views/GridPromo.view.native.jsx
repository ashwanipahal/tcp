import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../atoms';

const getSeparatorText = textItems => {
  const headingLine = (textItems && textItems[0] && textItems[0].text) || '';
  return headingLine && headingLine.split('|');
};

const GridPromo = props => {
  const { className, promoObj, variation } = props;
  const { textItems, subHeadLine, mediaWrapper } = promoObj;

  if (variation === 'blank') {
    // This is a dummy block for horizontal promo
    return <Text />;
  }

  const headLineParts = getSeparatorText(textItems);
  const descriptionParts = getSeparatorText(subHeadLine);
  const imageStyle = {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  };

  if (variation === 'horizontal') {
    const imageBgStyles = {
      width: '100%',
    };
    return (
      <ImageBackground
        source={{
          uri: `https://test1.theplace.com/image/upload${mediaWrapper[0] && mediaWrapper[0].url}`,
        }}
        style={imageBgStyles}
      >
        {headLineParts.map(line => {
          return (
            <BodyCopy
              color="black"
              fontFamily="secondary"
              fontSize="fs24"
              textAlign="center"
              text={line}
            />
          );
        })}
      </ImageBackground>
    );
  }
  // TODO - fix the image path / take it from the CMS directly
  return (
    <ImageBackground
      source={{
        uri: `https://test1.theplace.com/image/upload${mediaWrapper[0] && mediaWrapper[0].url}`,
      }}
      style={imageStyle}
    >
      <View>
        <View className="headline-wrapper">
          {headLineParts.map(line => {
            return (
              <BodyCopy
                className={`${className} highlighted-text`}
                color="black"
                fontFamily="secondary"
                fontSize="fs28"
                fontWeight="black"
                textAlign="center"
                text={line}
              />
            );
          })}
        </View>
        <BodyCopy
          color="black"
          fontFamily="secondary"
          fontSize="fs18"
          textAlign="center"
          text={textItems && textItems[1] && textItems[1].text}
        />
        <BodyCopy
          color="black"
          fontFamily="secondary"
          fontSize="fs24"
          textAlign="center"
          text={textItems && textItems[2] && textItems[2].text}
        />
        {descriptionParts.map(desc => {
          return (
            <BodyCopy
              color="black"
              fontFamily="secondary"
              fontSize="fs10"
              textAlign="center"
              text={desc}
            />
          );
        })}
      </View>
    </ImageBackground>
  );
};

GridPromo.propTypes = {
  className: PropTypes.string,
  promoObj: PropTypes.shape({
    textItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ).isRequired,
    subHeadLine: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    promoWrapper: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
    mediaWrapper: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      })
    ),
  }).isRequired,
  variation: PropTypes.string,
};

GridPromo.defaultProps = {
  className: '',
  variation: 'vertical',
};

export default GridPromo;
