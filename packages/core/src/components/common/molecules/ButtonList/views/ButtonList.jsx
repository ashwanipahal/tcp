import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonCTA from '../../ButtonCTA';
import ImageTextCTA from '../../ImageTextCTA';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import config from '../ButtonList.config';
import ButtonListStyle from '../ButtonList.style';
import DropDownButton from '../../DropDownButton';
import { generateUniqueKeyUsingLabel } from '../../../../../utils';

// Class to wrap button text
const wrappedTextClass = ' wrapped-button-text';

/**
 * StackedButtonCTA variation css class config
 * @param {*} length number of buttons
 */
const getStackedCTAConfig = length => {
  const stackedCTAConfig = config.stackedCTAList;
  stackedCTAConfig.compWrapper = `stacked-button-list-wrapper ${
    length > stackedCTAConfig.MAX_NUM_OF_BUTTONS_IN_A_ROW ? wrappedTextClass : ''
  }`;
  return stackedCTAConfig;
};

/**
 * ScrollButtonCTA variation css class config
 * @param {*} length number of buttons
 */
const getScrollCTAConfig = length => {
  const scrollCTAConfig = config.scrollCTAList;
  scrollCTAConfig.compWrapper = `scroll-button-list-wrapper ${
    length < scrollCTAConfig.MIN_NO_OF_BUTTONS_TO_SCROLL ? ' no-scrollable-cta' : ''
  } ${length > scrollCTAConfig.MAX_NUM_OF_BUTTONS_IN_A_ROW ? wrappedTextClass : ''}`;
  return scrollCTAConfig;
};

/**
 * ImageCTA variation css class config
 * @param {*} length number of buttons
 */
const getImageCTAConfig = length => {
  const imageCTAConfig = config.imageCTAList;
  imageCTAConfig.compWrapper = `scroll-button-list-wrapper ${
    length < imageCTAConfig.MIN_NO_OF_BUTTONS_TO_SCROLL ? ' no-scrollable-cta' : ''
  } ${length > imageCTAConfig.MAX_NUM_OF_BUTTONS_IN_A_ROW ? wrappedTextClass : ''}`;
  return imageCTAConfig;
};

/**
 * LinkCTA variation css class config
 */
const getLinkCTAConfig = () => {
  return config.linkCTAList;
};

/**
 * Renders Drop Down Button CTA variation
 * @param {*} properties Properties required for Drop Down Button
 * @param {*} parentClass Class passed from parent component
 */
const renderDropDownButton = (properties, parentClass) => {
  const {
    className,
    buttonsData,
    dropdownLabel,
    dataLocatorDropDown,
    dataLocatorTextCta,
  } = properties;
  return (
    <DropDownButton
      className={`${className} ${parentClass}`}
      buttonsData={buttonsData}
      dropdownLabel={dropdownLabel}
      dataLocator={dataLocatorDropDown}
      dataLocatorItemPrefix={dataLocatorTextCta}
    />
  );
};

/**
 * This function returns button list variation config
 */
const getButtonListConfig = (variation, length) => {
  switch (variation) {
    case config.buttonListVariations.STACKED_CTA:
      return getStackedCTAConfig(length);
    case config.buttonListVariations.LINK_CTA:
      return getLinkCTAConfig();
    case config.buttonListVariations.SCROLL_CTA:
      return getScrollCTAConfig(length);
    case config.buttonListVariations.IMAGE_CTA:
      return getImageCTAConfig(length);
    case config.buttonListVariations.DROPDOWN_CTA:
      return {
        buttonListComponent: renderDropDownButton,
      };
    default:
      return {};
  }
};

/**
 * This function renders additional button list when dual variation is passed to Button List component
 * @param {*} variation variation name
 * @param {*} properties Props for the variation
 * @param {Object} display determines to show this additional button list on different view ports
 */
const renderAdditionalButtonList = (variation, properties, display) => {
  const buttonListConfig = getButtonListConfig(variation);
  const { buttonListComponent } = buttonListConfig;

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

  const buttonListConfig = getButtonListConfig(buttonListVariation, buttonsData.length);
  const { compClassName, ctaInfo, compWrapper, noCurveMobile } = buttonListConfig;

  let Component = ButtonCTA;
  let dataLocator = dataLocatorTextCta;
  if (buttonListVariation === 'imageCTAList') {
    Component = ImageTextCTA;
    dataLocator = dataLocatorDivisionImages;
  }

  let hideOnDesktopClassname = '';
  if (dualVariation && dualVariation.name) {
    hideOnDesktopClassname = 'is-tablet-hidden';
  }

  return (
    <React.Fragment>
      <div className={`${className} button-list-wrapper ${compWrapper} ${hideOnDesktopClassname}`}>
        {buttonsData.map((item, index) => {
          const { button = {}, image } = item;
          const compProps = {
            className: `${compClassName}-class`,
            ctaInfo: {
              ...ctaInfo,
              link: button,
            },
            fill,
            image,
            noCurveMobile,
          };

          // Code to generate unique key
          const key = button.title && generateUniqueKeyUsingLabel(button.title);

          return (
            <Component
              uniqueKey={key}
              dataLocator={`${dataLocator}${index}`}
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

export default withStyles(errorBoundary(ButtonList), ButtonListStyle);
export { ButtonList as VanillaButtonList };
