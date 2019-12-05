import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../Modal';
import { BodyCopy } from '../../../../../../../../styles/themes/TCP/typotheme';
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
    const { sizeChartDetails } = this.props;
    const dataObj = {};
    if (sizeChartDetails && sizeChartDetails.length) {
      const values = sizeChartDetails.split('|');
      for (let indx = 0; indx < values.length; indx += 1) {
        dataObj[`data-l${+(indx + 1)}`] = values[indx].toLowerCase();
      }
    }

    return (
      <>
        <BodyCopy className="size-chart" {...dataObj} onClick={this.toggleModal}>
          Size Chart
        </BodyCopy>
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
          heading="Size Chart"
          stickyCloseIcon
          horizontalBar={false}
          inheritedStyles={modalstyles}
          contentLabel="Size chart modal"
        >
          This is size chart modal
        </Modal>
      </>
    );
  }
}

SizeChart.propTypes = {
  sizeChartDetails: PropTypes.string,
};

SizeChart.defaultProps = {
  sizeChartDetails: '',
};

export default SizeChart;
