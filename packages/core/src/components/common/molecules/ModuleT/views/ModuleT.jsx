import React from 'react';
import PropTypes from 'prop-types';

import { Col, DamImage, Row } from '../../../atoms';
import { ButtonList, Grid, LinkText, PromoBanner } from '../..';
import withStyles from '../../../hoc/withStyles';
import moduleTStyle from '../styles/ModuleT.style';
import { getLocator, isGymboree } from '../../../../../utils';
import config from '../moduleT.config';

/**
 * @class ModuleT - global reusable component will display
 * category images and button CTAs so that end customers can directly navigate to the promotes category pages
 * This component is plug and play at any given slot in layout by passing required data
 * @param {ctaItems} ctaItems the list of data for buttons
 * @param {headerText} headerText the list of data for header
 * @param {promoBanner} promoBanner promo banner data
 * @param {mediaLinkedList} mediaLinkedList promo images list
 */
class ModuleT extends React.PureComponent {
  /* This method returns module's Header  */
  getHeader = () => {
    const { headerText } = this.props;
    return (
      headerText && (
        <LinkText
          component="div"
          headerText={headerText}
          className="header"
          headingClass="moduleT-header"
          dataLocator={getLocator('moduleT_header_text')}
        />
      )
    );
  };

  /* This method returns module promo banner  */
  getPromoBanner = () => {
    const { promoBanner } = this.props;
    return (
      promoBanner && (
        <PromoBanner
          promoBanner={promoBanner}
          className="promoBanner"
          dataLocator={getLocator('moduleT_promobanner_text')}
        />
      )
    );
  };

  render() {
    const { className, ctaItems, ctaType, mediaLinkedList } = this.props;
    const { ctaTypes, PROMO_IMG_DATA } = config;
    const promoMediaLinkedList = mediaLinkedList || [];
    const { image: promoImage1, link: promoLink1 } = promoMediaLinkedList[0] || {};
    const { image: promoImage2, link: promoLink2 } = promoMediaLinkedList[1] || {};
    const buttonListCtaType = ctaTypes[ctaType];

    return (
      <Grid className={`${className} moduleT`}>
        <div className="smallOnlyView">
          {this.getHeader()}
          {this.getPromoBanner()}
        </div>
        <Row className="moduleT-promo-wrapper">
          <Col
            className="promo-image-left"
            colSize={{
              small: 3,
              medium: 2,
              large: 3,
            }}
            offsetLeft={{
              small: 0,
              medium: 1,
              large: 1,
            }}
            ignoreGutter={{
              medium: true,
            }}
          >
            {promoImage1 && (
              <DamImage
                imgConfigs={PROMO_IMG_DATA.imgConfig}
                imgData={promoImage1}
                data-locator={`${getLocator('moduleT_promobanner_img')}${1}`}
                link={promoLink1}
              />
            )}
          </Col>
          <Col
            className="header-promo-wrapper"
            colSize={{
              small: 0,
              medium: 2,
              large: 4,
            }}
            hideCol={{
              small: true,
            }}
            ignoreGutter={{
              medium: true,
            }}
          >
            {this.getHeader()}
            {this.getPromoBanner()}
          </Col>
          <Col
            className="promo-image-right"
            colSize={{
              small: 3,
              medium: 2,
              large: 3,
            }}
            offsetRight={{
              small: 0,
              medium: 1,
              large: 1,
            }}
            ignoreGutter={{
              medium: true,
            }}
          >
            {promoImage2 && (
              <DamImage
                imgConfigs={PROMO_IMG_DATA.imgConfig}
                imgData={promoImage2}
                data-locator={`${getLocator('moduleT_promobanner_img')}${2}`}
                link={promoLink2}
              />
            )}
          </Col>
        </Row>
        <div
          className={`button-list-container ${buttonListCtaType} ${
            isGymboree() ? 'gymboree-button-list' : 'tcp-button-list'
          }`}
        >
          {ctaItems && (
            <ButtonList
              buttonsData={ctaItems}
              buttonListVariation={buttonListCtaType}
              dataLocatorDivisionImages={getLocator('moduleT_cta_image')}
              dataLocatorTextCta={getLocator('moduleT_cta_links')}
            />
          )}
        </div>
      </Grid>
    );
  }
}

ModuleT.defaultProps = {
  className: '',
  promoBanner: [],
  mediaLinkedList: [],
};

ModuleT.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
      icon: PropTypes.object,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      textItems: PropTypes.array,
      link: PropTypes.object,
    })
  ),
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  ctaItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ctaType: PropTypes.oneOf(['stackedCTAButtons', 'linkCTAList', 'scrollCTAList', 'imageCTAList'])
    .isRequired,
};

export default withStyles(ModuleT, moduleTStyle);
export { ModuleT as ModuleTVanilla };
