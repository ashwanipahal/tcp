// @flow
import React from 'react';
import { ButtonList } from '../..';
import style from '../ModuleN.style';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
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
              data-locator={getLocator('moduleN_header_text')}
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>
        <ButtonList
          buttonListVariation="stackedCTAList"
          buttonsData={stackedCTAButtons}
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="heading"
              data-locator={getLocator('moduleN_header_text')}
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>
        <ButtonList
          buttonListVariation="scrollCTAList"
          buttonsData={stackedCTAButtons}
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
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
              data-locator={getLocator('moduleN_header_text')}
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>
        <ButtonList
          buttonListVariation="imageCTAList"
          buttonsData={divImageCTACarousel}
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
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
              data-locator={getLocator('moduleN_header_text')}
            />
          )}
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>

        <ButtonList
          buttonListVariation="linkCTAList"
          buttonsData={linkList}
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
      </div>
    </React.Fragment>
  );
};

export default errorBoundary(withStyles(ModuleN, style));
export { ModuleN as ModuleNVanilla };
