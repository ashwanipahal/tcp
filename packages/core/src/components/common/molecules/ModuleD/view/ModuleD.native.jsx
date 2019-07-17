// @flow
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { getScreenWidth, UrlHandler } from '../../../../../utils/utils.native';
import { Heading, Anchor, Button, Image } from '../../../atoms';
import { ButtonWrapper, Tile, HeadingWrapper, Wrapper } from '../ModuleD.style.native';
import colors from '../../../../../../styles/themes/TCP/colors';
import spacing from '../../../../../../styles/themes/TCP/spacing';

type Props = {
  headerText: Object,
  smallCompImage: Object,
  singleCTAButton: Object,
};

const imageSize = parseInt((getScreenWidth() - 32) / 2, 10);
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
  } = item;

  const anchorEnable = true;
  return (
    <Tile tileIndex={item.index}>
      <TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(link.url)}>
        <Image
          alt={image.alt}
          source={{ uri: getUrlWithCrop(image.url) }}
          height={imageSize}
          marginBottom={parseInt(spacing.ELEM_SPACING.XS, 10)}
          width={imageSize}
        />
      </TouchableOpacity>

      <Anchor
        fontSizeVariation="large"
        text={link.title}
        visible={anchorEnable}
        onPress={() => {
          UrlHandler(link.url);
        }}
      >
        {link.text}
      </Anchor>
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
  let { headingText, url } = {};
  const { headerText, smallCompImage, singleCTAButton } = props;
  const buttonWidth = { width: 225 };

  if (headerText) {
    ({
      textLines: [{ text: headingText }],
      link: { url },
    } = headerText);
  }

  return (
    <Wrapper>
      {headingText && (
        <HeadingWrapper accessibilityRole="button" onPress={() => UrlHandler(url)}>
          <Heading
            fontFamily="primary"
            fontSize="fs36"
            letterSpacing="ls167"
            textAlign="center"
            color="text.primary"
            fontWeight="extrabold"
            text={headingText}
          />
        </HeadingWrapper>
      )}
      {smallCompImage && (
        <FlatList
          numColumns={2}
          data={smallCompImage}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      {singleCTAButton && (
        <ButtonWrapper>
          <Button
            color={colors.BUTTON.WHITE.TEXT}
            accessibilityLabel={singleCTAButton.title}
            buttonVariation="variable-width"
            style={buttonWidth}
            text={singleCTAButton.title}
            onPress={() => {
              UrlHandler(singleCTAButton.url);
            }}
          />
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default ModuleD;
