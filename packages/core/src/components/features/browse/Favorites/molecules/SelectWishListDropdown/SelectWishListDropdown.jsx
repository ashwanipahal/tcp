/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Button, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../../common/hoc/withStyles';
import { CreateWishList } from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';
import styles from '../../styles/SelectWishListDropdown.style';

class SelectWishListDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMoveItemOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * This function closes the select fav list container on click
   * @param {object} event
   */
  handleClickOutside = event => {
    const { isMoveItemOpen } = this.state;
    const openItem = document.querySelector('.choose-list-section');
    const isChildren = openItem && openItem.contains(event.target);
    if (!isChildren && !event.target.classList.contains('choose-list-button') && isMoveItemOpen) {
      this.setState({
        isMoveItemOpen: false,
      });
    }
  };

  /**
   * This function opens choose list drop down
   */
  openMoveItem = () => {
    this.setState(prevState => ({
      isMoveItemOpen: !prevState.isMoveItemOpen,
    }));
  };

  renderMoveItem = () => {
    const {
      wishlistsSummaries,
      labels,
      createNewWishList,
      getActiveWishlist,
      activeWishList,
      defaultWishList,
      openAddNewList,
      openEditList,
    } = this.props;
    const { isMoveItemOpen } = this.state;
    const accordianIcon = isMoveItemOpen
      ? getIconPath('up_arrow_icon')
      : getIconPath('down_arrow_icon');

    const defaultList = defaultWishList[0];

    const showDefaultHeartIcon = activeWishList && activeWishList.id === defaultList.id;
    return (
      wishlistsSummaries &&
      wishlistsSummaries.length > 0 && (
        <>
          <div className="choose-list-container">
            <Button className="choose-list-button" onClick={this.openMoveItem}>
              {activeWishList ? activeWishList.displayName : defaultList.displayName}
              {showDefaultHeartIcon ? (
                <Image
                  alt="Default Favourite List"
                  src={getIconPath('added-to-favorite')}
                  className="fav-list-heart-icon"
                />
              ) : (
                ''
              )}
              <Image
                alt="accordian button"
                className="accordian-item-arrow icon-small"
                src={accordianIcon}
                data-locator="accordian-icon"
                height="6px"
              />
            </Button>
            {isMoveItemOpen && (
              <div className="choose-list-section">
                <CreateWishList
                  labels={labels}
                  wishlistsSummaries={wishlistsSummaries}
                  createNewWishList={createNewWishList}
                  getActiveWishlist={getActiveWishlist}
                  activeWishListId={activeWishList.id}
                  openAddNewList={openAddNewList}
                />
              </div>
            )}
          </div>
          <div className="edit-settting-container">
            <Button
              buttonVariation="fixed-width"
              type="button"
              className="edit-setting-btn"
              onClick={openEditList}
            >
              {labels.lbl_fav_editListSettings}
            </Button>
          </div>
        </>
      )
    );
  };

  render() {
    const { className } = this.props;
    return (
      <>
        <div className={className}>{this.renderMoveItem()}</div>
      </>
    );
  }
}

SelectWishListDropdown.propTypes = {
  wishlistsSummaries: PropTypes.arrayOf({}),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  createNewWishList: PropTypes.func.isRequired,
  getActiveWishlist: PropTypes.func.isRequired,
  className: PropTypes.string,
  activeWishList: PropTypes.shape({}),
  defaultWishList: PropTypes.shape([]),
  openAddNewList: PropTypes.func.isRequired,
  openEditList: PropTypes.func.isRequired,
};

SelectWishListDropdown.defaultProps = {
  wishlistsSummaries: [],
  className: '',
  activeWishList: {},
  defaultWishList: [],
};

export default withStyles(SelectWishListDropdown, styles);
