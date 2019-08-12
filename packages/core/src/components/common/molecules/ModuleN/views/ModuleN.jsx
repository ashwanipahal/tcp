// @flow
import React from 'react';
import { ButtonList } from '../..';
import style from '../ModuleN.style';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

type Props = {
  stackedCTAButtons: Array,
  linkList: Array,
  className: string,
  divImageCTACarousel: Array,
  headerText: Array,
  promoBanner: Array,
};

const ModuleN = (props: Props) => {
  const {
    className,
    stackedCTAButtons,
    linkList,
    divImageCTACarousel,
    headerText,
    promoBanner,
  } = props;

  return (
    <React.Fragment>
      <div className={`${className} moduleN`}>
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="heading"
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
            />
          )}
        </div>
        <ButtonList buttonListVariation="stackedCTAList" buttonsData={stackedCTAButtons} />
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="heading"
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
            />
          )}
        </div>
        <ButtonList buttonListVariation="scrollCTAList" buttonsData={stackedCTAButtons} />
        <div className="separator">.</div>
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="heading"
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
            />
          )}
        </div>
        <ButtonList buttonListVariation="imageCTAList" buttonsData={divImageCTACarousel} />
        <div className="separator">.</div>
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="heading"
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
            />
          )}
        </div>
        <ButtonList buttonListVariation="linkCTAList" buttonsData={linkList} />
      </div>
    </React.Fragment>
  );
};

export default errorBoundary(withStyles(ModuleN, style));
export { ModuleN as ModuleNVanilla };
