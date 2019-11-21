import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CustomSelect from '@tcp/core/src/components/common/molecules/CustomSelect';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import style, { customSelectStyles } from '../styles/StoreSelector.style';

const StoreSelectDropDown = withStyles(CustomSelect, customSelectStyles);

const getActiveTitle = (options, value, defaultSelectText) => {
  const selectedOption = options.find(o => o.value === value);
  if (selectedOption) {
    return selectedOption.title;
  }
  return defaultSelectText;
};

const StoreSelector = ({
  className,
  children,
  selectedLocation,
  options,
  defaultSelectText,
  titleText,
  selectionCallback,
  dataLocator,
}) => {
  return (
    <div className={className}>
      <div className="store-selector-icon">
        <Image src={getIconPath('fav-store-icon')} alt="Store Icon" />
      </div>
      <div className="store-selector">
        <div className="store-selector-title">
          <h4 className="store-selector-title__text" data-locator={getLocator(dataLocator)}>
            {titleText}
          </h4>
        </div>
        <div className="store-selector__dropdown">
          <StoreSelectDropDown
            options={options}
            activeValue={selectedLocation}
            activeTitle={getActiveTitle(options, selectedLocation, defaultSelectText)}
            clickHandler={selectionCallback}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

StoreSelector.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  selectedLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  defaultSelectText: PropTypes.string,
  titleText: PropTypes.string.isRequired,
  selectionCallback: PropTypes.func.isRequired,
  dataLocator: PropTypes.string,
};

StoreSelector.defaultProps = {
  children: null,
  defaultSelectText: '',
  selectedLocation: null,
  dataLocator: '',
};

export default withStyles(StoreSelector, style);
