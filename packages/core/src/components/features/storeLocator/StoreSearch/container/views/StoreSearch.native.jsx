import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ErrorMessage from '@tcp/core/src/components/common/hoc/ErrorMessage';
import { PropTypes } from 'prop-types';
import { Anchor, BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { reduxForm, Field } from 'redux-form';
import {
  StyledContainer,
  StyledStoreLocator,
  StyledAutoComplete,
  StyledCheckbox,
  StyledLinks,
  StyleStoreOptionList,
  StyledFindStoreTitle,
  StyledCurrentLocation,
  StyledSearch,
  StyledCheckBoxBodyCopy,
} from '../styles/StoreSearch.style.native';

const MarkerIcon = require('../../../../../../assets/icon-marker.png');
const SearchIcon = require('../../../../../../assets/icon-mag-glass.png');

class StoreSearch extends Component {
  state = {
    errorNotFound: null,
  };

  onSubmit = () => {
    // @TODO
  };

  onSearch = () => {
    // @TODO
  };

  renderStoreTypes = ({ name, dataLocator, storeLabel }) => {
    return (
      <StyledCheckbox>
        <Field
          name={name}
          component={InputCheckbox}
          dataLocator={dataLocator}
          enableSuccessCheck={false}
        />
        <StyledCheckBoxBodyCopy>
          <BodyCopy
            fontSize="fs12"
            fontFamily="secondary"
            fontWeight="regular"
            color="#1a1a1a"
            text={storeLabel}
          />
        </StyledCheckBoxBodyCopy>
      </StyledCheckbox>
    );
  };

  render() {
    const { labels, error, selectedCountry = 'US' } = this.props;
    const {
      errorLabel,
      storeSearchPlaceholder,
      findStoreHeading,
      gymboreeStores,
      outletStores,
      currentLocation,
      viewMap,
    } = labels;

    const { errorNotFound } = this.state;
    const errorMessage = errorNotFound ? errorLabel : error;

    const storeOptionsConfig = [
      {
        name: 'gymboreeStoreOption',
        dataLocator: 'gymboree-store-option',
        storeLabel: gymboreeStores,
      },
      {
        name: 'outletOption',
        dataLocator: 'only-outlet-option',
        storeLabel: outletStores,
      },
    ];

    return (
      <StyledContainer>
        <StyledFindStoreTitle>
          <BodyCopy
            mobilefontFamily="primary"
            fontWeight="extrabold"
            fontSize="fs16"
            color="#1a1a1a"
            text={findStoreHeading}
          />
        </StyledFindStoreTitle>
        <Anchor>
          <StyledStoreLocator>
            <Image source={MarkerIcon} height="16px" width="16px" />
            <StyledCurrentLocation>
              <BodyCopy
                mobilefontFamily="primary"
                fontWeight="regular"
                fontSize="fs12"
                color="#1a1a1a"
                text={currentLocation}
              />
            </StyledCurrentLocation>
          </StyledStoreLocator>
        </Anchor>
        <StyledAutoComplete>
          <Field
            headerTitle={storeSearchPlaceholder}
            component={GooglePlacesInput}
            dataLocator="addnewaddress-addressl1"
            componentRestrictions={{ ...{ country: [selectedCountry] } }}
          />
          <StyledSearch>
            <Anchor onPress={() => this.onSearch()}>
              <Image source={SearchIcon} height="25px" width="25px" />
            </Anchor>
          </StyledSearch>
          {errorMessage && (
            <ErrorMessage
              isShowingMessage={errorMessage}
              errorId={Math.random()}
              error={errorMessage}
              withoutErrorDataAttribute
            />
          )}
        </StyledAutoComplete>
        <StyleStoreOptionList>
          <FlatList
            data={storeOptionsConfig}
            renderItem={({ item }) => this.renderStoreTypes(item)}
            horizontal
          />
        </StyleStoreOptionList>
        <StyledLinks>
          <Anchor fontWeight="regular" anchorVariation="primary" text={viewMap} underline />
        </StyledLinks>
      </StyledContainer>
    );
  }
}

StoreSearch.propTypes = {
  selectedCountry: PropTypes.string,
  error: PropTypes.bool.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
};

StoreSearch.defaultProps = {
  labels: {},
  selectedCountry: 'US',
};

export default reduxForm({
  form: 'StoreSearch',
  enableReinitialize: true,
})(StoreSearch);

export { StoreSearch as LoginTopSectionVanilla };
