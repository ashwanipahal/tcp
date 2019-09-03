import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonCTA from '../../ButtonCTA';
import ImageCTA from '../../ImageCTA';
import withStyles from '../../../hoc/withStyles';
import ButtonListStyle from '../ButtonList.style';
import DropDownCategoryButton from '../../DropDownCategoryButton';

// Class to wrap button text
const wrappedTextClass = ' wrapped-button-text';

/**
 * StackedButtonCTA variation css class config
 * @param {*} length number of buttons
 */
const getStackedCTAProps = length => {
  return {
    compClassName: 'stacked-cta-wrapper',
    ctaProps: {
      className: 'stacked-button',
      ctaVariation: 'fixed-width',
    },
    compWrapper: `stacked-button-list-wrapper ${length > 5 ? wrappedTextClass : ''}`,
  };
};

/**
 * ScrollButtonCTA variation css class config
 * @param {*} length number of buttons
 */
const getScrollCTAProps = length => {
  return {
    compClassName: 'scroll-cta-wrapper',
    ctaProps: {
      className: 'scroll-button',
      ctaVariation: 'variable-width',
    },
    compWrapper: `scroll-button-list-wrapper ${length < 3 ? ' no-scrollable-cta' : ''} ${
      length > 5 ? wrappedTextClass : ''
    }`,
  };
};

/**
 * ImageCTA variation css class config
 * @param {*} length number of buttons
 */
const getImageCTAProps = length => {
  return {
    compClassName: 'scroll-cta-wrapper',
    ctaProps: {
      className: 'image-cta',
    },
    compWrapper: `scroll-button-list-wrapper ${length < 4 ? ' no-scrollable-cta' : ''} ${
      length > 5 ? wrappedTextClass : ''
    }`,
  };
};

/**
 * LinkCTA variation css class config
 */
const getLinkCTAProps = () => {
  return {
    compClassName: 'link-button-wrapper',
    ctaProps: {
      className: 'link-button',
      ctaVariation: 'category-links-dark',
    },
    compWrapper: 'link-button-list-wrapper',
  };
};

const renderDropDownCategoryButton = (properties, displayClass) => {
  const { className, buttonsData, dropdownLabel } = properties;

  return (
    <DropDownCategoryButton
      className={`${className} ${displayClass}`}
      buttonsData={buttonsData}
      dropdownLabel={dropdownLabel}
    />
  );
};

/**
 * This function returns button list variation config
 */
const getConfig = (variation, length) => {
  switch (variation) {
    case 'stackedCTAList':
      return getStackedCTAProps(length);
    case 'linkCTAList':
      return getLinkCTAProps();
    case 'scrollCTAList':
      return getScrollCTAProps(length);
    case 'imageCTAList':
      return getImageCTAProps(length);
    case 'dropdownCategoryButton':
      return {
        buttonListComponent: renderDropDownCategoryButton,
      };
    default:
      return {};
  }
};

const renderAdditionalButtonList = (variation, properties, display) => {
  const buttonListProps = getConfig(variation);
  const { buttonListComponent } = buttonListProps;

  let displayClass = '';
  if (display.large && display.medium && !display.small) {
    displayClass = 'additional-button-list hide-on-small-viewport';
  }

  return buttonListComponent(properties, displayClass);
};

/**
 * @param {object} props : Props for buttonlist
 * @desc This is a buttonlist component. There are four variations of buttons:
 * Based on the buttonListVariation, we render 4 different variations of the buttonList.
 */
const ButtonList = props => {
  const {
    className,
    buttonListVariation,
    dualVariation,
    buttonsData,
    dataLocatorDivisionImages,
    dataLocatorTextCta,
    fill,
  } = props;

  const config = getConfig(buttonListVariation, buttonsData.length);
  const { compClassName, ctaProps, compWrapper } = config;

  const compProps = {
    className: '',
    ctaProps: {},
    image: {},
  };
  compProps.ctaProps = ctaProps;
  compProps.fill = fill;
  compProps.className = `${compClassName}-class`;

  let Component = ButtonCTA;
  if (buttonListVariation === 'imageCTAList') {
    Component = ImageCTA;
  }

  let classToHideOnDesktop = '';
  if (dualVariation && dualVariation.name) {
    classToHideOnDesktop = 'is-tablet-hidden';
  }

  return (
    <React.Fragment>
      <div className={`${className} button-list-wrapper ${compWrapper} ${classToHideOnDesktop}`}>
        {buttonsData.map((item, index) => {
          const { button = {}, image } = item;
          const key = button.title && button.title.replace(/\s/g, '_');
          compProps.ctaProps.link = button;
          compProps.image = image;

          return (
            <Component
              uniqueKey={key}
              dataLocator={{
                image: `${dataLocatorTextCta}${index}`,
                cta: `${dataLocatorDivisionImages}${index}`,
              }}
              {...compProps}
              fontWeight="extrabold"
              fontSize="fs13"
              fontFamily="secondary"
              textAlign="center"
            />
          );
        })}
      </div>
      {dualVariation &&
        dualVariation.name &&
        renderAdditionalButtonList(dualVariation.name, props, dualVariation.displayProps)}
    </React.Fragment>
  );
};

ButtonList.defaultProps = {
  dualVariation: {
    small: false,
    medium: true,
    large: true,
  },
  buttonListVariation: 'stackedCTAList',
  className: '',
  dataLocatorDivisionImages: '',
  dataLocatorTextCta: '',
  fill: '',
};

ButtonList.propTypes = {
  dualVariation: PropTypes.shape({
    name: PropTypes.string,
    displayProps: PropTypes.shape({
      small: PropTypes.bool,
      medium: PropTypes.bool,
      large: PropTypes.bool,
    }),
  }),
  buttonsData: PropTypes.shape([]).isRequired,
  buttonListVariation: PropTypes.oneOf([
    'stackedCTAList',
    'linkCTAList',
    'scrollCTAList',
    'imageCTAList',
  ]),
  className: PropTypes.string,
  dataLocatorDivisionImages: PropTypes.string,
  dataLocatorTextCta: PropTypes.string,
  fill: PropTypes.string,
};

export default withStyles(ButtonList, ButtonListStyle);
export { ButtonList as VanillaButtonList };
