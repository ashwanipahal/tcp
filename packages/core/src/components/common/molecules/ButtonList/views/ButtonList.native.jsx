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
  stackedCTAButtons: Object[],
  navigation: Object,
  buttonListVariation: string,
  navigation: Object,
  item: Object[],
};

/**
 * This is a button style. The two variations of buttons width
 */
const buttonWidth = { width: getScreenWidth() / 2 };
const buttonFullWidth = { width: getScreenWidth() };

const keyExtractor = (_, index) => index.toString();

/**
 * This can be render stackCTA Button view with equal width  .
 */
const renderItem = (item, navigation, showFullWidth) => {
  return (
    <Button
      buttonVariation="cautionary-button"
      text={item.text}
      color="red"
      style={showFullWidth ? buttonFullWidth : buttonWidth}
      url={item.links}
      navigation={navigation}
    />
  );
};

/**
 * This can be renderFull stackCTA Button view with equal width  .
 */
const renderFullItem = (item, navigation) => {
  return (
    <Button
      buttonVariation="cautionary-button"
      text={item.item.text}
      color="red"
      style={buttonWidth}
      url={item.item.url}
      navigation={navigation}
    />
  );
};

/**
 * This can be render stackCTA Button view with equal width  .
 */

const renderFlatList = (updatedCtxButton, navigation) => {
  return (
    <FlatList
      numColumns={2}
      keyExtractor={keyExtractor}
      data={updatedCtxButton}
      renderItem={item => renderFullItem(item, navigation)}
    />
  );
};

/**
 * This can be renderItem of the StackCTA Button view with odd or even concept .
 */
const renderOddButtonGrid = (ctxButton, navigation) => {
  const updatedCtxButton = ctxButton.slice();
  const item = updatedCtxButton.pop();
  const showFullWidth = true;
  return (
    <Container>
      {renderFlatList(updatedCtxButton, navigation)}
      {renderItem(item, navigation, showFullWidth)}
    </Container>
  );
};

/**
 * This can be renderItem of the scroll Button view .
 */
const scrollViewRenderItem = (item, navigation) => {
  return (
    <ScrollViewContainer>
      <Button
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
 * This can be render the Scroll ButtonList view .
 */
const renderScrollView = (ctxButton, navigation) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => scrollViewRenderItem(item, navigation)}
    />
  );
};

/**
 * This can be renderItem of the LinkText view .
 */
const linkTextViewRenderItem = (item, navigation) => {
  const style = { borderBottomWidth: 3, borderColor: 'white' };
  return (
    <TextLiksViewContainer>
      <Anchor
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
 * This can be render the LinkText view .
 */
const rendeLinkTextView = (ctxButton, navigation) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={isScrollIndicator}
        horizontal={isHorizontalScroll}
        keyExtractor={keyExtractor}
        data={ctxButton}
        renderItem={item => linkTextViewRenderItem(item, navigation)}
      />
    </Wrapper>
  );
};

/**
 * This can be renderItem of the DivImageCTA view .
 */
const divImageRenderItem = (item, navigation) => {
  const style = { borderRadius: 70 / 2 };
  const bodycopyStyle = { marginTop: 20 };
  const {
    item: { image, link },
  } = item;
  return (
    <Anchor url={link.url} navigation={navigation}>
      <DivImageContainer>
        <Image url={image.url} height={70} width={70} style={style} />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          color="white"
          letterSpacing="black"
          text={link.text}
          style={bodycopyStyle}
        />
      </DivImageContainer>
    </Anchor>
  );
};

/**
 * This can be render the DivImageCTA view .
 */
const renderDivImageCTA = (ctxButton, navigation) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => divImageRenderItem(item, navigation)}
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

const ButtonList = ({ buttonListVariation, navigation, ...otherProps }: Props) => {
  const { stackedCTAButtons, divImageCTACarousel, linkList, scrollCTAButtons } = otherProps;

  if (buttonListVariation === 'stackedCTAList') {
    const isEvenButtonGrid = stackedCTAButtons.length % 2 === 0;
    return (
      <Container>
        {isEvenButtonGrid && renderFlatList(stackedCTAButtons, navigation)}
        {!isEvenButtonGrid && renderOddButtonGrid(stackedCTAButtons, navigation)}
      </Container>
    );
  }

  if (buttonListVariation === 'scrollCTAList') {
    return <Container>{renderScrollView(scrollCTAButtons, navigation)}</Container>;
  }

  if (buttonListVariation === 'linkCTAList') {
    return <Container>{rendeLinkTextView(linkList, navigation)}</Container>;
  }

  if (buttonListVariation === 'imageCTAList') {
    return <Container>{renderDivImageCTA(divImageCTACarousel, navigation)}</Container>;
  }

  return null;
};

export default ButtonList;
export { ButtonList as ButtonListVanilla };
