// @flow
import React from 'react';
import { FlatList } from 'react-native';
import { UrlHandler, getScreenWidth } from '../../../../../utils/utils.native';
import { Image, BodyCopy, Anchor } from '../../../atoms';
import LinkText from '../../LinkText';
import {
  Container,
  BodyCopyContainer,
  ChildContainer,
  MessageContainer,
  LinkContainer,
  ListContainer,
} from '../ModuleL.styles.native';

/**
 * To enable the anchorIcon.
 */
const anchorIcon = true;

/**
 * To manage the width of the Mesasge Container.
 */
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
    <ChildContainer
      onPress={() => {
        UrlHandler(link.url);
      }}
    >
      <Image width={imageSize} height={127} source={{ uri: getUrlWithCrop(image.url) }} />
      <MessageContainer>
        <BodyCopyContainer width={width}>
          <BodyCopy
            fontSize="fs20"
            color="black"
            letterSpacing="ls222"
            text={image.text}
            onPress={() => {
              UrlHandler(link.url);
            }}
          />
        </BodyCopyContainer>
        <LinkContainer>
          <Anchor
            fontSizeVariation="xlarge"
            text={link.text}
            visible={anchorIcon}
            onPress={() => {
              UrlHandler(link.url);
            }}
          />
        </LinkContainer>
      </MessageContainer>
    </ChildContainer>
  );
};

/**
 * @param {object} props : Props for Module L multi list banner.
 * @desc This is Module L global component. It has capability to display
 * featured content module with 1 images tiles ,links and a CTA.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleL = (props: Props) => {
  // let { headingText, url } = {};
  const { imageGrid, headerText } = props;
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
        textItems={headerText[0].textItems}
        onPress={() => {
          UrlHandler(headerText.link.url);
        }}
      />
      <ListContainer>
        <FlatList keyExtractor={keyExtractor} data={imageGrid} renderItem={renderitem} />
      </ListContainer>
    </Container>
  );
};

export default ModuleL;
export { ModuleL as ModuleLVanilla };
