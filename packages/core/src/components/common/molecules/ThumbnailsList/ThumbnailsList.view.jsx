import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '../../atoms/Thumbnail';

const ThumbnailsList = props => {
  const { images, onThumbnailClick, selectedImageIndex } = props;
  return (
    <ul>
      {images.map((image, index) => (
        <Thumbnail
          key={image.imageUrl}
          image={{
            name: image.imageName,
            thumbnailPath: image.imageUrl,
            id: index,
          }}
          isSelected={selectedImageIndex === index}
          onClick={onThumbnailClick}
          totalCount={images.length}
          index={index}
        />
      ))}
    </ul>
  );
};

ThumbnailsList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** index of the currently selected image in the images array */
  selectedImageIndex: PropTypes.number.isRequired,
  /**
   * Function to call when a thumbnail is clicked, which will receive the id
   * of the corresponding image as the only parameter.
   */
  onThumbnailClick: PropTypes.func.isRequired,
};

export default ThumbnailsList;
