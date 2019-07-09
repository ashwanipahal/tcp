import React from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import { Anchor, Button, Image } from '../../../atoms';
import { UrlHandler } from '../../../../../utils/utils.native';
import { ButtonWrapper, Heading, ModuleDWrapper, Tile } from '../ModuleD.style.native';

// @flow

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

type Props = {
  composites: Object,
};

const keyExtractor = (item, index) => index.toString();

const getDimention = () => {
  return parseInt((Dimensions.get('screen').width - 48) / 2, 10);
};

const getUrlWithCrop = url => {
  const dimension = getDimention();
  return url.replace('h_650,w_650', `h_${dimension},w_${dimension}`);
};

const renderItem = item => (
  <Tile tileIndex={item.index}>
    <TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(item.item.link.url)}>
      <Image
        alt={item.item.image.alt}
        source={{ uri: getUrlWithCrop(item.item.image.url) }}
        style={{
          height: getDimention(),
          width: getDimention(),
        }}
      />
    </TouchableOpacity>
    <Anchor
      centered="centered"
      fontSizeVariation="large"
      onPress={() => {
        UrlHandler(item.item.link.url);
      }}
    >
      {item.item.link.title}
    </Anchor>
  </Tile>
);

const ModuleD = (props: Props) => {
  let { headingText, url } = {};
  const { composites: { headerText, smallCompImage, singleCTAButton } = {} } = props;

  if (headerText) {
    ({
      textLines: [{ text: headingText }],
      link: { url },
    } = headerText);
  }

  return (
    <ModuleDWrapper>
      {headingText && (
        <TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(url)}>
          <Heading>{headingText}</Heading>
        </TouchableOpacity>
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
            color="#4a4a4a"
            title={singleCTAButton.title}
            accessibilityLabel={singleCTAButton.title}
            buttonVariation="variable-width"
            onPress={() => {
              UrlHandler(singleCTAButton.url);
            }}
          />
        </ButtonWrapper>
      )}
    </ModuleDWrapper>
  );
};

export default withStyles(ModuleD);
