// @flow
import React from 'react';
import { FlatList } from 'react-native';
import { getLocator, getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';
import { Anchor, Button, Image } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import { ButtonWrapper, Tile, Wrapper } from '../ModuleD.style.native';
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
 * @function renderItem : Render method for Flatlist.
 * @desc This method is rendering Module D items.
 *
 * @param {Object} item : Single object to render inside Flatlist.
 * @return {node} function returns module D single element item.
 */
const renderItem = (item, navigation) => {
  const {
    item: { image, link },
    index,
  } = item;

  const anchorEnable = true;
  return (
    <Tile tileIndex={index} key={index.toString()}>
      <Anchor url={link.url} navigation={navigation}>
        <Image
          alt={image.alt}
          testID={`${getLocator('moduleD_image')}${index + 1}`}
          url={image.url}
          crop={image.crop_m}
          height={imageSize}
          marginBottom={parseInt(spacing.ELEM_SPACING.XS, 10)}
          width={imageSize}
          host={LAZYLOAD_HOST_NAME.HOME}
        />
      </Anchor>

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
        <PromoBanner
          promoBanner={promoBanner}
          testID={getLocator('moduleD_promobanner')}
          navigation={navigation}
        />
      )}

      <FlatList
        numColumns={2}
        data={smallCompImage}
        keyExtractor={keyExtractor}
        renderItem={item => renderItem(item, navigation)}
      />

      <ButtonWrapper>
        <Button
          width="225px"
          accessibilityLabel={singleCTAButton.title}
          buttonVariation="variable-width"
          text={singleCTAButton.text}
          testID={getLocator('moduleD_button')}
          url={singleCTAButton.url}
          navigation={navigation}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ModuleD;
