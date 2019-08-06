import React from 'react';
import { connect } from 'react-redux';
import AddressOverviewTileComponent from '../views';

export const AddressOverviewTile = ({ ...props }) => <AddressOverviewTileComponent {...props} />;

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddressOverviewTile);
