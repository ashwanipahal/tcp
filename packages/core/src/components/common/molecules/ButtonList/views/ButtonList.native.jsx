// @flow
import React from 'react';
import { FlatList } from 'react-native';
import { getScreenWidth } from '../../../../../utils/utils.native';
import { Button, Anchor, Image, BodyCopy } from '../../../atoms';
import {
  Container,
  ScrollViewContainer,
  DivImageContainer,
  TextLiksViewContainer,
} from '../ButtonList.native';

type Props = {
  ctxButton: Object[],
  navigation: Object,
  buttonListVariation: string,
  navigation: Object,
  item: Object[],
};

const buttonWidth = { width: getScreenWidth() / 2 };
const buttonFullWidth = { width: getScreenWidth() };

const keyExtractor = (_, index) => index.toString();

// eslint-disable-next-line react/prop-types
const renderItem = ({ item, showFullWidth }) => {
  return (
    <Button
      buttonVariation="variable-width"
      text={item.title}
      style={showFullWidth ? buttonFullWidth : buttonWidth}
    />
  );
};

const renderFlatList = updatedCtxButton => {
  return (
    <FlatList
      numColumns={2}
      keyExtractor={keyExtractor}
      data={updatedCtxButton}
      renderItem={renderItem}
    />
  );
};

// eslint-disable-next-line react/prop-types
const scrollViewRenderItem = ({ item }) => {
  return (
    <ScrollViewContainer>
      <Button buttonVariation="variable-width" text={item.title} />
    </ScrollViewContainer>
  );
};

const renderScrollView = ctxButton => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={scrollViewRenderItem}
    />
  );
};

const renderOddButtonGrid = ctxButton => {
  const updatedCtxButton = ctxButton.slice();
  const item = updatedCtxButton.pop();
  return (
    <Container>
      {renderFlatList(updatedCtxButton)}
      {renderItem({ item, showFullWidth: true })}
    </Container>
  );
};

const linkTextViewRenderItem = (item, navigation) => {
  const style = { borderBottomWidth: 3, borderColor: 'white' };
  return (
    <TextLiksViewContainer>
      <Anchor
        text={item.item.title}
        anchorVariation="white"
        fontWeightVariation="large"
        url={item.item.links}
        navigation={navigation}
        customStyle={style}
      />
    </TextLiksViewContainer>
  );
};

const rendeLinkTextView = (ctxButton, navigation) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => linkTextViewRenderItem(item, navigation)}
    />
  );
};

// eslint-disable-next-line react/prop-types
const divImageRenderItem = ({ item }) => {
  const style = { borderRadius: 70 / 2 };
  return (
    <DivImageContainer>
      <Image
        url="https://res.cloudinary.com/tcp-dam-test/image/upload/v1562061640/ben-white-4K2lIP0zc_k-unsplash_avr2bp.jpg"
        height={70}
        width={70}
        crop="w_70"
        style={style}
      />
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs13"
        color="extrabold"
        letterSpacing="black"
        text={item.title}
      />
    </DivImageContainer>
  );
};

const renderDivImageCTA = ctxButton => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={divImageRenderItem}
    />
  );
};

// Main Render Function
const ButtonList = ({ buttonListVariation, navigation, ...otherProps }: Props) => {
  const { ctxButton } = otherProps;

  // This is first Stack-Button Variation

  if (buttonListVariation === 'stackedCTAButton') {
    const isEvenButtonGrid = ctxButton.length % 2 === 0;
    return (
      <Container>
        {isEvenButtonGrid && renderFlatList(ctxButton)}
        {!isEvenButtonGrid && renderOddButtonGrid(ctxButton)}
      </Container>
    );
  }

  if (buttonListVariation === 'scrollCTAButton') {
    return <Container>{renderScrollView(ctxButton)}</Container>;
  }

  if (buttonListVariation === 'linkList') {
    return <Container>{rendeLinkTextView(ctxButton, navigation)}</Container>;
  }

  if (buttonListVariation === 'divImageCTA') {
    return <Container>{renderDivImageCTA(ctxButton)}</Container>;
  }

  return <Container> </Container>;
};

export default ButtonList;
export { ButtonList as ButtonListVanilla };
