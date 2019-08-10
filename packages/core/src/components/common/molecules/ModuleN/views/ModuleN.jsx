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
  className: string,
  headerText: Array,
  promoBanner: Array,
  ctaItems: Array,
  set: Array,
};

// TODO: keys will be changed once we get the actual data from CMS
const ctaTypes = {
  stackedCTAList: 'stackedCTAList',
  linkCTAList: 'linkCTAList',
  scrollCTAList: 'scrollCTAList',
  imageCTAList: 'imageCTAList',
};

const ModuleN = (props: Props) => {
  const {
    className,
    ctaItems,
    headerText,
    promoBanner,
    set: [set = {}],
  } = props;

  const ctaType = ctaTypes[set.val];
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
              className="ModuleN-heading"
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
          buttonListVariation={ctaType}
          buttonsData={ctaItems}
          fill="RED"
          dataLocatorDivisionImages={getLocator('moduleN_image')}
          dataLocatorTextCta={getLocator('moduleN_cta_links')}
        />
      </div>
    </React.Fragment>
  );
};

export default errorBoundary(withStyles(ModuleN, style));
export { ModuleN as ModuleNVanilla };
