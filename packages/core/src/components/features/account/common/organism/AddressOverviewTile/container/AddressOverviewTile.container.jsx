import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressOverviewTileComponent from '../views';
import {getAddressListState } from '../../../../AddressBook/container/AddressBook.selectors';
import {
  getAddressList
} from '../../../../AddressBook/container/AddressBook.actions';


// export const AddressOverviewTile = ({ ...props }, addressList) =>

export class AddressOverviewTile extends React.Component{
  componentDidMount() {
    const { addressList } = this.props;
    if(!addressList){
      const { getAddressListAction } = this.props;
      getAddressListAction();
    }
  }

  render(){
    const { addressList,labels } = this.props;
    return(
      <AddressOverviewTileComponent addressList={addressList} labels={labels}  />
    );
  }
}

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
  };
};


export const mapDispatchToProps = dispatch => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
  };
};


AddressOverviewTile.propTypes = {
  getAddressListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  addressList:PropTypes.shape({}),
};

AddressOverviewTile.defaultProps = {
  labels: PropTypes.shape({ addressBook: {}, labels: {} }),
  addressList: {}
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressOverviewTile);
