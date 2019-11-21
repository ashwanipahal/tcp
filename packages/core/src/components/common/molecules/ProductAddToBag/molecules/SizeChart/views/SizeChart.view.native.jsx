import React from 'react';
import { Text } from 'react-native';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import Modal from '../../../../Modal';
import { SizeChartButton } from '../styles/SizeChart.style.native';

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
    return (
      <>
        <SizeChartButton>
          <Anchor
            nolink
            href="#"
            accessibilityRole="link"
            accessibilityLabel="Size Chart"
            text="Size Chart"
            anchorVariation="custom"
            onPress={this.toggleModal}
            colorName="gray.900"
            fontSizeVariation="medium"
            centered
            underline
          />
        </SizeChartButton>
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
        >
          <Text>This is size chart modal</Text>
        </Modal>
      </>
    );
  }
}

export default SizeChart;
