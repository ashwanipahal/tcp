/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, Col, DamImage, Image, Row } from '../../../atoms';
import { Carousel, Grid, LinkText, PromoBanner } from '../..';
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
    const { className, productTabList, mediaLinkedList, headerText, promoBanner } = this.props;
    const { currentCatId } = this.state;
    const { CAROUSEL_OPTIONS, PROMO_IMG_DATA } = config;
    const data = productTabList ? productTabList[currentCatId] : productTabList;
    return (
      <Grid className={className}>
        <Row fullBleed={{ small: true, medium: true }} className="moduleJ-topview">
          <Col
            className="moduleJ-topbar"
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          />
          <Col
            className="moduleJ-promo-image-left"
            colSize={{
              small: 0,
              medium: 2,
              large: 3,
            }}
            hideCol={{
              small: true,
            }}
          >
            <DamImage
              imgConfigs={PROMO_IMG_DATA.imgConfig}
              imgData={{
                alt: mediaLinkedList[0] && mediaLinkedList[0].image.alt,
                url: mediaLinkedList[0] && mediaLinkedList[0].image.url,
              }}
            />
          </Col>
          <Col
            className="moduleJ-promo"
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <LinkText component="div" headerText={headerText} className="moduleJ-promo-header" />
            <PromoBanner promoBanner={promoBanner} className="moduleJ-promoBanner" />
            <ProductTabList onProductTabChange={this.onTabChange} categoryList={categoryListMock} />
          </Col>
          <Col
            className="moduleJ-promo-image-right"
            colSize={{
              small: 6,
              medium: 2,
              large: 3,
            }}
          >
            <DamImage
              className="moduleJ-promo-img"
              imgConfigs={PROMO_IMG_DATA.imgConfig}
              imgData={{
                alt: mediaLinkedList[1] && mediaLinkedList[1].image.alt,
                url: mediaLinkedList[1] && mediaLinkedList[1].image.url,
              }}
            />
          </Col>
        </Row>
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
            <Anchor noLink to="/c/toddler-girl-bottoms" asPath="/c/toddler-girl-bottoms">
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
  headerText: [],
  productTabList: {},
  mediaLinkedList: [],
  promoBanner: [],
};

ModuleJ.propTypes = {
  className: PropTypes.string,
  productTabList: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      uniqueId: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      seo_token: PropTypes.string,
    }),
  }),
  headerText: PropTypes.arrayOf(PropTypes.shape({})),
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
  promoBanner: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(errorBoundary(ModuleJ), moduleJStyle);
export { ModuleJ as ModuleJVanilla };
