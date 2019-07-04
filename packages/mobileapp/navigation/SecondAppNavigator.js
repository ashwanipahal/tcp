import React from 'react';
//import PlpPage from "../inside_core/components/plpPage/views/plpPagecomponent"
//import PlpPage from "../../core/components/plpPage/views/plpPagecomponent";
import ProductListingPageContainer from '@tcp/core/src/components/features/browse/ProductListingPage';

export default class Plp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ProductListingPageContainer />
      </React.Fragment>
    );
  }
}
