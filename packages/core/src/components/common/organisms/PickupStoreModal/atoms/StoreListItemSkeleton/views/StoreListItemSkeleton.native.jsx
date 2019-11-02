import React from 'react';
import { ScrollView, View } from 'react-native';
import { PropTypes } from 'prop-types';

const StoreListItemSkeleton = ({ col }) => {
  return (
    <ScrollView>
      <View>
        {Array.from({ length: col }).map((cItem, index) => {
          return <View key={index.toString()} />;
        })}
      </View>
    </ScrollView>
  );
};

StoreListItemSkeleton.propTypes = {
  col: PropTypes.number,
};

StoreListItemSkeleton.defaultProps = {
  col: 1,
};

export default StoreListItemSkeleton;
