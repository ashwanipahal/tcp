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
  const { className, buttonListVariation } = item;
  return (
    <div className={`${config[buttonListVariation].className} div-image-wrapper`}>
      {item.buttonsData.map((data, index) => {
        const { image, link } = data;
        return (
          <div className="img-wrapper">
            <div>
              <Anchor
                key={index.toString()}
                link={item.link}
                href={item.url}
                target={item.target}
                title={item.title}
                fontSizeVariation="large"
                fontWeightVariation="active"
              >
                <DamImage imgData={image} className={className} />
                <div className="image-comp">{link.text}</div>
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
  const { className, buttonsData, buttonListVariation, buttonVariation, ...otherProps } = data;

  return buttonsData.map((item, index) => {
    return (
      <Anchor
        className={className}
        href={item.url}
        link={item.link}
        target={item.target}
        title={item.title}
      >
        <Button
          className={`${config[buttonListVariation].className}-class`}
          key={index.toString()}
          buttonVariation={buttonVariation}
          {...otherProps}
        >
          {item.text}
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
  const { buttonsData, buttonListVariation, className } = props;
  const stackCTAProps = config.stackedCTAList.compProps;
  const linkCTAProps = config.linkCTAList.compProps;
  const scrollCTAProps = config.scrollCTAList.compProps;
  const imageCTAProps = config.imageCTAList.compProps;

  let component = Button;
  let compWrapper = '';
  let compProps = {
    buttonVariation: 'fixed-width',
  };

  if (buttonListVariation === 'stackedCTAList') {
    compWrapper = 'stack-comp-wrapper';
    compProps = {
      ...stackCTAProps,
      buttonsData,
      buttonListVariation,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'linkCTAList') {
    compWrapper = 'link-comp-wrapper';
    compProps = {
      ...linkCTAProps,
      buttonsData,
      buttonListVariation,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'scrollCTAList') {
    compWrapper = 'scroll-comp-wrapper';
    compProps = {
      ...scrollCTAProps,
      buttonsData,
      buttonListVariation,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'imageCTAList') {
    compWrapper = 'scroll-comp-wrapper';
    compProps = { buttonListVariation, buttonsData, ...imageCTAProps };
    component = getImageCTA(compProps);
  }

  return <div className={`${className} ${compWrapper}`}>{component}</div>;
};

ButtonList.defaultProps = {
  buttonListVariation: 'stackedCTA',
  className: '',
};

ButtonList.propTypes = {
  buttonListVariation: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(ButtonList, ButtonListStyle);
export { ButtonList as VanillaButtonList };
