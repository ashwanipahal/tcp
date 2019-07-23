// @flow
import React from 'react';
import { Col, Row } from '../../../atoms';
import errorBoundary from '../../../hoc/errorBoundary';
import withStyle from '../../../hoc/withStyles';
import { Carousel, PromoTextBanner } from '../..';
import { getLocator } from '../../../../../utils';
import config from '../config';
import ModuleLHeader from './ModuleL.Header';
import ModuleLTile from './ModuleL.Tile';
import style from '../ModuleL.style';

type Props = {
  className: string,
  headerText: Object,
  imageGrid: Array<Object>,
  imagesPerSlide: string,
  promoTextBanner: Object,
};

/**
 * @function renderTiles - rendering tiles inside component.
 * @param {tiles} tiles : tiles data in an array format.
 * @return {node} : returns tile element.
 */
const renderTiles = tiles => {
  return tiles.map((tile, index) => {
    return <ModuleLTile key={index.toString()} index={index} tileData={tile} />;
  });
};

/**
 * @class ModuleL - Global reusable component will display featured content module
 * with image sets of 2 or 4 tiles with each tile having a title, image, and a CTA.
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText : Header data object
 * @param {imageGrid} imageGrid : Slides data in array list
 */
const ModuleL = ({ className, headerText, imageGrid, imagesPerSlide, promoTextBanner }: Props) => {
  const options = config.CAROUSEL_OPTIONS;
  if (parseInt(imagesPerSlide, 10) === 4) {
    options.rows = 2;
  }

  return (
    <Row
      className={`${className} moduleL`}
      fullBleed={{
        small: true,
        medium: true,
        large: true,
      }}
    >
      <Col colSize={{ small: 6, medium: 8, large: 10 }} offsetLeft={{ large: 1 }}>
        <ModuleLHeader headerText={headerText} />
        {promoTextBanner && (
          <PromoTextBanner
            {...promoTextBanner}
            className="moduleL__promo-banner"
            fontSize="fs48"
            data-locator={getLocator('module_L_promobanner_text')}
          />
        )}
        <Carousel
          options={options}
          carouselConfig={{
            autoplay: false,
            type: 'light',
            moduleL: true,
          }}
        >
          {renderTiles(imageGrid)}
        </Carousel>
        <div className="moduleL__mobile-web-container">{renderTiles(imageGrid)}</div>
      </Col>
    </Row>
  );
};

export default errorBoundary(withStyle(ModuleL, style));
export { ModuleL as ModuleLVanilla };
