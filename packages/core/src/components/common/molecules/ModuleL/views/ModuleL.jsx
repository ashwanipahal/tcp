// @flow
import React from 'react';
import { Col, Row } from '../../../atoms';
import errorBoundary from '../../../hoc/errorBoundary';
import { Carousel } from '../..';
import config from '../config';

type Props = {
  headerText: Object,
  imageGrid: Array<Object>,
};

/**
 * @class ModuleL - Global reusable component will display featured content module
 * with image sets of 2 or 4 tiles with each tile having a title, image, and a CTA.
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText : Header data object
 * @param {imageGrid} imageGrid : Slides data in array list
 */
const ModuleL = ({ headerText, imageGrid }: Props) => {
  console.log(headerText);
  console.log(imageGrid);

  return (
    <Row>
      <Col colSize={{ small: 6, medium: 8, large: 12 }}>
        <Carousel
          options={config.CAROUSEL_OPTIONS}
          carouselConfig={{ autoplay: false, type: 'light' }}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default errorBoundary(ModuleL);
