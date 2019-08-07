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

const getImageCTA = item => {
  const { className, buttonListVariation } = item;
  return (
    <div className={`${config[buttonListVariation].className} div-image-wrapper`}>
      {item.buttonsData.map((data, index) => {
        const { image, link } = data;
        return (
          <div className="img-wrapper">
            <div>
              <Anchor key={index.toString()} link={link}>
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

const getAnchorCTA = compProps => {
  const { className, buttonsData, anchorVariation, fontSizeVariation, underlineColor } = compProps;
  return (
    <div>
      {buttonsData.map((item, index) => {
        return (
          <Anchor
            key={index.toString()}
            className={className}
            anchorVariation={anchorVariation}
            fontSizeVariation={fontSizeVariation}
            underlineColor={underlineColor}
          >
            {item.text}
          </Anchor>
        );
      })}
    </div>
  );
};

const getButtonCTA = data => {
  const { className, buttonsData, buttonListVariation, buttonVariation, ...otherProps } = data;

  return (
    <div component="div" className={config[buttonListVariation].className}>
      {buttonsData.map((item, index) => {
        return (
          <Button
            key={index.toString()}
            className={className}
            buttonVariation={buttonVariation}
            {...otherProps}
          >
            {item.text}
          </Button>
        );
      })}
    </div>
  );
};

/**
 * This component creates a button list
 * This component uses BodyCopy atom to render button
 * @param {*} props
 * accepts all parameters for BodyCopy atom
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
    compProps = {
      ...stackCTAProps,
      buttonsData,
      buttonListVariation,
    };
    component = getButtonCTA(compProps);
  }

  if (buttonListVariation === 'linkCTAList') {
    compProps = {
      ...linkCTAProps,
      buttonsData,
    };
    component = getAnchorCTA(compProps);
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
