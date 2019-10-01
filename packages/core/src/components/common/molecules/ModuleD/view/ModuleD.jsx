import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Col, DamImage, Row } from '../../../atoms';
import { Grid, LinkText, PromoBanner } from '../..';
import config from '../config';
import { getLocator } from '../../../../../utils';
import style from '../ModuleD.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';

const colSize2Elements = {
  small: 3,
  medium: 3,
  large: 4,
};

const colSize4Elements = {
  small: 3,
  medium: 2,
  large: 3,
};

const colSize6Elements = {
  small: 3,
  medium: 3,
  large: 2,
};

const ignoreGutter = [
  {},
  { small: true },
  {},
  { small: true, medium: true },
  {},
  { small: true, medium: true },
];

const ModuleD = ({ className, headerText, promoBanner, smallCompImage, singleCTAButton }) => {
  let colSize;
  let imgDataConfig;
  const checkPromo = promoBanner && promoBanner.length;

  if (smallCompImage && smallCompImage.length === 2) {
    colSize = colSize2Elements;
    imgDataConfig = config.IMG_DATA_2.imgConfig;
  } else if (smallCompImage && smallCompImage.length === 4) {
    colSize = colSize4Elements;
    imgDataConfig = config.IMG_DATA_4.imgConfig;
  } else {
    colSize = colSize6Elements;
    imgDataConfig = config.IMG_DATA_6.imgConfig;
  }
  return (
    <Grid className={`${className} moduleD`}>
      {headerText && (
        <LinkText
          headerText={headerText}
          headingClass="moduleD_header"
          component="h2"
          type="heading"
          textAlign="center"
          dataLocator="moduleD_headerlink"
          promo={checkPromo}
        />
      )}
      {checkPromo && (
        <PromoBanner
          promoBanner={promoBanner}
          className="moduleD__promo-banner"
          fontSize="fs48"
          data-locator={getLocator('moduleD_promobanner')}
        />
      )}
      <Row centered>
        {smallCompImage &&
          smallCompImage.map((item, index) => {
            return (
              item.link && (
                <Col
                  key={index.toString()}
                  colSize={colSize}
                  ignoreGutter={ignoreGutter[index]}
                  className="moduleD_tile"
                >
                  <div className="moduleD__image-container">
                    <DamImage
                      className="moduleD_image"
                      dataLocator={`${getLocator('moduleD_image')}${index + 1}`}
                      imgConfigs={imgDataConfig}
                      imgData={item.image}
                      link={{
                        className: 'moduleD_textlink',
                        ...item.link,
                      }}
                    />
                  </div>
                  <div className="moduleD_link">
                    <Anchor
                      withCaret
                      centered
                      className="moduleD_textlink"
                      to={item.link.url}
                      target={item.link.target}
                      title={item.link.title}
                      dataLocator={`${getLocator('moduleD_textlink')}${index + 1}`}
                    >
                      {item.link.text}
                    </Anchor>
                  </div>
                </Col>
              )
            );
          })}
      </Row>
      {singleCTAButton && (
        <Row centered>
          <Button
            buttonVariation="fixed-width"
            className="moduleD_button"
            data-locator={getLocator('moduleD_button')}
            cta={singleCTAButton}
          >
            {singleCTAButton.text}
          </Button>
        </Row>
      )}
    </Grid>
  );
};

ModuleD.defaultProps = {
  promoBanner: [],
  singleCTAButton: {},
};

ModuleD.propTypes = {
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.object,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.object,
    })
  ),
  smallCompImage: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      image: PropTypes.object,
    })
  ).isRequired,
  singleCTAButton: PropTypes.objectOf(PropTypes.shape({})),
};

export default withStyles(errorBoundary(ModuleD), style);
export { ModuleD as ModuleDVanilla };
