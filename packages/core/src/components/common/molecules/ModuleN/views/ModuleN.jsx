// @flow
import React from 'react';
import { ButtonList } from '../..';
import style from '../ModuleN.style';
import LinkText from '../../LinkText';
import PromoTextBanner from '../../PromoTextBanner';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

type Props = {
  stackedCTAButtons: Array,
  linkList: Array,
  className: string,
  stackedCTAButtons: Array,
  linkList: Array,
  divImageCTACarousel: Array,
  headerText: Array,
  promoTextBanner: Array,
};

const ModuleN = (props: Props) => {
  const {
    className,
    stackedCTAButtons,
    linkList,
    divImageCTACarousel,
    headerText,
    promoTextBanner,
  } = props;
  return (
    <React.Fragment>
      <div className={`${className} moduleN`}>
        {headerText && (
          <LinkText
            headerText={headerText}
            component="h2"
            type="heading"
            textAlign="center"
            color="white"
          />
        )}
        {promoTextBanner && (
          <PromoTextBanner
            promoTextBanner={promoTextBanner}
            className="moduleN__promo-banner"
            fontSize="fs36"
            color="white"
          />
        )}
        <ButtonList buttonListVariation="stackedCTAList" buttonsData={stackedCTAButtons} />
        <br />
        <ButtonList buttonListVariation="scrollCTAList" buttonsData={stackedCTAButtons} />
        <br />
        <ButtonList buttonListVariation="imageCTAList" buttonsData={divImageCTACarousel} />
        <br />
        <ButtonList buttonListVariation="linkCTAList" buttonsData={linkList} />
        <br />
      </div>
    </React.Fragment>
  );
};

export default errorBoundary(withStyles(ModuleN, style));
export { ModuleN as ModuleNVanilla };
