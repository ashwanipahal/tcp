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

    /** map of available colors to render chips for */
    colorEntry: PropTypes.shape().isRequired,
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

  render() {
    const {
      colorEntry: {
        color: { name, swatchimage },
      },
      isActive,
    } = this.props;
    const swatchImageUrl = swatchimage && swatchimage.split('_');
    const imgUrl = swatchImageUrl
      ? `${swatchImageUrl[0]}/${swatchImageUrl[0]}_${swatchImageUrl[1]}`
      : '';
    const imgData = {
      alt: name,
      url: imgUrl,
    };
    const imgConfig = 'w_50,h_50,c_thumb,g_auto:0';
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
