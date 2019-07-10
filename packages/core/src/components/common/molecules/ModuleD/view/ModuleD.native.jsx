import React from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles';
import { Anchor, Button, Image } from '../../../atoms';
import { UrlHandler } from '../../../../../utils/utils.native';
import { ButtonWrapper, Heading, ModuleDWrapper, Tile } from '../ModuleD.style.native';
import colors from '../../../../../../styles/themes/TCP/colors';
import spacing from '../../../../../../styles/themes/TCP/spacing';

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

const keyExtractor = (_, index) => index.toString();

const getDimension = () => {
  return parseInt((Dimensions.get('screen').width - 32) / 2, 10);
};

const getUrlWithCrop = url => {
  const dimension = getDimension();
  return url.replace('h_650,w_650', `h_${dimension},w_${dimension}`);
};

const renderItem = item => {
  const {
    item: { image, link },
  } = item;
  return (
    <Tile tileIndex={item.index}>
      <TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(link.url)}>
        <Image
          alt={image.alt}
          source={{ uri: getUrlWithCrop(image.url) }}
          style={{
            height: getDimension(),
            marginBottom: parseInt(spacing.ELEM_SPACING.XS, 10),
            width: getDimension(),
          }}
        />
      </TouchableOpacity>
      <Anchor
        centered="centered"
        fontSizeVariation="large"
        onPress={() => {
          UrlHandler(link.url);
        }}
      >
        {link.title}
      </Anchor>
    </Tile>
  );
};

const ModuleD = (props: Props) => {
  let { headingText, url } = {};
  const { composites: { headerText, smallCompImage, singleCTAButton } = {} } = props;
  const buttonWidth = { width: 225 };

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
            color={colors.BUTTON.WHITE.TEXT}
            title={singleCTAButton.title}
            accessibilityLabel={singleCTAButton.title}
            buttonVariation="variable-width"
            style={buttonWidth}
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
