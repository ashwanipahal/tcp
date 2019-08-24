// @flow
import React from 'react';
import { Col, Row } from '../../../atoms';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import { Carousel, LinkText, PromoBanner } from '../..';
import { getIconPath, getLocator } from '../../../../../utils';
import config from '../config';
import ModuleLTile from './ModuleL.Tile';
import style from '../ModuleL.style';

type Props = {
  className: string,
  headerText: Array<Object>,
  imageGrid: Array<Object>,
  set: Array<Object>,
  promoBanner: Array<Object>,
};

/**
 * @function renderTiles - rendering tiles inside component.
 * @param {tiles} tiles : tiles data in an array format.
 * @return {node} : returns tile element.
 */
const renderTiles = tiles => {
  return tiles.map((tile, index) => {
    return (
      <ModuleLTile key={index.toString()} index={index} tileData={tile} tileColor={tile.class} />
    );
  });
};

/**
 * @class ModuleL - Global reusable component will display featured content module
 * with image sets of 2 or 4 tiles with each tile having a title, image, and a CTA.
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText : Header data object
 * @param {imageGrid} imageGrid : Slides data in array list
 */
const ModuleL = ({
  className,
  headerText,
  imageGrid,
  set: [{ val: imagesPerSlide }],
  promoBanner,
}: Props) => {
  const options = config.CAROUSEL_OPTIONS;
  options.prevArrow = (
    <button type="button" data-locator="moduleL_left_arrow" className="slick-prev" />
  );
  options.nextArrow = (
    <button type="button" data-locator="moduleL_right_arrow" className="slick-prev" />
  );
  const checkPromo = promoBanner && promoBanner.length;
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
        {headerText && (
          <LinkText
            headerText={headerText}
            headingClass="moduleL__header"
            component="h2"
            type="heading"
            textAlign="center"
            dataLocator={getLocator('moduleL_header_text')}
            promo={checkPromo}
          />
        )}
        {checkPromo && (
          <PromoBanner
            promoBanner={promoBanner}
            className="moduleL__promo-banner"
            fontSize="fs48"
            data-locator={getLocator('moduleL_promobanner_text')}
          />
        )}
        <Carousel
          options={options}
          carouselConfig={{
            type: 'light',
            autoplay: false,
            moduleL: true,
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {renderTiles(imageGrid)}
        </Carousel>
        <div className="moduleL__mobile-web-container">{renderTiles(imageGrid)}</div>
      </Col>
    </Row>
  );
};

export default withStyles(errorBoundary(ModuleL), style);
export { ModuleL as ModuleLVanilla };
