import React from 'react';
import { ProductList } from './views/productListComponent';

import { ApolloProvider, graphql } from 'react-apollo';
import { awsConfig } from '@tcp/core/src/service/aws-cred-exports';
import AWSAppSyncClient, { buildSync } from 'aws-appsync';
import * as GQLQueries from '@tcp/core/src/service/Queries';
import { Rehydrated } from 'aws-appsync-react';
import gql from 'graphql-tag';

import AppSyncClient from '@tcp/core/src/service/AwsAPI';

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
    return (
      <React.Fragment>
        {this.state.isRenderedOnClient && (
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
