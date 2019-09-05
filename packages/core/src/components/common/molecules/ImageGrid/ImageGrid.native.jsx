import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../atoms';
import { Wrapper, ImageGridContainer, ImageGridItem } from './ImageGrid.style.native';
import config from './config';

const ImageGrid = props => {
  const { mediaList, imgWidth, column, gutter, imgHeight, dataLocator, navigation } = props;
  return (
    <Wrapper>
      <ImageGridContainer width={imgWidth * column + gutter}>
        {mediaList &&
          mediaList.map(({ image, link }, index) => {
            return (
              <Anchor url={link.url} navigation={navigation}>
                <ImageGridItem
                  testID={`${dataLocator}_${index}`}
                  width={imgWidth}
                  height={imgHeight}
                  crop={image.crop_m}
                  gutter={gutter}
                  url={image.url}
                  alt={image.alt || image.title}
                  imgConfigs={config.IMG_DATA.imgConfig[0]}
                />
              </Anchor>
            );
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
  gutter: 18,
  dataLocator: 'image_grid',
  navigation: null,
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
};

export default ImageGrid;
