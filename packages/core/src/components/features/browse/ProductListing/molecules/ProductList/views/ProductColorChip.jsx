import React from 'react';
import PropTypes from 'prop-types';
import { getLocator } from '../../../../../../../utils';
import DamImage from '../../../../../../common/atoms/DamImage';

export default class ProductColorChip extends React.Component {
  static propTypes = {
    /**
     * Callback for clicks on color chips. Accepts colorProductId, colorName.
     * Note that it is up to this callback to update the selectedColorId prop of this component.
     */
    /** the color name of the currently selected chip */
    isActive: PropTypes.bool.isRequired,
    onChipClick: PropTypes.func.isRequired,
    swatchImage: PropTypes.string.isRequired,

    /** map of available colors to render chips for */
    colorEntry: PropTypes.shape().isRequired,
    imagesByColor: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const {
      colorEntry: {
        colorProductId,
        color: { name },
        miscInfo,
      },
      isActive,
      onChipClick,
    } = this.props;
    return !isActive && onChipClick(colorProductId, name, miscInfo);
  };

  getColorImageUrlByName = () => {
    const {
      imagesByColor,
      colorEntry: {
        color: { name },
      },
    } = this.props;
    return imagesByColor && imagesByColor[name] && imagesByColor[name].basicImageUrl;
  };

  render() {
    const {
      colorEntry: {
        color: { name },
      },
      isActive,
      swatchImage,
    } = this.props;
    const imgUrl = swatchImage
      ? `${swatchImage.split('_')[0]}/${swatchImage}`
      : this.getColorImageUrlByName();
    const imgData = {
      alt: name,
      url: imgUrl,
    };
    const imgConfig = swatchImage ? '' : 'w_50,h_50,c_thumb,g_auto:0';
    const imgDataConfig = [`${imgConfig}`, `${imgConfig}`, `${imgConfig}`];
    return (
      <button
        data-locator={getLocator('global_ColorSwatch_Swatch_link')}
        type="button"
        onClick={this.handleClick}
        title={name}
        className={['content-colors-button', isActive ? 'active' : null].join(' ')}
      >
        <DamImage
          className="product-color-chip-image"
          imgData={imgData}
          imgConfigs={imgDataConfig}
          isProductImage
        />
      </button>
    );
  }
}

export { ProductColorChip as ProductColorChipVanilla };
