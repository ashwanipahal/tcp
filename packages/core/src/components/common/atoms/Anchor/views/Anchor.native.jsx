// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { setTestId, getLocator, configureInternalNavigationFromCMSUrl } from '@tcp/core/src/utils';
import { StyledText } from '../../../../../../styles/globalStyles/StyledText.style';
import { UrlHandler, navigateToPage, validateExternalUrl } from '../../../../../utils/index.native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
  children?: Object,
  customStyle?: Object,
  locator?: string,
  onPress?: Function,
  accessibilityLabel?: string,
  colorName?: string,
  margins?: string,
  justifyContent?: string,
  openWebView?: boolean,
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

/**
 * Open The Web View Screen when user openWebView props is passed as true
 * @param {*} url
 */
const redirectToInAppView = (url, navigation) => {
  navigation.navigate('InAppView', {
    url,
  });
};

/**
 * @param {object} props : Props for Anchor
 * @desc This is a Anchor component to manage the internal or external .
 */
const Anchor = ({
  anchorVariation,
  text,
  visible,
  children,
  customStyle,
  locator,
  onPress,
  accessibilityLabel,
  justifyContent,
  openWebView,
  ...otherProps
}: Props) => {
  const { url, navigation } = otherProps;
  const openUrl = () => {
    if (openWebView && navigation) {
      redirectToInAppView(url, navigation);
    } else if (validateExternalUrl(url)) {
      UrlHandler(url);
    } else if (navigation) {
      const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
      navigateToPage(cmsValidatedUrl, navigation);
    }
  };

  if (children) {
    return (
      <TouchableOpacity
        accessibilityRole="link"
        onPress={onPress || openUrl}
        {...otherProps}
        style={customStyle}
        {...setTestId(getLocator(locator))}
      >
        {children}
      </TouchableOpacity>
    );
  }

  if (text) {
    return (
      <AnchorView
        accessibilityRole="link"
        onPress={onPress || openUrl}
        accessibilityLabel={accessibilityLabel || text}
        style={customStyle}
        justifyContent={justifyContent}
        {...setTestId(getLocator(locator))}
      >
        <StyledText anchorVariation={anchorVariation} {...otherProps}>
          {text}
        </StyledText>
        {visible && <AnchorIcon source={Icon} />}
      </AnchorView>
    );
  }

  return null;
};
Anchor.defaultProps = {
  anchorVariation: '',
  text: '',
  visible: false,
  children: null,
  customStyle: {},
  locator: '',
  onPress: null,
  accessibilityLabel: '',
  colorName: null,
  margins: null,
  justifyContent: '',
  openWebView: false,
};

export default withStyles(Anchor, AnchorStyles);
export { Anchor as AnchorVanilla };
