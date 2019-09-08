/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Col, Image, Row } from '../../../atoms';
import { Carousel, Grid } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import moduleJStyle from '../styles/ModuleJ.style';
import { getIconPath, redirectToPdp } from '../../../../../utils';
import config from '../moduleJ.config';

class ModuleJ extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCatId: '',
    };
  }

  onTabChange = catId => {
    this.setState({ currentCatId: catId });
  };

  render() {
    const { className, productTabList } = this.props;
    const { currentCatId } = this.state;
    const { CAROUSEL_OPTIONS } = config;
    const data = productTabList ? productTabList[currentCatId] : productTabList;
    return (
      <Grid className={className}>
        <ProductTabList onProductTabChange={this.onTabChange} categoryList={categoryListMock} />
        <Row>
          <Col
            className="moduleJ__carousel-wrapper"
            colSize={{
              small: 6,
              medium: 8,
              large: 10,
            }}
            offsetLeft={{
              small: 0,
              medium: 0,
              large: 1,
            }}
            offsetRight={{
              small: 0,
              medium: 0,
              large: 1,
            }}
          >
            {data ? (
              <Carousel
                options={CAROUSEL_OPTIONS}
                carouselConfig={{
                  autoplay: false,
                  variation: 'big-arrows',
                  customArrowLeft: getIconPath('carousel-big-carrot'),
                  customArrowRight: getIconPath('carousel-big-carrot'),
                }}
              >
                {data.map(({ uniqueId, imageUrl }, index) => {
                  return (
                    <div key={index.toString()}>
                      <Anchor
                        className="moduleJ-image-link"
                        to={redirectToPdp(uniqueId).url}
                        asPath={redirectToPdp(uniqueId).asPath}
                      >
                        <Image src={imageUrl[0]} />
                      </Anchor>
                    </div>
                  );
                })}
              </Carousel>
            ) : null}
          </Col>
        </Row>
        <Row centered>
          <Col
            colSize={{
              small: 4,
              medium: 2,
              large: 2,
            }}
          >
            <Anchor>
              <Button buttonVariation="fixed-width" className="moduleJ-cta-btn">
                SHOP ALL
              </Button>
            </Anchor>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ModuleJ.defaultProps = {
  className: '',
  productTabList: {},
};

ModuleJ.propTypes = {
  className: PropTypes.string,
  productTabList: PropTypes.shape({}),
};

export default withStyles(errorBoundary(ModuleJ), moduleJStyle);
export { ModuleJ as ModuleJVanilla };
