import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const styles = {
  container: {
    flex: 1,
  },
};

const withKeyboardAvoidingView = WrappedComponent => props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <WrappedComponent {...props} />
    </KeyboardAvoidingView>
  );
};
export default withKeyboardAvoidingView;
