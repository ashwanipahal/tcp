// @flow
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getLocator, getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';
import { DamImage, BodyCopy, Anchor } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import {
  Container,
  BodyCopyContainer,
  ChildContainer,
  MessageContainer,
  LinkContainer,
  ListContainer,
} from '../ModuleL.styles.native';
import config from '../config';

type Props = {
  imageGrid: Array<Object>,
  headerText: Array<Object>,
  navigation: Object,
  promoBanner: Array<Object>,
};

/**
 * To enable the anchorIcon.
 */
const anchorIcon = true;

/**
 * To manage the width of the Mesasge Container.
 */
const width = getScreenWidth() - 150;
const keyExtractor = (_, index) => index.toString();

/**
 * @function renderItem : Render method for Flatlist.
 * @desc This method is rendering Module L items.
 *
 * @param {Object} item : Single object to render inside Flatlist.
 * @return {node} function returns module L single element item.
 */

const renderItem = (item, navigation) => {
  const {
    item: { image, link, color: { color: tileBgColor } = {} },
    index,
  } = item;

  let tileBgColorSheet = {};
  try {
    tileBgColorSheet = StyleSheet.create({
      // eslint-disable-next-line react-native/no-unused-styles
      tileColor: {
        backgroundColor: tileBgColor,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Inavlid tile Background color in Module L');
  }

  return (
    <Anchor
      url={link.url}
      navigation={navigation}
      testID={`${getLocator('moduleL_tiles')}${index + 1}`}
    >
      <ChildContainer style={tileBgColorSheet.tileColor}>
        <DamImage
          url={image.url}
          height={127}
          crop={image.crop_m}
          testID={`${getLocator('moduleL_image')}${index + 1}`}
          imgConfig={config.IMG_DATA.crops[0]}
          alt={image.alt}
          host={LAZYLOAD_HOST_NAME.HOME}
        />
        <MessageContainer>
          <BodyCopyContainer width={width}>
            <BodyCopy
              fontSize="fs20"
              color="black"
              letterSpacing="ls222"
              text={image.alt}
              testID={`${getLocator('moduleL_title')}${index + 1}`}
            />
          </BodyCopyContainer>
          <LinkContainer>
            <Anchor
              fontSizeVariation="xlarge"
              text={link.text}
              visible={anchorIcon}
              url={link.url}
              navigation={navigation}
              testID={`${getLocator('moduleL_link')}${index + 1}`}
            />
          </LinkContainer>
        </MessageContainer>
      </ChildContainer>
    </Anchor>
  );
};

/**
 * @param {object} props : Props for Module L multi list banner.
 * @desc This is Module L global component. It has capability to display
 * featured content module with 1 images tiles ,links and a CTA.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleL = (props: Props) => {
  const { headerText, imageGrid, navigation, promoBanner } = props;
  return (
    <Container>
      {headerText && (
        <LinkText
          headerText={headerText}
          navigation={navigation}
          type="heading"
          fontFamily="primary"
          fontSize="fs36"
          letterSpacing="ls167"
          textAlign="center"
          color="text.primary"
          fontWeight="black"
          testID={getLocator('moduleL_header_text')}
        />
      )}
      {promoBanner && (
        <PromoBanner
          promoBanner={promoBanner}
          testID={getLocator('moduleL_promobanner_text')}
          navigation={navigation}
        />
      )}
      <ListContainer>
        <FlatList
          keyExtractor={keyExtractor}
          data={imageGrid}
          renderItem={item => renderItem(item, navigation)}
        />
      </ListContainer>
    </Container>
  );
};

export default ModuleL;
export { ModuleL as ModuleLVanilla };
