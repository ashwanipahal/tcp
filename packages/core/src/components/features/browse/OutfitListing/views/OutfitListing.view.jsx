import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy, Image, Anchor } from '../../../../common/atoms';
import { Carousel } from '../../../../common/molecules';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitListingStyle from '../OutfitListing.style';
import GlobalNavigationMenuDesktopL2 from '../../ProductListing/molecules/GlobalNavigationMenuDesktopL2/views';
import FixedBreadCrumbs from '../../ProductListing/molecules/FixedBreadCrumbs/views';
import ReadMore from '../../ProductListing/molecules/ReadMore/views';
import SpotlightContainer from '../../ProductListing/molecules/Spotlight/container/Spotlight.container';
import OutfitTileSection from '../OutfitTileSection.view';
import ButtonTabs from '../../../../common/molecules/ButtonTabs';
import { routerPush, getIconPath } from '../../../../../utils';
import theme from '../../../../../../styles/themes/TCP';

const { breakpoints } = theme;

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
  centerMode: false,
  centerPadding: '0px',
  fade: false,
  speed: 1000,
  lazyLoad: false,
  dots: false,
  swipe: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: parseInt(breakpoints.medium, 10) - 1,
      settings: {
        slidesToShow: 2,
        arrows: false,
        swipeToSlide: true,
        centerPadding: '18%',
      },
    },
    {
      breakpoint: parseInt(breakpoints.large, 10) - 1,
      settings: {
        slidesToShow: 4,
        arrows: false,
        swipeToSlide: true,
        centerPadding: '13%',
      },
    },
  ],
};

const onTabChange = url => {
  console.log('on tab change ', url);
  routerPush(url && url.replace('/c/', '/c?cid='), url, { shallow: true });
};
const OutfitListingView = ({
  className,
  labels,
  // eslint-disable-next-line no-unused-vars
  outfitDetails, // TODO: with Outfit lisiting functional story
  breadCrumbs,
  navTree,
  currentNavIds,
  longDescription,
  categoryId,
  asPath,
  divisionTab,
  outfitModule,
}) => {
  return (
    <>
      <div className={className}>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area-0">{labels.lbl_outfit_title}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <Carousel
              options={CAROUSEL_OPTIONS}
              carouselConfig={{
                autoplay: false,
                variation: 'big-arrows',
                customArrowLeft: getIconPath('carousel-big-carrot'),
                customArrowRight: getIconPath('carousel-big-carrot'),
              }}
            >
              {outfitModule.composites.mediaLinkedList.map(({ image, link }, index) => {
                return (
                  <div key={index.toString()}>
                    <Anchor
                      className="image-link"
                      to={image.url}
                      asPath={image.url}
                      dataLocator="dummy-datalocator"
                    >
                      <Image alt={image.title} src={image.url} />
                    </Anchor>
                    <Anchor
                      className="image-link"
                      to={link.url}
                      asPath={link.url}
                      dataLocator="dummy-datalocator"
                    >
                      {link.text}
                    </Anchor>
                  </div>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <BodyCopy
            className={className}
            fontSize="fs22"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {divisionTab.composites.headLine[0].text}
          </BodyCopy>
          <ButtonTabs
            selectedTabId="0"
            onTabChange={onTabChange}
            tabs={divisionTab.composites.buttonList}
            dataLocator=""
          />
        </Row>
      </div>
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="bread-crumb">
              <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col hideCol={{ small: true, medium: true }} colSize={{ small: 6, medium: 8, large: 2 }}>
            <div className="sidebar">
              <GlobalNavigationMenuDesktopL2
                navigationTree={navTree}
                activeCategoryIds={currentNavIds}
              />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 10 }}>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <OutfitTileSection asPath={asPath} labels={labels} outfitDetails={outfitDetails} />
              {/* <ProductsGrid productsBlock={productsBlock} labels={labels} {...otherProps} /> */}
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <ReadMore
                description={longDescription}
                labels={labels}
                className={`${className} seo-text`}
              />
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <SpotlightContainer categoryId={categoryId} />
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

OutfitListingView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  outfitDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  categoryId: PropTypes.string,
  asPath: PropTypes.string,
  divisionTab: PropTypes.shape({}),
  outfitModule: PropTypes.shape({}),
  jeansModule: PropTypes.shape({}),
};

OutfitListingView.defaultProps = {
  className: '',
  labels: {},
  breadCrumbs: [],
  navTree: {},
  currentNavIds: [],
  longDescription: '',
  categoryId: '',
  asPath: '',
  divisionTab: {},
  outfitModule: {},
  jeansModule: {},
};

export default withStyles(OutfitListingView, OutfitListingStyle);
