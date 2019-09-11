/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Button, BodyCopy, Col, DamImage, Image, Row } from '../../../atoms';
import { Carousel, Grid, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import moduleJStyle from '../styles/ModuleJ.style';
import { getIconPath, redirectToPdp } from '../../../../../utils';
import config from '../moduleJ.config';

const promoBanner = [
  {
    link: {
      url: 'http://example.com',
      title: '',
      target: '',
      external: 0,
    },
    textItems: [
      {
        text: 'ALL TEES',
        style: 'moduleJ_text_semibold',
      },
      {
        text: '60% OFF',
        style: 'moduleJ_text_black',
      },
    ],
  },
];

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
    const { CAROUSEL_OPTIONS, PROMO_IMG_DATA } = config;
    const data = productTabList ? productTabList[currentCatId] : productTabList;
    return (
      <Grid className={className}>
        <Row className="moduleJ-topview">
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
              large: 4,
            }}
          >
            <DamImage
              imgConfigs={PROMO_IMG_DATA.imgConfig}
              imgData={{
                alt: 'promo image 1',
                url:
                  'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1567711647/ecom/assets/content/gym/us/home/modA/SUM1_GROUP_0881_revised_3x_vntfz2.png',
              }}
            />
          </Col>
          <Col
            className="moduleJ-promo"
            colSize={{
              small: 6,
              medium: 4,
              large: 4,
            }}
            hideCol={{
              small: true,
            }}
          >
            <BodyCopy
              className="moduleJ-header-text1"
              color="gray.900"
              component="div"
              fontFamily="primary"
              fontSize="fs20"
              textAlign="center"
            >
              Every Length, Style, Color & Size
            </BodyCopy>
            <BodyCopy
              className="moduleJ-header-text2"
              color="gray.900"
              component="div"
              fontFamily="primary"
              fontSize="fs48"
              fontWeight="black"
              textAlign="center"
            >
              THE SHORT SHOP
            </BodyCopy>
            <PromoBanner promoBanner={promoBanner} className="moduleJ-promoBanner" />
            <ProductTabList onProductTabChange={this.onTabChange} categoryList={categoryListMock} />
          </Col>
          <Col
            className="moduleJ-promo-image-right"
            colSize={{
              small: 0,
              medium: 2,
              large: 4,
            }}
            hideCol={{
              small: true,
            }}
          >
            <DamImage
              imgConfigs={PROMO_IMG_DATA.imgConfig}
              imgData={{
                alt: 'promo image 2',
                url:
                  'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1565145744/mod-h-kids_b9ivyr.png',
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
  productTabList: {},
};

ModuleJ.propTypes = {
  className: PropTypes.string,
  productTabList: PropTypes.shape({}),
};

export default withStyles(errorBoundary(ModuleJ), moduleJStyle);
export { ModuleJ as ModuleJVanilla };
