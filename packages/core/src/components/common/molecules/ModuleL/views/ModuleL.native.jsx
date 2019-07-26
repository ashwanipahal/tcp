// @flow
import React from 'react';
import { FlatList } from 'react-native';
import { UrlHandler, getScreenWidth } from '../../../../../utils/utils.native';
import { Image } from '../../../atoms';
import LinkText from '../../LinkText';
import {
  Container,
  BodyCopyContainer,
  DataContainer,
  MessageContainer,
  LinkContainer,
  FlatListContainer,
} from '../ModuleL.styles.native';
import moduleL from '../mock';

/**
 * Default data for ModuleL.
 */
const moduleData = { moduleL };

const anchorEnable = true;
const width = getScreenWidth() - 150;
const imageSize = parseInt(getScreenWidth() / 4, 10);
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
 * @desc This method is rendering Module L items.
 *
 * @param {Object} item : Single object to render inside Flatlist.
 * @return {node} function returns module L single element item.
 */

const renderitem = item => {
  const {
    item: { image, link },
  } = item;
  return (
    <DataContainer
      onPress={() => {
        UrlHandler(link.url);
      }}
    >
      <Image width={imageSize} height={127} source={{ uri: getUrlWithCrop(image.url) }} />
      <MessageContainer>
        <BodyCopyContainer width={width}>
          <LinkText
            type="bodycopy"
            fontFamily="primary"
            fontSize="fs20"
            color="black"
            fontWeight="regular"
            letterSpacing="ls222"
            text={image.title}
            onPress={() => {
              UrlHandler(link.url);
            }}
          />
        </BodyCopyContainer>
        <LinkContainer>
          <LinkText
            type="anchor"
            fontSizeVariation="xlarge"
            text={link.text}
            visible={anchorEnable}
            onPress={() => {
              UrlHandler(link.url);
            }}
          />
        </LinkContainer>
      </MessageContainer>
    </DataContainer>
  );
};

/**
 * @param {object} props : Props for Module L multi list banner.
 * @desc This is Module L global component. It has capability to display
 * featured content module with 1 images tiles ,links and a CTA.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleL = () => {
  return (
    <Container>
      <LinkText
        type="heading"
        fontFamily="primary"
        fontSize="fs36"
        letterSpacing="ls167"
        textAlign="center"
        color="text.primary"
        fontWeight="black"
        text={moduleData.moduleL.moduleL.composites.headerText[0].textItems[0].text}
        onPress={() => {
          UrlHandler(moduleData.moduleL.moduleL.composites.headerText[0].link.url);
        }}
      />
      <FlatListContainer>
        <FlatList
          keyExtractor={keyExtractor}
          data={moduleData.moduleL.moduleL.composites.imageGrid}
          renderItem={renderitem}
        />
      </FlatListContainer>
    </Container>
  );
};

export default ModuleL;
export { ModuleL as ModuleLVanilla };
