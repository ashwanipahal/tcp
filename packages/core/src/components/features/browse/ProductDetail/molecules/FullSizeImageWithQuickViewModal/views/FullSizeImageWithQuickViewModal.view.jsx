import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles, { customHeaderStyle } from '../styles/FullSizeImageWithQuickViewModal.style';
import Modal from '../../../../../../common/molecules/Modal';
import ProductImages from '../../../../../../common/organisms/ProductImages';
import { getLocator } from '../../../../../../../utils';
import ProductColorChipsSelector from '../../../../../../common/molecules/ProductColorChipSelector';
import FullSizeImageWithQuickViewConstant from './FullSizeImageWithQuickViewModal.constants';

const FullSizeImageWithQuickViewModal = props => {
  const {
    isMobile,
    onCloseClick,
    name,
    isThumbnailListVisible,
    images,
    colorChipSelector,
    accessibilityLabels,
    ratingsProductId,
  } = props;
  const { selectColor } = colorChipSelector;

  let { colorList } = colorChipSelector;
  colorList = fromJS(colorList);
  return (
    <Modal
      isOpen
      onRequestClose={onCloseClick}
      overlayClassName="TCPModal__Overlay"
      className="TCPModal__Content"
      dataLocatorHeader={getLocator('pdp_product_titles')}
      dataLocator={getLocator('pdp_full_size_image_modal')}
      closeIconDataLocator={getLocator('pdp_zoomed_image_closed_btn')}
      heading={name}
      fixedWidth
      widthConfig={{ small: '375px', medium: '760px', large: '1200px' }}
      heightConfig={{ height: '95%' }}
      inheritedStyles={customHeaderStyle}
    >
      <div className="overlay-content">
        {!isMobile && (
          <form noValidate>
            <Row>
              <Col colSize={{ small: 10, medium: 10, large: 10 }}>
                <div className="select-value-wrapper">
                  {colorList && colorList.size > 0 && (
                    <div className="color-selector">
                      <Field
                        id="colorSwatchModal"
                        name="colorSwatchModal"
                        component={ProductColorChipsSelector}
                        colorFitsSizesMap={colorList}
                        onChange={selectColor}
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </form>
        )}
        <ProductImages
          productName={name}
          isMobile={isMobile}
          images={images}
          isShowBigSizeImages
          isFullSizeVisible={false}
          isFullSizeForTab
          isZoomEnabled={false}
          isThumbnailListVisible={isThumbnailListVisible}
          accessibilityLabels={accessibilityLabels}
          ratingsProductId={ratingsProductId}
        />
      </div>
    </Modal>
  );
};

FullSizeImageWithQuickViewModal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      iconSizeImageUrl: PropTypes.string.isRequired,
      regularSizeImageUrl: PropTypes.string.isRequired,
      bigSizeImageUrl: PropTypes.string.isRequired,
      superSizeImageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** function to call to close this modal */
  onCloseClick: PropTypes.func.isRequired,

  /** Flags if the thumnails should be visible. */
  isThumbnailListVisible: PropTypes.bool,
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  ratingsProductId: PropTypes.string.isRequired,
  colorChipSelector: PropTypes.objectOf(
    PropTypes.shape({
      colorList: PropTypes.array,
      selectColor: PropTypes.func,
    })
  ),
  accessibilityLabels: PropTypes.shape({}),
};

FullSizeImageWithQuickViewModal.defaultProps = {
  isMobile: true,
  isThumbnailListVisible: true,
  colorChipSelector: {},
  accessibilityLabels: {},
};

export default compose(
  connect((state, props) => {
    const formName =
      props.customFormName || FullSizeImageWithQuickViewConstant.FULL_SIZE_QUICK_VIEW_FORM;
    return {
      form: formName,
      enableReinitialize: true,
    };
  }),
  reduxForm()
)(withStyles(FullSizeImageWithQuickViewModal, styles));

export { FullSizeImageWithQuickViewModal as FullSizeImageWithQuickViewModalVanilla };
