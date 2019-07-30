import React from 'react';
import PropTypes from 'prop-types';

import { ImageGridContainer, ImageGridItem } from './ImageGrid.style.native';

const ImageGrid = props => {
  const { data, imgWidth, imgHeight, dataLocator } = props;

  return (
    <ImageGridContainer>
      {data.map(({ crop_m: cropM, url, alt, title }, index) => {
        return (
          <ImageGridItem
            data-locator={`${dataLocator}_${index}`}
            width={imgWidth}
            height={imgHeight}
            crop={cropM}
            url={url}
            alt={alt || title}
          />
        );
      })}
    </ImageGridContainer>
  );
};

ImageGrid.defaultProps = {
  data: [],
  imgWidth: '164px',
  imgHeight: '164px',
  dataLocator: 'image_grid',
};

ImageGrid.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
      crop: PropTypes.string,
    })
  ),
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  dataLocator: PropTypes.string,
};

export default ImageGrid;
