import React from 'react';
import { Text, Image, View } from 'react-native';

export const RenderText = ({ style, children }) => <Text style={{ ...style }}>{children}</Text>;

export const RenderAnchor = ({ style, children, actionHandler }) => {
  const actionProps = children[0].props;
  return (
    <Text
      style={{ ...style }}
      onPress={() =>
        actionHandler(actionProps.href, actionProps.target, actionProps['data-target'])
      }
    >
      {children}
    </Text>
  );
};

export const RenderImage = ({ style, source, ...otherProps }) => {
  return <Image url={source} {...otherProps} />;
};

export const RenderView = ({ children }) => {
  return (
    <View>
      {children.map(child => {
        console.log(child);
        return <Text>{child}</Text>;
      })}
    </View>
  );
};

export default {
  br: () => <Text> </Text>,
  p: props => RenderText(props),
  b: props => RenderText(props),
  img: props => RenderImage(props),
  h3: props => RenderText(props),
  ul: props => RenderText(props),
  a: props => RenderAnchor(props),
  li: props => RenderText(props),
  div: props => RenderView(props),
};
