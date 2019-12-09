import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../Modal';
import Anchor from '../../../../../atoms/Anchor';
import modalstyles from '../styles/SizeChart.style';

class SizeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { sizeChartDetails, labels } = this.props;
    const dataObj = {};
    if (sizeChartDetails && sizeChartDetails.length) {
      const values = sizeChartDetails.split('|');
      for (let indx = 0; indx < values.length; indx += 1) {
        dataObj[`data-l${+(indx + 1)}`] = values[indx].toLowerCase();
      }
    }

    return (
      <>
        <Anchor href="" className="size-chart" {...dataObj} onClick={this.toggleModal}>
          {labels.sizeChart}
        </Anchor>
        <Modal
          isOpen={isOpen}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content"
          fixedWidth
          fullWidth
          onRequestClose={this.toggleModal}
          widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
          heightConfig={{ minHeight: '534px', height: '620px', maxHeight: '650px' }}
          headingAlign="center"
          stickyHeader
          heading={labels.sizeChart}
          stickyCloseIcon
          horizontalBar={false}
          inheritedStyles={modalstyles}
        >
          This is size chart modal
        </Modal>
      </>
    );
  }
}

SizeChart.propTypes = {
  sizeChartDetails: PropTypes.string,
  labels: PropTypes.shape({}),
};

SizeChart.defaultProps = {
  sizeChartDetails: '',
  labels: {
    sizeChart: 'Size Chart',
  },
};

export default SizeChart;
