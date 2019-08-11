// @flow
import React from 'react';
import { FlatList } from 'react-native';
import { getScreenWidth } from '../../../../../utils/utils.app';
import { Button, Anchor, Image, BodyCopy } from '../../../atoms';
import {
  Wrapper,
  Container,
  ScrollViewContainer,
  DivImageContainer,
  TextLiksViewContainer,
} from '../ButtonList.styles.native';
import { getLocator } from '../../../../../utils';

type Props = {
  stackedCTAButtons: Object[],
  navigation: Object,
  buttonListVariation: string,
  navigation: Object,
  divImageCTACarousel: Object[],
  linkList: Object[],
  scrollCTAButtons: Object[],
  locator: string,
};

/**
 * These are button styles.
 */
const buttonWidth = { width: getScreenWidth() / 2 };
const buttonFullWidth = { width: getScreenWidth() };

// Key extractor for flat list
const keyExtractor = (_, index) => index.toString();

/**
 * This function is used to render button either full-width or half
 */
const renderItem = (item, navigation, showFullWidth, locator) => {
  return (
    <Button
      testID={getLocator(locator)}
      accessibilityRole="button"
      accessibilityLabel={item.text}
      buttonVariation="cautionary-button"
      text={item.text}
      color="red"
      style={showFullWidth ? buttonFullWidth : buttonWidth}
      url={item.url}
      navigation={navigation}
    />
  );
};

/**
 * This function is used to render Even number of Buttons into Grid
 */
const renderEvenButtonGrid = (updatedCtxButton, navigation, locator) => {
  return (
    <FlatList
      numColumns={2}
      keyExtractor={keyExtractor}
      data={updatedCtxButton}
      renderItem={({ item }) => renderItem(item, navigation, false, locator)}
    />
  );
};

/**
 * This function is used to render Odd number of Buttons into Grid
 */
const renderOddButtonGrid = (ctxButton, navigation, locator) => {
  const updatedCtxButton = ctxButton.slice();
  const item = updatedCtxButton.pop();
  const showFullWidth = true;
  return (
    <Container>
      {renderEvenButtonGrid(updatedCtxButton, navigation, locator)}
      {renderItem(item, navigation, showFullWidth, locator)}
    </Container>
  );
};

/**
 * This function is used to render a single button in scroll Button view .
 */
const scrollViewRenderItem = (item, navigation, locator) => {
  return (
    <ScrollViewContainer>
      <Button
        testID={getLocator(locator)}
        accessibilityRole="button"
        accessibilityLabel={item.item.text}
        buttonVariation="cautionary-button"
        color="red"
        text={item.item.text}
        url={item.item.url}
        navigation={navigation}
      />
    </ScrollViewContainer>
  );
};

/**
 * This function is used to generate Scroll ButtonList view .
 */
const renderScrollView = (ctxButton, navigation, locator) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => scrollViewRenderItem(item, navigation, locator)}
    />
  );
};

/**
 * This function is used to generate links for LinkText view .
 */
const linkTextViewRenderItem = (item, navigation, locator) => {
  const style = { borderBottomWidth: 2, borderColor: 'white' };
  return (
    <TextLiksViewContainer>
      <Anchor
        testID={getLocator(locator)}
        accessibilityRole="link"
        accessibilityLabel={item.item.text}
        text={item.item.text}
        anchorVariation="white"
        fontSizeVariation="large"
        url={item.item.url}
        navigation={navigation}
        customStyle={style}
        centered
      />
    </TextLiksViewContainer>
  );
};

/**
 * This function is used to generate LinkText view .
 */
const renderLinkTextView = (ctxButton, navigation, locator) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={isScrollIndicator}
        horizontal={isHorizontalScroll}
        keyExtractor={keyExtractor}
        data={ctxButton}
        renderItem={item => linkTextViewRenderItem(item, navigation, locator)}
      />
    </Wrapper>
  );
};

/**
 * This function is used to generate links for DivImageCTA view .
 */
const divImageRenderItem = (item, navigation, locator) => {
  const style = { borderRadius: 60 / 2 };
  const bodycopyStyle = { marginTop: 20 };
  const {
    item: { image, link },
  } = item;
  return (
    <Anchor url={link.url} navigation={navigation} testID={getLocator(locator)}>
      <DivImageContainer>
        <Image url={image.url} height={60} width={60} style={style} />
        <BodyCopy
          accessibilityRole="text"
          accessibilityLabel={link.text}
          fontFamily="secondary"
          fontSize="fs14"
          color="white"
          fontWeight="extrabold"
          letterSpacing="black"
          text={link.text}
          style={bodycopyStyle}
        />
      </DivImageContainer>
    </Anchor>
  );
};

/**
 * This function is used to generate DivImageCTA view .
 */
const renderDivImageCTA = (ctxButton, navigation, locator) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => divImageRenderItem(item, navigation, locator)}
    />
  );
};

/**
 * @param {object} props : Props for ButtonList
 * @desc This is a buttonlist component. The four variations of buttonlist are:
 * 1. stackedCTAButton: Takes the list of stack button.
 * 2. scrollCTAButton: Takes the list of horizontal button.
 * 3. linkList: Takes the list of linktext button .
 * 4. divImageCTA: Takes the list of combination of image & text .
 */

const ButtonList = ({
  locator,
  buttonListVariation,
  navigation,
  stackedCTAButtons,
  divImageCTACarousel,
  linkList,
  scrollCTAButtons,
}: Props) => {
  if (buttonListVariation === 'stackedCTAList') {
    const isEvenButtonGrid = stackedCTAButtons.length % 2 === 0;
    return (
      <Container>
        {isEvenButtonGrid && renderEvenButtonGrid(stackedCTAButtons, navigation, locator)}
        {!isEvenButtonGrid && renderOddButtonGrid(stackedCTAButtons, navigation, locator)}
      </Container>
    );
  }

  if (buttonListVariation === 'scrollCTAList') {
    return <Container>{renderScrollView(scrollCTAButtons, navigation, locator)}</Container>;
  }

  if (buttonListVariation === 'linkCTAList') {
    return <Container>{renderLinkTextView(linkList, navigation, locator)}</Container>;
  }

  if (buttonListVariation === 'imageCTAList') {
    return <Container>{renderDivImageCTA(divImageCTACarousel, navigation, locator)}</Container>;
  }

  return null;
};

export default ButtonList;
export { ButtonList as ButtonListVanilla };
