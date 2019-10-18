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
  TextLinksViewContainer,
  ContainerView,
  SeparatorView,
} from '../ButtonList.styles.native';

type Props = {
  buttonsData: Object[],
  navigation: Object,
  buttonListVariation: string,
  locator: string,
  color: string,
  buttonVariation: string,
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
const renderItem = (item, navigation, showFullWidth, locator, buttonVariation) => {
  const { button } = item;
  return (
    <Button
      locator={locator}
      accessibilityRole="button"
      accessibilityLabel={button.text}
      buttonVariation={buttonVariation}
      text={button.text}
      style={showFullWidth ? buttonFullWidth : buttonWidth}
      url={button.url}
      navigation={navigation}
      noCurve
    />
  );
};

/**
 * This function is used to render Even number of Buttons into Grid
 */
const renderEvenButtonGrid = (updatedCtxButton, navigation, locator, buttonVariation) => {
  return (
    <FlatList
      numColumns={2}
      keyExtractor={keyExtractor}
      data={updatedCtxButton}
      renderItem={({ item }) => renderItem(item, navigation, false, locator, buttonVariation)}
    />
  );
};

/**
 * This function is used to render Odd number of Buttons into Grid
 */
const renderOddButtonGrid = (ctxButton, navigation, locator, color) => {
  const updatedCtxButton = ctxButton.slice();
  const item = updatedCtxButton.pop();
  const showFullWidth = true;
  return (
    <Container>
      {renderEvenButtonGrid(updatedCtxButton, navigation, locator, color)}
      {renderItem(item, navigation, showFullWidth, locator, color)}
    </Container>
  );
};

/**
 * This function is used to render a single button in scroll Button view .
 */
const renderItemScrollCTAList = (item, navigation, locator, color, buttonVariation) => {
  const {
    item: { button },
  } = item;

  return (
    <ScrollViewContainer>
      <Button
        locator={locator}
        accessibilityRole="button"
        accessibilityLabel={button.text}
        buttonVariation={buttonVariation || 'variable-width'}
        color={color}
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
const renderScrollCTAList = (ctxButton, navigation, locator, color, buttonVariation) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item =>
        renderItemScrollCTAList(item, navigation, locator, color, buttonVariation)
      }
    />
  );
};

/**
 * This function is used to generate links for LinkText view .
 */
const renderItemCTAList = (item, navigation, locator) => {
  const style = { borderBottomWidth: 2, borderColor: 'white' };

  const {
    item: {
      button: { text, url },
    },
    index,
  } = item;

  return (
    <TextLinksViewContainer>
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
    </TextLinksViewContainer>
  );
};

/**
 * This function is used to generate LinkText view .
 */
const renderCTAList = (ctxButton, navigation, locator) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={isScrollIndicator}
        horizontal={isHorizontalScroll}
        keyExtractor={keyExtractor}
        data={ctxButton}
        renderItem={item => renderItemCTAList(item, navigation, locator)}
      />
    </Wrapper>
  );
};

/**
 * This function is used to generate links for DivImageCTA view .
 */
const renderItemImageCTAList = (item, navigation, locator, color) => {
  const style = { borderRadius: 60 / 2 };
  const bodycopyStyle = { marginTop: 20, width: 75 };
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
          color={color}
          fontWeight="extrabold"
          letterSpacing="black"
          text={button.text}
          textAlign="center"
          style={bodycopyStyle}
        />
      </DivImageContainer>
    </Anchor>
  );
};

const renderSeparatorView = () => {
  return <SeparatorView />;
};

/**
 * This function is used to generate DivImageCTA view .
 */
const renderImageCTAList = (ctxButton, navigation, locator, color) => {
  const isHorizontalScroll = true;
  const isScrollIndicator = false;
  return (
    <FlatList
      showsHorizontalScrollIndicator={isScrollIndicator}
      horizontal={isHorizontalScroll}
      keyExtractor={keyExtractor}
      data={ctxButton}
      renderItem={item => renderItemImageCTAList(item, navigation, locator, color)}
      ItemSeparatorComponent={renderSeparatorView}
    />
  );
};

/**
 * @param {object} props : Props for ButtonList
 * @desc This is a buttonlist component. The four variations of buttonlist are:
 * linktext, tackedCTAButton, scrollCTAButton and divImageCTA
 * buttonsData: Takes the list of linktext, tackedCTAButton, scrollCTAButton and divImageCTA button .
 */

const ButtonList = ({
  locator,
  buttonListVariation,
  navigation,
  buttonsData,
  color,
  buttonVariation,
}: Props) => {
  if (buttonListVariation === 'stackedCTAList') {
    const isEvenButtonGrid = buttonsData.length % 2 === 0;
    return (
      <Container>
        {isEvenButtonGrid &&
          renderEvenButtonGrid(buttonsData, navigation, locator, buttonVariation)}
        {!isEvenButtonGrid &&
          renderOddButtonGrid(buttonsData, navigation, locator, buttonVariation)}
      </Container>
    );
  }

  if (buttonListVariation === 'scrollCTAList') {
    return (
      <ContainerView>
        {renderScrollCTAList(buttonsData, navigation, locator, color, buttonVariation)}
      </ContainerView>
    );
  }

  if (buttonListVariation === 'linkCTAList') {
    return <Container>{renderCTAList(buttonsData, navigation, locator)}</Container>;
  }

  if (buttonListVariation === 'imageCTAList') {
    return (
      <ContainerView>{renderImageCTAList(buttonsData, navigation, locator, color)}</ContainerView>
    );
  }

  return null;
};

export default ButtonList;
export { ButtonList as ButtonListVanilla };
