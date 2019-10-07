import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import { Row, Col, DamImage, Button } from '../../../atoms';
import {
  LinkText,
  style,
  ColWrapper,
  WORibbonImgContainer,
  RibbonImgContainer,
  RLContainer,
  ButtonContainer,
} from '../ModuleS.style';
import { getLocator, isGymboree } from '../../../../../utils';
import imageCropConfigs from '../ModuleS.config';
import RibbonComponent from '../../Ribbon';

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
 * This function return the image config for each theme.
 * @param {*} promoWrapper
 */
const isGymboreeSite = isGymboree();
const { IMG_DATA_TCP, IMG_DATA_GYM, IMG_DATA_GYM_RIBBON } = imageCropConfigs;
const getImageConfig = ribbonPresent => {
  let imageConfig = IMG_DATA_TCP;
  if (isGymboreeSite) {
    imageConfig = ribbonPresent ? IMG_DATA_GYM_RIBBON : IMG_DATA_GYM;
  }
  console.log(imageConfig.crops);
  return imageConfig.crops;
};
/**
 * This function return the  LinkText component to render the text.
 * @param {*} props
 */
const TextView = props => {
  const { headerText } = props;
  return (
    headerText && (
      <LinkText
        type="heading"
        component="h2"
        headerText={headerText}
        data-locator={getLocator('moduleS_header_text')}
      />
    )
  );
};
/**
 * This function return the  LinkText DamImage to render the image.
 * @param {*} props
 */
const ImgView = props => {
  const { linkedImage } = props;
  const [imageDetails] = linkedImage;
  const imageConfig = getImageConfig();
  return (
    imageDetails && (
      <DamImage
        imgData={imageDetails.image}
        link={imageDetails.link}
        data-locator={getLocator('moduleS_large_img')}
        imgConfigs={imageConfig}
      />
    )
  );
};
/**
 * This function returns the view to be displayed when ribbon is present.
 * @param {*} props
 */
const RibbonView = props => {
  const { singleCTAButton, ribbonBanner } = props;
  return (
    <ColWrapper>
      <TextView {...props} />
      <RibbonImgContainer>
        <ImgView {...props} />
      </RibbonImgContainer>
      <div className="tb-btn-section">
        <RibbonComponent
          width={240}
          height={71}
          ribbonBanner={ribbonBanner}
          locator="moduleS_promo_badge"
        />
        <ButtonContainer>
          <Button
            cta={singleCTAButton}
            buttonVariation="fixed-width"
            className="tb-btn"
            data-locator={getLocator('moduleS_cta_btn')}
          >
            {singleCTAButton.text}
          </Button>
        </ButtonContainer>
      </div>
    </ColWrapper>
  );
};
/**
 * This function returns the view to be displayed when ribbon is not present for TCP and Gymboree Themes.
 * @param {*} props
 */
const WithOutRibbonView = props => {
  const { singleCTAButton } = props;
  return (
    <ColWrapper>
      <WORibbonImgContainer>
        <ImgView {...props} />
      </WORibbonImgContainer>
      <RLContainer>
        <TextView {...props} />
        <ButtonContainer>
          <Button
            cta={singleCTAButton}
            buttonVariation="fixed-width"
            className="rl-button"
            data-locator={getLocator('moduleS_cta_btn')}
          >
            {singleCTAButton.text}
          </Button>
        </ButtonContainer>
      </RLContainer>
    </ColWrapper>
  );
};

/**
 * This function returns Module to display the category banner
 * @param {*} props
 */

const ModuleS = props => {
  const { moduleWidth, className, ribbonBanner } = props;
  const colSize = getColSize(moduleWidth);
  const ribbonPresent = ribbonBanner && ribbonBanner.length > 0;
  return (
    <Row fullBleed className={className}>
      <Col colSize={colSize}>
        {!ribbonPresent && <WithOutRibbonView {...props} />}
        {ribbonPresent && <RibbonView {...props} />}
      </Col>
    </Row>
  );
};
const ModulePropTypes = {
  headerText: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  ribbonBanner: PropTypes.shape({}).isRequired,
  singleCTAButton: PropTypes.shape({}).isRequired,
};
WithOutRibbonView.propTypes = { ...ModulePropTypes };
RibbonView.propTypes = { ...ModulePropTypes };
ModuleS.propTypes = {
  className: PropTypes.string.isRequired,
  ribbonBanner: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))),
  moduleWidth: PropTypes.string,
};

ModuleS.defaultProps = {
  moduleWidth: 'half',
  ribbonBanner: null,
};

export default withStyles(ModuleS, style);
