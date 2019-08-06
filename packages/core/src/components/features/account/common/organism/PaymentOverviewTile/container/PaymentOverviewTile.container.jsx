import React from 'react';
import { connect } from 'react-redux';
import PaymentOverviewTileComponent from '../views';

export const PaymentOverviewTile = ({ ...props }) => <PaymentOverviewTileComponent {...props} />;

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PaymentOverviewTile);
