import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { Modal, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import BodyCopy from '../../BodyCopy';
import { getScreenHeight } from '../../../../../utils/index.native';

const colorPalette = createThemeColorPalette();

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  dialog: {
    alignItems: 'center',
    flex: 1,
  },
  dialogContent: {
    backgroundColor: colorPalette.white,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 5,
    marginTop: getScreenHeight() / 3,
    overflow: 'hidden',
    padding: 24,
    width: 300,
  },

  dialogFooter: {
    borderTopWidth: 1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inputStyle: {
    height: 30,
    marginTop: 20,
  },
  textStyle: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;
    this.setState({ value: defaultValue });
  }

  onChangeText = value => {
    this.setState({ value });
  };

  onSubmitPress = () => {
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
  };

  onCancelPress = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderDialog = () => {
    const { title, placeholder, defaultValue, cancelText, submitText } = this.props;

    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay} />
        <View style={styles.dialogContent}>
          <BodyCopy
            fontSize="fs18"
            fontFamily="secondary"
            fontWeight="regular"
            text={title}
            color="black"
          />

          <TextInput
            style={[styles.inputStyle]}
            defaultValue={defaultValue}
            onChangeText={this.onChangeText}
            placeholder={placeholder}
            autoFocus
            underlineColorAndroid="white"
            secureTextEntry
          />
          <View style={styles.dialogFooter} />
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              onPress={this.onSubmitPress}
              accessibilityRole="button"
              style={styles.textStyle}
            >
              <BodyCopy
                fontSize="fs15"
                fontFamily="secondary"
                fontWeight="extrabold"
                text={submitText}
                color="blue.700"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onCancelPress}
              accessibilityRole="button"
              style={styles.textStyle}
            >
              <BodyCopy
                fontSize="fs15"
                fontFamily="secondary"
                fontWeight="extrabold"
                text={cancelText}
                color="blue.700"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal transparent visible={visible}>
        {this.renderDialog()}
      </Modal>
    );
  }
}

Prompt.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
};

Prompt.defaultProps = {
  cancelText: 'CANCEL',
  submitText: 'OK',
  visible: false,
  defaultValue: '',
  placeholder: '',
};
