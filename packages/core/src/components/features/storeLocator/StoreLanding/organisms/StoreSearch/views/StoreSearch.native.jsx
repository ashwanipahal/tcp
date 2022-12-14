import React, { Component } from 'react';
import { FlatList } from 'react-native';
import superagent from 'superagent';
import { PropTypes } from 'prop-types';
import { isGymboree } from '@tcp/core/src/utils/index.native';
import { getAPIConfig, getLabelValue } from '@tcp/core/src/utils';
import { Anchor, BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { reduxForm, Field, change } from 'redux-form';
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
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../../../container/StoreLanding.constants';

const MarkerIcon = require('@tcp/core/src/assets/icon-marker.png');
const SearchIcon = require('@tcp/core/src/assets/icon-mag-glass.png');

const { INITIAL_STORE_LIMIT, GOOGLE_SEARCH_API_ENDPOINT } = constants;

class StoreSearch extends Component {
  state = {
    errorNotFound: null,
    gymSelected: isGymboree(),
    outletSelected: false,
  };

  locationRef = null;

  handleLocationSelection = (data, inputValue) => {
    const { geometry } = data;
    const { loadStoresByCoordinates, submitting, dispatch } = this.props;
    if (!geometry || submitting) {
      return;
    }
    const {
      location: { lat, lng },
    } = geometry;
    dispatch(change('StoreSearch', 'storeAddressLocator', inputValue));
    loadStoresByCoordinates(Promise.resolve({ lat, lng }), INITIAL_STORE_LIMIT);
  };

  renderStoreTypes = ({ name, dataLocator, storeLabel, checked } = {}) => {
    return (
      <StyledCheckbox>
        <Field
          name={name}
          component={InputCheckbox}
          dataLocator={dataLocator}
          enableSuccessCheck={false}
          isChecked={checked}
          checkBoxLabel={false}
          onChange={(...args) => this.onSelectStore(args)}
        >
          {storeLabel}
        </Field>
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

  onSelectStore = selectparams => {
    const [isSelected, , , name] = selectparams;
    const { selectStoreType } = this.props;

    if (name === 'gymboreeStoreOption') {
      this.setState(
        {
          gymSelected: isSelected,
        },
        () => {
          const { outletSelected, gymSelected } = this.state;
          selectStoreType({ outletSelected, gymSelected });
        }
      );
    }

    if (name === 'outletOption') {
      this.setState(
        {
          outletSelected: isSelected,
        },
        () => {
          const { outletSelected, gymSelected } = this.state;
          selectStoreType({ outletSelected, gymSelected });
        }
      );
    }

    return true;
  };

  onSearch = (inputSearch = this.locationRef && this.locationRef.getAddressText()) => {
    const { loadStoresByCoordinates } = this.props;
    const googleSearchAPIKey = getAPIConfig().googleApiKey;
    const apiUrl = `${GOOGLE_SEARCH_API_ENDPOINT}${inputSearch}&inputtype=textquery&fields=geometry&key=${googleSearchAPIKey}`;

    superagent
      .get(apiUrl)
      .accept('application/json')
      .end((err, res) => {
        try {
          const { lat, lng } = res.body.candidates[0].geometry.location;
          loadStoresByCoordinates(Promise.resolve({ lat, lng }), INITIAL_STORE_LIMIT);
        } catch (error) {
          this.setState({
            errorNotFound: true,
          });
        }
      });
    return false;
  };

  render() {
    const { labels, error, selectedCountry, toggleMap, mapView, getLocationStores } = this.props;
    const { errorNotFound, gymSelected, outletSelected } = this.state;
    const errorMessage = errorNotFound
      ? getLabelValue(labels, 'lbl_storelanding_errorLabel')
      : error;
    const viewMapListLabel = mapView
      ? getLabelValue(labels, 'lbl_storelanding_viewList')
      : getLabelValue(labels, 'lbl_storelanding_viewMap');

    const storeOptionsConfig = [
      {
        name: 'gymboreeStoreOption',
        dataLocator: 'gymboree-store-option',
        storeLabel: getLabelValue(labels, 'lbl_storelanding_gymboreeStores'),
        checked: gymSelected,
      },
      {
        name: 'outletOption',
        dataLocator: 'only-outlet-option',
        storeLabel: getLabelValue(labels, 'lbl_storelanding_outletStores'),
        checked: outletSelected,
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
            text={getLabelValue(labels, 'lbl_storelanding_findStoreHeading')}
          />
        </StyledFindStoreTitle>
        <Anchor onPress={getLocationStores}>
          <StyledStoreLocator>
            <Image source={MarkerIcon} alt="" height="16px" width="16px" />
            <StyledCurrentLocation>
              <BodyCopy
                mobilefontFamily="primary"
                fontWeight="regular"
                fontSize="fs12"
                color="#1a1a1a"
                text={getLabelValue(labels, 'lbl_storelanding_currentLocation')}
              />
            </StyledCurrentLocation>
          </StyledStoreLocator>
        </Anchor>
        <StyledAutoComplete>
          <>
            <StyledSearch>
              <Anchor onPress={() => this.onSearch()}>
                <Image source={SearchIcon} alt="" height="25px" width="25px" />
              </Anchor>
            </StyledSearch>
            <Field
              headerTitle={getLabelValue(labels, 'lbl_storelanding_storeSearchPlaceholder')}
              component={GooglePlacesInput}
              dataLocator="storeAddressLocator"
              componentRestrictions={{ ...{ country: [selectedCountry] } }}
              onValueChange={(data, inputValue) => {
                this.handleLocationSelection(data, inputValue);
              }}
              refs={instance => {
                this.locationRef = instance;
              }}
              clearButtonMode="never"
              errorMessage={errorMessage}
              onSubmitEditing={inputSearch => this.onSearch(inputSearch)}
              name="storeAddressLocator"
            />
          </>
        </StyledAutoComplete>
        <StyleStoreOptionList>
          <FlatList
            data={storeOptionsConfig}
            renderItem={({ item }) => this.renderStoreTypes(item)}
            horizontal
          />
        </StyleStoreOptionList>
        <StyledLinks>
          <Anchor
            fontWeight="regular"
            anchorVariation="primary"
            text={viewMapListLabel}
            underline
            onPress={toggleMap}
          />
        </StyledLinks>
      </StyledContainer>
    );
  }
}

StoreSearch.propTypes = {
  selectedCountry: PropTypes.string,
  error: PropTypes.bool.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
  loadStoresByCoordinates: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  toggleMap: PropTypes.func.isRequired,
  mapView: PropTypes.bool,
  selectStoreType: PropTypes.func.isRequired,
  getLocationStores: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
};

StoreSearch.defaultProps = {
  labels: {},
  selectedCountry: 'US',
  submitting: false,
  mapView: false,
  dispatch: () => {},
};

const validateMethod = createValidateMethod(getStandardConfig(['storeAddressLocator']));

export default reduxForm({
  form: 'StoreSearch',
  enableReinitialize: true,
  ...validateMethod,
})(StoreSearch);

export { StoreSearch as StoreSearchVanilla };
