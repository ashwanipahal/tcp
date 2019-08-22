import React from 'react';
import PropTypes from 'prop-types';
import { getLocator } from '../../../../../../../utils';

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

    const {
      colorEntry: {
        colorProductId,
        color: { name },
        miscInfo,
      },
      isActive,
      onChipClick,
    } = this.props;
    this.handleClick = () => !isActive && onChipClick(colorProductId, name, miscInfo);
  }

  render() {
    const {
      colorEntry: {
        color: { name, imagePath },
      },
      isActive,
    } = this.props;

    return (
      <button
        data-locator={getLocator('global_ColorSwatch_Swatch_link')}
        type="button"
        onClick={this.handleClick}
        className={['content-colors-button', isActive ? 'active' : null].join(' ')}
      >
        <img className="product-color-chip-image" src={imagePath} alt={name} />
      </button>
    );
  }
}
