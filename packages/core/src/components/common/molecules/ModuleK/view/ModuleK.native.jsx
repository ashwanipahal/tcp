import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-native-snap-carousel';

import Button from '../../../atoms/Button';
import LinkText from '../../LinkText';

import {
  MainWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  BodyCopy,
} from '../ModuleK.style.native';
import { ImageGrid, PromoTextBanner, Carousel } from '../..';

import { UrlHandler, getScreenWidth } from '../../../../../utils/utils.native';

const MODULE_HEIGHT = 260;
const MODULE_WIDTH = 347;

const bodyCopyStyles = {
  style1: props => <BodyCopy fontSize="fs36" fontWeight="black" {...props} />,
  style2: props => <BodyCopy fontSize="fs42" textAlign="center" lineHeight="42px" {...props} />,
  style3: props => (
    <BodyCopy
      fontSize="fs64"
      fontWeight="black"
      color="black"
      lineHeight="64px"
      textAlign="center"
      {...props}
    />
  ),
};

class ModuleK extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }

  getPagination() {
    const { activeSlide } = this.state;
    const {
      data: { masonryGrid = [] },
    } = this.props;
    /* eslint-disable  */
    return (
      <Pagination
        dotsLength={masonryGrid.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 24 }}
        dotContainerStyle={{ marginHorizontal: 4 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          borderColor: '#575757',
          borderWidth: 1,
          backgroundColor: '#ffffff',
        }}
        inactiveDotStyle={{
          backgroundColor: '#575757',
          width: 6,
          height: 6,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
    // eslint-enable
  }

  /**
   * @function renderCarouselSlide : renders module K Images.
   * @param {Object} item : Grid image object which has keys mediaList, promoTextBanner, SingleCTAButton.
   * @return {Node} : Returns Image element.
   */
  renderCarouselSlide = ({ item, index }) => {
    const { mediaList, slideIndex, promoTextBanner, singleCTAButton } = item;

    return (
      <>
        {promoTextBanner && (
          <PromoTextBannerWrapper>
            <PromoTextBanner
              dataLocator={`moduleK_promobanner_text_${slideIndex}`}
              promoTextBanner={promoTextBanner}
              bodyCopyStyles={bodyCopyStyles}
            />
          </PromoTextBannerWrapper>
        )}
        <ImageGrid dataLocator={`moduleK_image_${slideIndex}`} data={mediaList} />
        {singleCTAButton && (
          <WrapperView width={getScreenWidth() - 20}>
            <Button
              width="225px"
              height="42px"
              buttonVariation="variable-width"
              text={singleCTAButton.text || `Shop Now`}
              dataLocator={`moduleK_button_set_${slideIndex}`}
              onPress={() => UrlHandler(singleCTAButton.url)}
            />
          </WrapperView>
        )}
      </>
    );
  };

  render() {
    const {
      props: { data },
    } = this;

    const [headerText] = data.headerText;
    const { outerPromoTextBanner, masonryGrid, autoplayInterval } = data;
    let indexedMasonryGrid = masonryGrid.map((item, i) => {
      item.slideIndex = i;
      return item;
    });

    return (
      <MainWrapper>
        {headerText && (
          <LinkText
            textItems={headerText.textItems}
            link={headerText.link}
            fontSize="fs36"
            fontWeight="black"
            textAlign="center"
            dataLocator="moduleK_header_text"
            onPress={() => UrlHandler(headerText.link.url)}
          />
        )}
        {outerPromoTextBanner && (
          <PromoTextBanner
            dataLocator="moduleK_outerPromoBanner_text"
            promoTextBanner={outerPromoTextBanner}
            bodyCopyStyles={bodyCopyStyles}
          />
        )}
        <Carousel
          data={indexedMasonryGrid}
          renderItem={this.renderCarouselSlide}
          height={MODULE_HEIGHT}
          width={MODULE_WIDTH}
          carouselConfig={{
            autoplay: false,
          }}
          hidePlayStopButton
          defaultAutoplay={false}
          autoplayInterval={autoplayInterval * 1000}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        {this.getPagination()}
      </MainWrapper>
    );
  }
}

ModuleK.defaultProps = {
  data: {
    autoplayInterval: 2,
    headerText: [
      {
        textItems: [
          {
            text: 'UNICORNS',
            style: 'style1',
          },
          {
            text: ', DINOS & MORE!',
            style: 'style1',
          },
        ],
        link: {
          url: 'http://google.com/',
          text: 'example',
          title: 'example',
          target: '_blank',
        },
      },
    ],
    // outerPromoTextBanner: [
    //   {
    //     textItems: [
    //       {
    //         style: 'style2',
    //         text: 'ALL DINOS',
    //       },
    //       {
    //         style: 'style3',
    //         text: '100% OFF',
    //       },
    //     ],
    //   },
    // ],

    promoTextBanner: [
      {
        textItems: [
          {
            style: 'style2',
            text: 'ALL DINOS',
          },
          {
            style: 'style3',
            text: '100% OFF',
          },
        ],
      },
    ],

    masonryGrid: [
      {
        mediaList: [
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-1_s0jewf.jpg',
            title: 'Image Title attribute value',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-2_cpjda2.jpg',
            title: '2222',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-3_tlamd0.jpg',
            title: '33333',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-4_com7vo.jpg',
            title: '4444444',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
        ],
        promoBanner: null,
        promoTextBanner: [
          {
            textItems: [
              {
                text: 'ALL DINOS',
                style: 'style2',
                __typename: 'StyledText',
              },
              {
                text: '50% OFF',
                style: 'style3',
                __typename: 'StyledText',
              },
            ],
            linkClass: {
              class: '',
              __typename: 'LinkClass',
            },
            __typename: 'PromoTextBanner',
          },
        ],
        mediaLinkedList: null,
        singleCTAButton: {
          url: 'https://www.bing.com',
          text: 'SHOP NOW',
          title: '',
          target: '',
          external: 0,
          __typename: 'Button',
        },
        __typename: 'MasonryGridItem',
      },
      {
        mediaList: [
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-3_tlamd0.jpg',
            title: 'Image Title attribute value',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-4_com7vo.jpg',
            title: 'Image Title attribute value 3',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-1_s0jewf.jpg',
            title: 'Image Title attribute value 4',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562935881/ecom/assets/content/tcp/us/home/moduleK/K-210x210-2_cpjda2.jpg',
            title: 'sssssswww',
            alt: '',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
        ],
        promoBanner: null,
        promoTextBanner: [
          {
            textItems: [
              {
                text: 'ALL DINOS',
                style: 'style2',
                __typename: 'StyledText',
              },
              {
                text: '100% OFF',
                style: 'style3',
                __typename: 'StyledText',
              },
            ],
            linkClass: {
              class: '',
              __typename: 'LinkClass',
            },
            __typename: 'PromoTextBanner',
          },
        ],
        mediaLinkedList: null,
        singleCTAButton: {
          url: 'http://www.childrensplace.com',
          text: 'SHOP NOW',
          title: '',
          target: '',
          external: 0,
          __typename: 'Button',
        },
        __typename: 'MasonryGridItem',
      },
    ],
  },
};

ModuleK.propTypes = {
  data: PropTypes.shape({
    headerText: PropTypes.array,
    outerPromoTextBanner: PropTypes.array,
    promoTextBanner: PropTypes.array,
    masonryGrid: PropTypes.array,
    autoplayInterval: PropTypes.number, // 2 means 2 seconds
  }),
};

export default ModuleK;
