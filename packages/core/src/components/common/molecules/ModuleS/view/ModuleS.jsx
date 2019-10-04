import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import { Row, Col, DamImage, Button } from '../../../atoms';
import { LinkText, style } from '../ModuleS.style';
import { PromoBanner } from '../..';
import { getLocator, isGymboree } from '../../../../../utils';
import config from '../ModuleS.config';

/**
 * This function returns column size for grid on the basis of moduleWidth param
 * @param {*} moduleWidth
 */
const getColSize = moduleWidth => {
  const colSize = {
    small: 6,
    medium: 8,
    large: 12,
  };
  if (moduleWidth === 'half') {
    colSize.large = 6;
  }
  return colSize;
};
/**
 * This function returns whether the ribbon has to be left aligned or right.
 * @param {*} promoWrapper
 */
const getRibbonPosition = promoWrapper => {
  const [ribbonDetails] = promoWrapper;
  return ribbonDetails.ribbonPlacement === 'left';
};

/**
 * This function return the image config for each theme.
 * @param {*} promoWrapper
 */
const isGymboreeSite = isGymboree();
const { IMG_DATA_TCP, IMG_DATA_GYM, IMG_DATA_GYM_RIBBON } = config;
const getImageConfig = ribbonPresent => {
  let imageConfig = IMG_DATA_TCP;
  if (isGymboreeSite) {
    imageConfig = ribbonPresent ? IMG_DATA_GYM_RIBBON : IMG_DATA_GYM;
  }
  return imageConfig;
};

const ModuleS = props => {
  const { moduleWidth, linkedImage, headerText, singleCTAButton, className, ribbonBanner } = props;
  const colSize = getColSize(moduleWidth);
  const ribbonPresent = ribbonBanner && ribbonBanner.length > 0;
  const isRibbonLeftAligned = ribbonPresent && getRibbonPosition(ribbonBanner);
  const [imageDetails] = linkedImage;
  const imageConfig = getImageConfig();
  return (
    <Row
      fullBleed
      className={`${className} ${
        ribbonPresent && isRibbonLeftAligned ? 'left-aligned-ribbon' : ''
      }`}
    >
      <Col colSize={colSize}>
        {/** Variation  1 Start Here */}
        {!ribbonPresent && (
          <div className="col-wrapper innerPadding">
            <div className="img-container">
              <DamImage
                imgData={imageDetails.image}
                link={imageDetails.link}
                data-locator={getLocator('moduleS_large_img')}
                imgConfigs={imageConfig}
              />
            </div>
            <div className="rl-variation">
              {headerText && (
                <LinkText
                  type="heading"
                  component="h2"
                  headerText={headerText}
                  data-locator={getLocator('moduleS_header_text')}
                />
              )}
              <Button
                cta={singleCTAButton}
                buttonVariation="fixed-width"
                className="rl-button"
                data-locator={getLocator('moduleS_cta_btn')}
              >
                {singleCTAButton.text}
              </Button>
            </div>
          </div>
        )}
        {/** Variation  1 Ends Here */}

        {/** Variation  2 starts Here */}
        {ribbonPresent && (
          <div className="col-wrapper innerPadding">
            <div className="tb-variation">
              {headerText && (
                <LinkText
                  type="heading"
                  component="h2"
                  headerText={headerText}
                  data-locator={getLocator('moduleS_header_text')}
                />
              )}
              <div className="img-container">
                <DamImage
                  imgData={imageDetails.image}
                  link={imageDetails.link}
                  data-locator={getLocator('moduleS_large_img')}
                  imgConfigs={imageConfig}
                />
              </div>
              <div className="tb-variation-btn-section">
                <div className="ribbon-wrapper">
                  <div className="ribbon-container">
                    <PromoBanner
                      promoBanner={ribbonBanner}
                      data-locator={getLocator('moduleS_promo_badge')}
                    />
                  </div>
                </div>
                <Button
                  cta={singleCTAButton}
                  buttonVariation="fixed-width"
                  className="tb-variation-btn"
                  data-locator={getLocator('moduleS_cta_btn')}
                >
                  {singleCTAButton.text}
                </Button>
              </div>
            </div>
          </div>
        )}
        {/** Variation 2 Ends Here */}
      </Col>
    </Row>
  );
};
ModuleS.propTypes = {
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  linkedImage: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  singleCTAButton: PropTypes.objectOf(PropTypes.shape({})).isRequired,
  ribbonBanner: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))),
  moduleWidth: PropTypes.string,
};

ModuleS.defaultProps = {
  moduleWidth: 'half',
  ribbonBanner: null,
};

export default withStyles(ModuleS, style);
