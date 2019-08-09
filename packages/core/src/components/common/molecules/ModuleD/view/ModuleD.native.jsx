// @flow
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { getLocator, getScreenWidth, UrlHandler } from '../../../../../utils/index.native';
import { Anchor, Button, Image } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import { ButtonWrapper, Tile, Wrapper } from '../ModuleD.style.native';
import colors from '../../../../../../styles/themes/TCP/colors';
import spacing from '../../../../../../styles/themes/TCP/spacing';
import LinkText from '../../LinkText';

type Props = {
  headerText: Object[],
  promoBanner: Object[],
  smallCompImage: Object[],
  singleCTAButton: Object,
  navigation: Object,
};

const imageSize = parseInt((getScreenWidth() - 48) / 2, 10);
const keyExtractor = (_, index) => index.toString();

/**
 * @function getUrlWithCrop : Return updated image URL.
 * @desc Returns updated image URL with crop details.
 *
 * @param {String} url : Image URL received from CMS.
 * @return {String} function returns updated image URL as a string.
 */
const getUrlWithCrop = url => {
  const dimension = imageSize;
  return url.replace('h_650,w_650', `h_${dimension},w_${dimension}`);
};

/**
 * @function renderItem : Render method for Flatlist.
 * @desc This method is rendering Module D items.
 *
 * @param {Object} item : Single object to render inside Flatlist.
 * @return {node} function returns module D single element item.
 */
const renderItem = item => {
  const {
    item: { image, link },
    index,
  } = item;

  const anchorEnable = true;
  return (
    <Tile tileIndex={index}>
      <TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(link.url)}>
        <Image
          alt={image.alt}
          testID={`${getLocator('moduleD_image')}${index + 1}`}
          source={{ uri: getUrlWithCrop(image.url) }}
          height={imageSize}
          marginBottom={parseInt(spacing.ELEM_SPACING.XS, 10)}
          width={imageSize}
        />
      </TouchableOpacity>

      <Anchor
        testID={`${getLocator('moduleD_textlink')}${index + 1}`}
        fontSizeVariation="large"
        text={link.text}
        visible={anchorEnable}
        onPress={() => {
          UrlHandler(link.url);
        }}
      />
    </Tile>
  );
};

/**
 * @param {object} props : Props for Module D multi grid banner.
 * @desc This is Module D global component. It has capability to display
 * featured content module with 2, 4, or 6 images tiles and a CTA.
 * Author can surface teaser content leading to corresponding pages.
 *
 * Props: Includes composites of headerText, smallCompImage and singleCTAButton.
 * @prop {object} headerText: Data for header text and link.
 * @prop {object} smallCompImage: Data for images and their links.
 * @prop {object} singleCTAButton: Data for CTA button and its target.
 */

const ModuleD = (props: Props) => {
  const { smallCompImage, headerText, promoBanner, singleCTAButton, navigation } = props;
  const buttonWidth = { width: 225 };
  return (
    <Wrapper>
      {headerText && (
        <LinkText
          headerText={headerText}
          navigation={navigation}
          fontFamily="primary"
          fontSize="fs36"
          letterSpacing="ls167"
          textAlign="center"
          color="text.primary"
          fontWeight="extrabold"
          type="heading"
          testID={getLocator('moduleD_headerlink')}
        />
      )}
      {promoBanner && (
        <PromoBanner promoBanner={promoBanner} testID={getLocator('moduleD_promobanner')} />
      )}

      <FlatList
        numColumns={2}
        data={smallCompImage}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />

      <ButtonWrapper>
        <Button
          color={colors.BUTTON.WHITE.TEXT}
          accessibilityLabel={singleCTAButton.title}
          buttonVariation="variable-width"
          style={buttonWidth}
          text={singleCTAButton.title}
          testID={getLocator('moduleD_button')}
          onPress={() => {
            UrlHandler(singleCTAButton.url);
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ModuleD;
