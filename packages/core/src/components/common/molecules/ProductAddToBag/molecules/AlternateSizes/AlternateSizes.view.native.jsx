/** @module AlternateSizes
 * @summary renders a Alternate sizes for products of other category.
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import {
  AlternateSizeButton,
  AlternateSizeLink,
  AnchorWrapper,
} from './styles/AlternateSizes.style.native';

export class AlternateSizes extends React.PureComponent<Props> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonsList: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  render() {
    const { title, buttonsList, navigation } = this.props;
    return (
      <AlternateSizeButton>
        <BodyCopyWithSpacing
          mobilefontFamily={['secondary']}
          fontWeight="semibold"
          fontSize="fs12"
          color="black"
          text={title}
          spacingStyles="padding-right-XS"
        />
        <AlternateSizeLink>
          {Object.keys(buttonsList).map((item, index) => {
            return (
              <AnchorWrapper noRightBorder={index === Object.keys(buttonsList).length - 1}>
                <Anchor
                  accessibilityRole="link"
                  accessibilityLabel={item}
                  text={item}
                  anchorVariation="custom"
                  colorName="gray.900"
                  fontSizeVariation="medium"
                  centered
                  underline
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      pdpUrl: buttonsList[item],
                      reset: true,
                    })
                  }
                />
              </AnchorWrapper>
            );
          })}
        </AlternateSizeLink>
      </AlternateSizeButton>
    );
  }
}

export default AlternateSizes;
