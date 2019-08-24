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

type Props = {
  buttonsData: Object[],
  navigation: Object,
  buttonListVariation: string,
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
  const { button } = item;

  return (
    <Button
      locator={locator}
      accessibilityRole="button"
      accessibilityLabel={button.text}
      buttonVariation="cautionary-button"
      text={button.text}
      color="red"
      style={showFullWidth ? buttonFullWidth : buttonWidth}
      url={button.url}
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
  const {
    item: { button },
  } = item;

  return (
    <ScrollViewContainer>
      <Button
        locator={locator}
        accessibilityRole="button"
        accessibilityLabel={button.text}
        buttonVariation="cautionary-button"
        color="red"
        text={button.text}
        url={button.url}
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

  const {
    item: {
      button: { text, url },
    },
    index,
  } = item;

  return (
    <TextLiksViewContainer>
      <Anchor
        key={index.toString()}
        locator={locator}
        accessibilityRole="link"
        accessibilityLabel={text}
        text={text}
        anchorVariation="white"
        fontSizeVariation="large"
        url={url}
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
    item: { image, button },
    index,
  } = item;

  return (
    <Anchor url={button.url} navigation={navigation} locator={locator}>
      <DivImageContainer>
        {image && <Image url={image.url} height={60} width={60} style={style} />}
        <BodyCopy
          key={index.toString()}
          accessibilityRole="text"
          accessibilityLabel={button.text}
          fontFamily="secondary"
          fontSize="fs14"
          color="white"
          fontWeight="extrabold"
          letterSpacing="black"
          text={button.text}
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
 * linktext, tackedCTAButton, scrollCTAButton and divImageCTA
 * buttonsData: Takes the list of linktext, tackedCTAButton, scrollCTAButton and divImageCTA button .
 */

const ButtonList = ({ locator, buttonListVariation, navigation, buttonsData }: Props) => {
  if (buttonListVariation === 'stackedCTAList') {
    const isEvenButtonGrid = buttonsData.length % 2 === 0;
    return (
      <Container>
        {isEvenButtonGrid && renderEvenButtonGrid(buttonsData, navigation, locator)}
        {!isEvenButtonGrid && renderOddButtonGrid(buttonsData, navigation, locator)}
      </Container>
    );
  }

  if (buttonListVariation === 'scrollCTAList') {
    return <Container>{renderScrollView(buttonsData, navigation, locator)}</Container>;
  }

  if (buttonListVariation === 'linkCTAList') {
    return <Container>{renderLinkTextView(buttonsData, navigation, locator)}</Container>;
  }

  if (buttonListVariation === 'imageCTAList') {
    return <Container>{renderDivImageCTA(buttonsData, navigation, locator)}</Container>;
  }

  return null;
};

export default ButtonList;
export { ButtonList as ButtonListVanilla };
