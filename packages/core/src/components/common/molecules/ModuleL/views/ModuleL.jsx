// @flow
import React from 'react';
import { Anchor, BodyCopy, Col, Image, Row } from '../../../atoms';
import errorBoundary from '../../../hoc/errorBoundary';
import withStyle from '../../../hoc/withStyles';
import { Carousel } from '../..';
import config from '../config';
import ModuleLHeader from './ModuleL.Header';
import style from '../ModuleL.style';

type Props = {
  className: string,
  headerText: Object,
  imageGrid: Array<Object>,
};

const getUrlWithCrop = url => {
  return url.replace('upload/', `upload/c_fill,g_center,h_260,w_210/`);
};

/**
 * @class ModuleL - Global reusable component will display featured content module
 * with image sets of 2 or 4 tiles with each tile having a title, image, and a CTA.
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText : Header data object
 * @param {imageGrid} imageGrid : Slides data in array list
 */
const ModuleL = ({ className, headerText, imageGrid }: Props) => {
  console.log(imageGrid);

  return (
    <Row className={`${className} moduleL`}>
      <Col colSize={{ small: 6, medium: 8, large: 10 }} offsetLeft={{ large: 1 }}>
        <ModuleLHeader headerText={headerText} />
        <Carousel
          options={config.CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: false,
            type: 'light',
            moduleL: true,
          }}
        >
          {imageGrid.map(({ image, link, styled }, index) => {
            return (
              <Row key={index.toString()}>
                <Col colSize={{ small: 6, medium: 8, large: 12 }} className="moduleL__tile">
                  <Image
                    className="moduleL__tile-image"
                    alt={image.alt}
                    src={getUrlWithCrop(image.url)}
                  />
                  <div className="moduleL__tile-text">
                    <BodyCopy
                      component="div"
                      className="moduleL__tile-title"
                      fontFamily={['primary']}
                      fontSize={['fs32']}
                      fontWeight={['regular']}
                      letterSpacing={['ls222']}
                      textAlign="left"
                      color="text.primary"
                    >
                      {styled.text}
                    </BodyCopy>
                    <Anchor withCaret className="moduleL__tile-link">
                      {link.text}
                    </Anchor>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

export default errorBoundary(withStyle(ModuleL, style));
