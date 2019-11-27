import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../atoms';
import { Wrapper, ImageGridContainer, ImageGridItem } from './ImageGrid.style.native';

const ImageGrid = props => {
  const {
    mediaList,
    imgWidth,
    column,
    gutter,
    imgHeight,
    dataLocator,
    navigation,
    IMG_DATA,
  } = props;
  return (
    <Wrapper>
      <ImageGridContainer width={imgWidth * column + gutter}>
        {mediaList &&
          mediaList.map(({ image, link, video }, index) => {
            const imgData = image || {};
            const videoData = video &&
              video.url && {
                ...video,
                videoWidth: imgWidth,
                videoHeight: imgHeight,
              };
            if (imgData && Object.keys(imgData).length > 0) {
              return (
                <Anchor url={link.url} navigation={navigation}>
                  <ImageGridItem
                    testID={`${dataLocator}_${index}`}
                    width={imgWidth}
                    height={imgHeight}
                    crop={imgData.crop_m}
                    gutter={gutter}
                    url={imgData.url}
                    alt={imgData.alt || imgData.title}
                    imgConfigs={IMG_DATA.imgConfig[0]}
                  />
                </Anchor>
              );
            }
            return videoData && Object.keys(videoData).length > 0 ? (
              <ImageGridItem
                testID={`${dataLocator}_${index}`}
                width={imgWidth}
                height={imgHeight}
                crop={imgData.crop_m}
                gutter={gutter}
                videoData={videoData}
              />
            ) : null;
          })}
      </ImageGridContainer>
    </Wrapper>
  );
};

ImageGrid.defaultProps = {
  mediaList: [],
  imgWidth: 164,
  imgHeight: 164,
  column: 2,
  gutter: 19,
  dataLocator: 'image_grid',
  navigation: null,
  IMG_DATA: {},
};

ImageGrid.propTypes = {
  mediaList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
      crop: PropTypes.string,
    })
  ),
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  column: PropTypes.number,
  gutter: PropTypes.number,
  dataLocator: PropTypes.string,
  navigation: PropTypes.shape({}),
  IMG_DATA: PropTypes.shape({}),
};

export default ImageGrid;
