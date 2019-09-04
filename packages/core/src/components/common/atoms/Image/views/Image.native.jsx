// @flow
import React from 'react';
import { Image } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';
import { cropImageUrl } from '../../../../../utils/index.native';

type Props = {
  source: string,
  url: string,
  crop: string,
  imgConfigs: string,
};

const ImageComp = (props: Props) => {
  const { url, crop, source, imgConfigs, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const sourceVal = source || '';
  const imgConfigsVal = imgConfigs || '';
  if (sourceVal === '') {
    return (
      <Image
        {...otherProps}
        accessibilityRole="image"
        source={{ uri: cropImageUrl(urlVal, cropVal, imgConfigsVal) }}
      />
    );
  }
  return <Image {...otherProps} source={source} accessibilityRole="image" />;
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
