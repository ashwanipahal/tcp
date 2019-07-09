import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native';

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

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  heading: {
    color: '#1a1a1a',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  image: {
    height: 164,
    width: '100%',
  },
  item: {
    width: '50%',
  },
  itemEven: {
    marginRight: 10,
  },
  itemOdd: {
    marginLeft: 10,
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 14,
    paddingRight: 14,
  },
});

const checkIndex = index => (index % 2 === 0 ? styles.itemEven : styles.itemOdd);

const keyExtractor = (item, index) => index.toString();

const getUrlWithCrop = url => {
  const viewport = Dimensions.get('screen').width;
  const imageWidth = parseInt((viewport - 48) / 2, 10);

  Image.getSize(url, (width, height) => {
    console.log('image dimensions', width, height);
  });

  return url.replace('h_650,w_650', `h_${imageWidth},w_${imageWidth}`);
};

const renderItem = item => (
  <View style={[styles.item, checkIndex(item.index)]}>
    <Image
      alt={item.item.image.alt}
      source={{ uri: getUrlWithCrop(item.item.image.url) }}
      style={styles.image}
    />
    <Text>{item.item.link.title}</Text>
  </View>
);

const handlePress = url => {
  Alert.alert(`Tapped. below url received. \n ${url}`);
};

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
    <View style={styles.wrapper}>
      {headingText && (
        <TouchableOpacity accessibilityRole="button" onPress={() => handlePress(url)}>
          <Text style={styles.heading}>{headingText}</Text>
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
        <Button title={singleCTAButton.title} accessibilityLabel={singleCTAButton.title} />
      )}
    </View>
  );
};

export default ModuleD;
