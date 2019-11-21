import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import GuestLoginOverview from '@tcp/core/src/components/features/account/common/molecule/GuestLoginModule';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';

import { ModalViewWrapper } from '@tcp/core/src/components/features/account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import { BodyCopy, DamImage, Anchor } from '../../../atoms';
import Carousel from '../../Carousel';

import {
  getScreenWidth,
  LAZYLOAD_HOST_NAME,
  getValueFromAsyncStorage,
  setValueInAsyncStorage,
} from '../../../../../utils/index.native';

import {
  Container,
  TextCarouselWrapper,
  ButtonsWrapper,
} from '../styles/UserOnboardingScreen.style.native';
import config from '../UserOnboardingScreen.config';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */
const HERO_CAROUSEL_MODULE_HEIGHT = 317;
const CAROUSEL_MODULE_WIDTH = getScreenWidth();

const { IMG_DATA, CAROUSEL_OPTIONS } = config;

/* Carousel slide render function for Hero Image Carousel */
const renderHeroImgCarousel = carouselImg => {
  const { item } = carouselImg;
  const { image, video } = item;

  const videoData = video &&
    video.url && {
      ...video,
      videoWidth: CAROUSEL_MODULE_WIDTH,
      videoHeight: HERO_CAROUSEL_MODULE_HEIGHT,
    };

  return (
    <DamImage
      width={CAROUSEL_MODULE_WIDTH}
      height={HERO_CAROUSEL_MODULE_HEIGHT}
      url={image.url}
      host={LAZYLOAD_HOST_NAME.HOME}
      crop={image.crop_m}
      imgConfig={IMG_DATA.heroImgConfig[0]}
      videoData={videoData}
    />
  );
};

/* Carousel slide render function for Promo Text Carousel */
const renderPromoTextCarousel = carouselPromoText => {
  const { item = { title: '' } } = carouselPromoText;

  return (
    <TextCarouselWrapper>
      <BodyCopy
        text={item.title.text}
        fontSize="fs32"
        fontFamily="primary"
        textAlign="center"
        fontWeight="medium"
        margin="24px 0"
        color="text.primary"
      />
      {item.descriptions.map(description => {
        return (
          <BodyCopy
            text={description.text}
            fontSize="fs14"
            fontFamily="secondary"
            textAlign="center"
            fontWeight="extrabold"
            color="text.primary"
          />
        );
      })}
    </TextCarouselWrapper>
  );
};

const UserOnboardingScreen = props => {
  const {
    largeCompImageSimpleCarousel,
    textList,
    startShoppingButtonLabel,
    navigation,
    overviewLabels,
    isUserLoggedIn,
  } = props;

  const [showMainModal, setShowMainModal] = useState(true);

  useEffect(() => {
    getValueFromAsyncStorage('isUserOnBoardingScreenVisited').then(
      isUserOnBoardingScreenVisited => {
        if (isUserOnBoardingScreenVisited !== 'true') {
          setShowMainModal(true);
          setValueInAsyncStorage('isUserOnBoardingScreenVisited', 'true');
        }
      }
    );
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      setShowMainModal(false);
    }
  }, [isUserLoggedIn]);

  return (
    <ModalNative noHeader horizontalBar isOpen={showMainModal} animationType="fade">
      <ModalViewWrapper>
        <Container>
          {/* ------ Hero Carousel Image Start */}
          {largeCompImageSimpleCarousel.length > 1 ? (
            <View pointerEvents="none">
              <Carousel
                height={HERO_CAROUSEL_MODULE_HEIGHT}
                data={largeCompImageSimpleCarousel}
                renderItem={renderHeroImgCarousel}
                width={CAROUSEL_MODULE_WIDTH}
                options={{
                  autoplayInterval: CAROUSEL_OPTIONS.speed,
                }}
              />
            </View>
          ) : (
            <View>{renderHeroImgCarousel({ item: largeCompImageSimpleCarousel[0] })}</View>
          )}
          {/* ------ Hero Carousel Image End ------- */}
          {/* ------ Carousel Text Start */}
          {textList.length > 1 ? (
            <Carousel
              data={textList}
              width={CAROUSEL_MODULE_WIDTH}
              renderItem={renderPromoTextCarousel}
              paginationProps={{
                containerStyle: {
                  paddingVertical: 0,
                  paddingTop: 46,
                  paddingBottom: 24,
                },
              }}
              options={{
                autoplayInterval: CAROUSEL_OPTIONS.speed,
              }}
              showDots
            />
          ) : (
            <View>{renderPromoTextCarousel({ item: textList[0] })}</View>
          )}
          {/* ------ Carousel Text End ------- */}

          <ButtonsWrapper>
            <GuestLoginOverview
              hideLogoutText
              loggedInWrapperStyle="margin:0"
              labels={overviewLabels}
              navigation={navigation}
              isUserLoggedIn={isUserLoggedIn}
            />
          </ButtonsWrapper>
          <Anchor
            underline
            anchorVariation="primary"
            fontSizeVariation="xlarge"
            text={startShoppingButtonLabel.text}
            onPress={() => setShowMainModal(false)}
          />
        </Container>
      </ModalViewWrapper>
    </ModalNative>
  );
};

UserOnboardingScreen.defaultProps = {
  startShoppingButtonLabel: { text: 'START SHOPPING' },
  largeCompImageSimpleCarousel: [
    {
      image: {
        url:
          'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1574166648/onboarding-screen-img.png',
        alt: 'Girl',
        title: 'Girl',
        crop_d: '',
        crop_t: '',
        crop_m: '',
      },
    },
    {
      image: {
        url:
          'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1574166648/onboarding-screen-img.png',
        alt: 'Girl',
        title: 'Girl',
        crop_d: '',
        crop_t: '',
        crop_m: '',
      },
    },
  ],

  textList: [
    {
      title: {
        text: 'Get $5 Rewards',
      },
      descriptions: [
        {
          text: 'Earn points every time you shop.',
        },
        {
          text: '$1 Spend = 1 Point $100',
        },
        {
          text: 'Points = $5 Reward',
        },
      ],
    },
    {
      title: {
        text: 'Get $5 Rewards',
      },
      descriptions: [
        {
          text: 'Earn points every time you shop.',
        },
        {
          text: '$1 Spend = 1 Point $100',
        },
        {
          text: 'Points = $5 Reward',
        },
      ],
    },
  ],
  overviewLabels: {},
  isUserLoggedIn: false,
};

UserOnboardingScreen.propTypes = {
  largeCompImageSimpleCarousel: PropTypes.arrayOf(PropTypes.object),
  textList: PropTypes.arrayOf(PropTypes.object),
  startShoppingButtonLabel: PropTypes.string,
  navigation: PropTypes.shape({}).isRequired,
  overviewLabels: PropTypes.arrayOf(PropTypes.object),
  isUserLoggedIn: PropTypes.bool,
};

export default UserOnboardingScreen;
export { UserOnboardingScreen as UserOnboardingScreenVanilla };
