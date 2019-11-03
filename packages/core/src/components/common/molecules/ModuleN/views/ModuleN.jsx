import React from 'react';
import PropTypes from 'prop-types';
import { ButtonList } from '../..';
import style from '../ModuleN.style';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
import withStyles from '../../../hoc/withStyles';
import { Row, Col } from '../../../atoms';
import { ctaTypeProps, config } from '../config';
import errorBoundary from '../../../hoc/withErrorBoundary';

const { ctaTypes } = config;

const getButtonListVariationProps = ctaType => {
  const buttonTypeProps = {
    ...ctaTypeProps,
  };
  return buttonTypeProps[ctaType];
};

const getMappedPromoBanner = promoBanner => {
  const promoTexts = promoBanner ? promoBanner[0] : { textItems: [] };
  return promoTexts.textItems.map(item => {
    return { ...promoTexts, textItems: [item] };
  });
};

const ModuleN = props => {
  const { className, ctaItems, headerText, promoBanner, ctaType, expandableTitle } = props;

  const buttonListProps = getButtonListVariationProps(ctaType);
  let dualVariation = null;
  const isDropDown =
    ctaType === 'stackedCTAButtonsExpandable' || ctaType === 'CTAButtonCarouselExpandable';
  if (isDropDown) {
    dualVariation = ctaItems.length < 3 ? null : buttonListProps.dualVariation;
  }
  const mappedPromoBanner = getMappedPromoBanner(promoBanner);

  return (
    <Row
      className={`${className} moduleN`}
      fullBleed={{ small: true, medium: true, large: true }}
      data-locator={getLocator('moduleN_promobanner_img')}
    >
      <Col
        className="moduleN-innerContent"
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        <div className="heading-wrapper">
          {headerText && (
            <LinkText
              headerText={headerText}
              component="h3"
              textAlign="center"
              type="heading"
              color="white"
              className="ModuleN-heading"
              dataLocator={getLocator('moduleN_header_text')}
            />
          )}
          {mappedPromoBanner && mappedPromoBanner[0] && (
            <PromoBanner
              promoBanner={[mappedPromoBanner[0]]}
              className="moduleN__promo-banner"
              color="white"
              data-locator={getLocator('moduleN_promobanner_text')}
            />
          )}
        </div>
        {mappedPromoBanner && mappedPromoBanner[1] && (
          <PromoBanner
            promoBanner={[mappedPromoBanner[1]]}
            className="moduleN__promo-banner"
            color="white"
            data-locator={getLocator('moduleN_promobanner_text')}
          />
        )}
        <div className="ModuleN_Button">
          <ButtonList
            buttonListVariation={ctaTypes[ctaType]}
            buttonsData={ctaItems}
            fill="RED"
            dataLocatorDivisionImages={getLocator('moduleN_image')}
            dataLocatorDropDown={getLocator('moduleN_dropdown')}
            dropdownLabel={expandableTitle}
            dataLocatorTextCta={getLocator('moduleN_cta_links')}
            dualVariation={isDropDown ? dualVariation : undefined}
          />
        </div>
      </Col>
    </Row>
  );
};

ModuleN.defaultProps = {
  className: '',
  ctaItems: [],
  headerText: [],
  promoBanner: [],
  ctaType: 'stackedCTAButtons',
  expandableTitle: '',
};

ModuleN.propTypes = {
  className: PropTypes.string,
  ctaItems: PropTypes.arrayOf(PropTypes.shape({})),
  headerText: PropTypes.arrayOf(PropTypes.shape({})),
  promoBanner: PropTypes.arrayOf(PropTypes.shape({})),
  ctaType: PropTypes.string,
  expandableTitle: PropTypes.string,
};

export default withStyles(errorBoundary(ModuleN), style);
export { ModuleN as ModuleNVanilla };
