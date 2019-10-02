import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../hoc/withStyles';
import styles from './Thumbnail.style';
import { getLocator } from '../../../../utils';
import Image from '../Image';
import Anchor from '../Anchor';

class Thumbnail extends React.Component {
  static propTypes = {
    /** thumbnail image data */
    image: PropTypes.shape({
      /** id of the image */
      id: PropTypes.number.isRequired,
      /** thumbnail's name */
      name: PropTypes.string.isRequired,
      /** url path of the thumbnail */
      thumbnailPath: PropTypes.string.isRequired,
    }).isRequired,
    /** flags if the thumbnail should be shown as selected */
    isSelected: PropTypes.bool,
    /**
     * Function to call when a thumbnail is clicked, which will receive the id
     * of the corresponding image as the only parameter.
     */
    onClick: PropTypes.func.isRequired,
    totalCount: PropTypes.number,
    index: PropTypes.number,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const {
      onClick,
      image: { id },
    } = this.props;
    return onClick && onClick(id);
  }

  render() {
    const { image, isSelected, index, totalCount, className } = this.props;
    return (
      <div isSelected={isSelected} className={className}>
        <Anchor
          aria-label={`Thumbnail image ${index +
            1} of ${totalCount}. Click or Enter on this Icon to ${'display large view of the Image'}`}
          onClick={this.handleClick}
          className={['image-wrapper', isSelected ? 'selected-image' : ''].join(' ')}
        >
          <Image
            src={image.thumbnailPath}
            alt={image.name}
            title={image.name}
            itemProp="thumbnailUrl"
            data-locator={`${getLocator('pdp_alt_image')}_${index}`}
          />
        </Anchor>
      </div>
    );
  }
}

Thumbnail.defaultProps = {
  totalCount: 1,
  isSelected: false,
  className: '',
  index: 0,
};

export default withStyles(Thumbnail, styles);
export { Thumbnail as ThumbnailVanilla };
