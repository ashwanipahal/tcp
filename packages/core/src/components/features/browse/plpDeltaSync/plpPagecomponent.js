/* eslint-disable */
// TODO: make metro bundler parse jsx file
import React from 'react';
import { ApolloProvider, graphql } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import { buildSync } from 'aws-appsync';
import gql from 'graphql-tag';
import { ProductList } from './views/productListComponent';
import * as GQLQueries from '../../../../service/Queries';

import AppSyncClient from '../../../../service/AwsAPI';

const PlpPageComponent = graphql(gql(GQLQueries.getProductsInList), {
  options: {
    fetchPolicy: 'cache-only',
  },
  props: ({ data }) => ({
    data: data.getProductsInList || [],
  }),
})(ProductList);

export default class PlpDeltaSyncPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRenderedOnClient: false,
    };
  }

  componentDidMount() {
    this.client = AppSyncClient.getClient();

    this.client.hydrated().then(() =>
      this.client.sync(
        buildSync('Product', {
          baseQuery: {
            query: gql(GQLQueries.getProductsInList),
          },
          subscriptionQuery: {
            query: gql(GQLQueries.DeltaSubscription),
          },
          deltaQuery: {
            query: GQLQueries.listDeltaProducts,
          },
        })
      )
    );
    this.setState({ isRenderedOnClient: true });
  }

  render() {
    const { isRenderedOnClient } = this.state;
    return (
      <React.Fragment>
        {isRenderedOnClient && (
          <ApolloProvider client={this.client}>
            <Rehydrated>
              <PlpPageComponent />
            </Rehydrated>
          </ApolloProvider>
        )}
      </React.Fragment>
    );
  }
}
