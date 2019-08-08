import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, ImageGridContainer, ImageGridItem } from './ImageGrid.style.native';

const ImageGrid = props => {
  const { mediaList, imgWidth, column, gutter, imgHeight, dataLocator } = props;

  return (
    <Wrapper>
      <ImageGridContainer width={imgWidth * column + gutter}>
        {mediaList.map(({ crop_m: cropM, url, alt, title }, index) => {
          return (
            <ImageGridItem
              testID={`${dataLocator}_${index}`}
              width={imgWidth}
              height={imgHeight}
              crop={cropM}
              gutter={gutter}
              url={url}
              alt={alt || title}
            />
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
};

export default ImageGrid;
