import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { getLocator, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';
import { Anchor, Button, DamImage } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import spacing from '../../../../../../styles/themes/TCP/spacing';
import {
  ButtonWrapper,
  Tile,
  Wrapper,
  HeaderContainer,
  ListContainer,
} from '../ModuleD.style.native';
import LinkText from '../../LinkText';
import config from '../config';

const imageSize = 164;
const keyExtractor = (_, index) => index.toString();

/**
 * @function renderItem : Render method for Flatlist.
 * @desc This method is rendering Module D items.
 *
 * @param {Object} item : Single object to render inside Flatlist.
 * @return {node} function returns module D single element item.
 */
const renderItem = (item, navigation, ignoreLazyLoadImage) => {
  const {
    item: { image, link = {}, video = {} },
    index,
  } = item;
  const imgData = image || {};
  const anchorEnable = true;
  const videoData = video &&
    video.url && {
      videoWidth: imageSize,
      videoHeight: imageSize,
      ...video,
    };
  return (
    <Tile tileIndex={index} key={index.toString()}>
      {imgData && Object.keys(imgData).length > 0 ? (
        <Anchor url={link.url} navigation={navigation}>
          <DamImage
            alt={imgData.alt}
            testID={`${getLocator('moduleD_image')}${index + 1}`}
            url={imgData.url}
            crop={imgData.crop_m}
            height={imageSize}
            marginBottom={parseInt(spacing.ELEM_SPACING.XS, 10)}
            width={imageSize}
            imgConfig={config.IMG_DATA_2.imgConfig[0]}
            host={ignoreLazyLoadImage ? '' : LAZYLOAD_HOST_NAME.HOME}
          />
        </Anchor>
      ) : null}
      {videoData && Object.keys(videoData).length > 0 ? (
        <DamImage
          testID={`${getLocator('moduleD_image')}${index + 1}`}
          crop={imgData.crop_m}
          height={imageSize}
          videoData={videoData}
          marginBottom={parseInt(spacing.ELEM_SPACING.XS, 10)}
          width={imageSize}
          host={ignoreLazyLoadImage ? '' : LAZYLOAD_HOST_NAME.HOME}
        />
      ) : null}
      <Anchor
        testID={`${getLocator('moduleD_textlink')}${index + 1}`}
        fontSizeVariation="large"
        text={link.text}
        visible={anchorEnable}
        url={link.url}
        navigation={navigation}
        anchorVariation="primary"
      />
    </Tile>
  );
};

/**
 *
 * @function ModuleD: Props for Module D multi grid banner.
 * @desc This is Module D global component. It has capability to display
 * featured content module with 2, 4, or 6 images tiles and a CTA.
 * Author can surface teaser content leading to corresponding pages.
 *
 * Props: Includes composites of headerText, smallCompImage and singleCTAButton.
 * @prop {array} headerText: Data for header text and link.
 * @prop {array} smallCompImage: Data for images and their links.
 * @prop {object} singleCTAButton: Data for CTA button and its target.
 * @prop {array} promoBanner: Data for Promo Banner.
 * @prop {object} navigation: Naviation object.
 */

const ModuleD = ({
  smallCompImage,
  headerText,
  promoBanner,
  singleCTAButton,
  navigation,
  ignoreLazyLoadImage,
}) => {
  return (
    <Wrapper>
      <HeaderContainer>
        {headerText && (
          <LinkText
            headerText={headerText}
            navigation={navigation}
            fontFamily="primary"
            fontSize="fs32"
            letterSpacing="ls167"
            textAlign="center"
            color="text.primary"
            fontWeight="black"
            type="heading"
            testID={getLocator('moduleD_headerlink')}
          />
        )}
        {promoBanner && (
          <PromoBanner
            promoBanner={promoBanner}
            testID={getLocator('moduleD_promobanner')}
            navigation={navigation}
          />
        )}
      </HeaderContainer>

      <ListContainer>
        {smallCompImage && (
          <FlatList
            numColumns={2}
            data={smallCompImage}
            keyExtractor={keyExtractor}
            renderItem={item => renderItem(item, navigation, ignoreLazyLoadImage)}
          />
        )}
      </ListContainer>

      {singleCTAButton && (
        <ButtonWrapper>
          <Button
            width="225px"
            accessibilityLabel={singleCTAButton.title}
            text={singleCTAButton.text}
            testID={getLocator('moduleD_button')}
            url={singleCTAButton.url}
            navigation={navigation}
          />
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

ModuleD.defaultProps = {
  promoBanner: [],
  singleCTAButton: {},
  ignoreLazyLoadImage: false,
};

ModuleD.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.object,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.object,
    })
  ),
  smallCompImage: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      image: PropTypes.object,
    })
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  singleCTAButton: PropTypes.objectOf(PropTypes.shape({})),
  ignoreLazyLoadImage: PropTypes.bool,
};

export default ModuleD;
