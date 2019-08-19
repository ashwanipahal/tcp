// @flow
import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor, Button, DamImage } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import ButtonListStyle from '../ButtonList.style';
import config from '../ButtonList.config';

type Props = {
  buttonsData: [],
};

/**
 * @desc This method getImageCTA generates button list.
 * This component uses Anchor and DamImage atoms to render button list
 * ImageCTAList: Buttons are wrapped inside an anchor which makes image clickable.
 * The image and a text for that image comes as a button list.
 */

const getImageCTA = item => {
  const { className, buttonListVariation, dataLocatorDivisionImages, dataLocatorTextCta } = item;

  return (
    <div className={`${config[buttonListVariation].className} div-image-wrapper`}>
      {item.buttonsData.map((data, index) => {
        const { image, button = {} } = data;
        return (
          <div className="img-wrapper">
            <div>
              <Anchor
                key={index.toString()}
                href={button.url}
                target={button.target}
                title={button.title}
                fontSizeVariation="large"
                fontWeightVariation="active"
                data-locator={`${dataLocatorTextCta}${index + 1}`}
              >
                <DamImage
                  imgData={image}
                  className={className}
                  data-locator={`${dataLocatorDivisionImages}${index + 1}`}
                />
                <div className="image-comp">{button.text}</div>
              </Anchor>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * @desc This method getButtonCTA generates button list. The three variations of buttonlist are:
 * This component uses Anchor and Button atoms to render button list
 * 1. stackedCTAList: Buttons are in the stacked form.

 * 2. scrollCTAList: In the web view, peek appears for the next button to slide.
 * The user can slide from left to right to see the next buttons.

 * 3. linkCTAList: Category list buttons with bottom border, just like link with underline
 */

const getButtonCTA = data => {
  const {
    className,
    buttonsData,
    buttonListVariation,
    buttonVariation,
    dataLocatorTextCta,
    ...otherProps
  } = data;

  return buttonsData.map((item, index) => {
    const { button = {} } = item;
    const key = button.title && button.title.replace(/\s/g, '_');
    return (
      <Anchor
        key={key}
        className={className}
        href={button.url}
        target={button.target}
        title={button.title}
      >
        <Button
          className={`${config[buttonListVariation].className}-class`}
          buttonVariation={buttonVariation}
          data-locator={`${dataLocatorTextCta}${index + 1}`}
          {...otherProps}
        >
          {button.text}
        </Button>
      </Anchor>
    );
  });
};

/**
 * @param {object} props : Props for buttonlist
 * @desc This is a buttonlist component. There are four variations of buttons:
 * Based on the buttonListVariation, we render 4 different variations of the buttonList.
 */

const ButtonList = (props: Props) => {
  const {
    buttonsData,
    buttonListVariation,
    fill,
    className,
    dataLocatorDivisionImages,
    dataLocatorTextCta,
  } = props;
  const stackCTAProps = config.stackedCTAList.compProps;
  const linkCTAProps = config.linkCTAList.compProps;
  const scrollCTAProps = config.scrollCTAList.compProps;
  const imageCTAProps = config.imageCTAList.compProps;

  let component = Button;
  let compWrapper = '';
  let compProps = {};

  if (buttonListVariation === 'stackedCTAList') {
    compWrapper = 'stack-comp-wrapper';
    compProps = {
      ...stackCTAProps,
      fill,
      buttonsData,
      buttonListVariation,
      dataLocatorTextCta,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'linkCTAList') {
    compWrapper = 'link-comp-wrapper';
    compProps = {
      ...linkCTAProps,
      buttonsData,
      buttonListVariation,
      dataLocatorTextCta,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'scrollCTAList') {
    compWrapper = 'scroll-comp-wrapper';
    compProps = {
      ...scrollCTAProps,
      buttonsData,
      fill,
      buttonListVariation,
      dataLocatorTextCta,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'imageCTAList') {
    compWrapper = 'scroll-comp-wrapper';
    compProps = {
      buttonListVariation,
      dataLocatorDivisionImages,
      dataLocatorTextCta,
      buttonsData,
      ...imageCTAProps,
    };
    component = getImageCTA(compProps);
  }

  return <div className={`${className} ${compWrapper}`}>{component}</div>;
};

ButtonList.defaultProps = {
  buttonListVariation: 'stackedCTA',
  className: '',
  dataLocatorDivisionImages: '',
  dataLocatorTextCta: '',
  fill: '',
};

ButtonList.propTypes = {
  buttonListVariation: PropTypes.string,
  className: PropTypes.string,
  dataLocatorDivisionImages: PropTypes.string,
  dataLocatorTextCta: PropTypes.string,
  fill: PropTypes.string,
};

export default withStyles(ButtonList, ButtonListStyle);
export { ButtonList as VanillaButtonList };
