import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getAPIConfig } from '@tcp/core/src/utils';
import BodyCopy from '../BodyCopy';
import Image from '../Image';
import { StyledErrorWrapper, ViewWithSpacing } from '../styledWrapper/styledWrapper.native';
import {
  StyledLabel,
  textInput,
  textInputContainer,
  description,
  listView,
  separator,
  poweredContainer,
  Container,
  item,
  container,
} from './AutoCompleteComponent.native.style';

const errorIcon = require('../../../../assets/alert-triangle.png');

export class GooglePlacesInput extends PureComponent {
  constructor(props) {
    super(props);
    const apiConfigObj = getAPIConfig();
    const { googleApiKey } = apiConfigObj;
    this.googleApiKey = googleApiKey;
    this.state = {
      listViewDisplayed: false, // we need to handle listViewDisplayed by ourself as library used to set it true on every prop change
      active: false,
      touched: false,
    };
  }

  onFocus = () => {
    this.setState({
      listViewDisplayed: 'auto',
      active: true,
    });
  };

  onBlur = () => {
    setTimeout(() => {
      // Need to add setTimeout as blur is calling first and then request to get detailed response
      // Value set to 1000ms to handle all auto complete scenarios
      this.setState({
        active: false,
        touched: true,
        listViewDisplayed: false,
      });
    }, 1000);
  };

  onPress = (data, details = null) => {
    const { onValueChange } = this.props;
    this.setState(
      {
        listViewDisplayed: false,
      },
      () => {
        onValueChange(details, data.description);
      }
    );
  };

  render() {
    const {
      headerTitle,
      componentRestrictions,
      onSubmitEditing,
      onEndEditing,
      refs,
      onChangeText,
      input,
      initialValue,
      meta: { error },
      clearButtonMode,
    } = this.props;
    const { listViewDisplayed, active, touched } = this.state;
    return (
      <Container>
        <StyledLabel isFocused={active || input.value}>{headerTitle}</StyledLabel>
        <GooglePlacesAutocomplete
          placeholder={null}
          suppressDefaultStyles
          minLength={2} // minimum length of text to search
          autoFocus={false}
          ref={instance => refs(instance)}
          returnKeyType="search"
          fetchDetails
          renderDescription={row => row.description}
          listViewDisplayed={listViewDisplayed}
          onPress={this.onPress}
          query={{
            key: this.googleApiKey,
            components: `country:${componentRestrictions.country[0]}`,
            types: 'address',
          }}
          text={input.value}
          getDefaultValue={() => initialValue}
          textInputProps={{
            name: input.name,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            clearButtonMode,
            onSubmitEditing: text => {
              onSubmitEditing(text.nativeEvent.text);
            },
            onEndEditing: text => {
              onEndEditing(text.nativeEvent.text);
            },
            onChangeText: text => {
              input.onChange(text);
              onChangeText(text);
            },
          }}
          styles={{
            textInputContainer,
            textInput,
            description,
            listView,
            separator,
            poweredContainer,
            row: item,
            container,
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={0} // debounce the requests in ms.
        />
        {touched && !active && error ? (
          <StyledErrorWrapper>
            <ViewWithSpacing spacingStyles="margin-right-XXXS">
              <Image source={errorIcon} width="15px" height="15px" />
            </ViewWithSpacing>
            <BodyCopy
              mobilefontFamily={['secondary']}
              fontWeight="semibold"
              fontSize="fs12"
              text={error}
              color="error"
            />
          </StyledErrorWrapper>
        ) : null}
      </Container>
    );
  }
}

GooglePlacesInput.propTypes = {
  headerTitle: PropTypes.string,
  componentRestrictions: PropTypes.shape({
    country: PropTypes.shape([]),
  }),
  onValueChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onEndEditing: PropTypes.func,
  refs: PropTypes.func,
  onChangeText: PropTypes.func,
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    touched: PropTypes.string,
    error: PropTypes.string,
  }),
  initialValue: PropTypes.string,
  clearButtonMode: PropTypes.string,
};

GooglePlacesInput.defaultProps = {
  headerTitle: 'Address Line',
  componentRestrictions: {
    country: [],
  },
  onValueChange: () => {},
  onSubmitEditing: () => {},
  onEndEditing: () => {},
  refs: () => {},
  onChangeText: () => {},
  input: {},
  meta: {},
  initialValue: '',
  clearButtonMode: 'while-editing',
};

export default GooglePlacesInput;
