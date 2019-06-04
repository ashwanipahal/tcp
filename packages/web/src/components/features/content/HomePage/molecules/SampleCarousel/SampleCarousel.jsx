import React from 'react';
import { PropTypes } from 'prop-types';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';

const styles = {
  wrapper: {
    padding: '0 50px',
  },
  card: {
    backgroundColor: '#5f9ea0',
    textAlign: 'center',
  },
  item: {
    fontSize: 30,
    lineHeight: '100px',
    padding: 20,
    margin: 10,
  },
};

const SampleCarousel = ({ autoplaySpeed }) => {
  return (
    <Carousel options={{ autoplaySpeed }}>
      <div>
        <div style={styles.card}>
          <h3 style={styles.item}>Slide item 1</h3>
        </div>
      </div>
      <div>
        <div style={styles.card}>
          <h3 style={styles.item}>Slide item 2</h3>
        </div>
      </div>
      <div>
        <div style={styles.card}>
          <h3 style={styles.item}>Slide item 3</h3>
        </div>
      </div>
      <div>
        <div style={styles.card}>
          <h3 style={styles.item}>Slide item 4</h3>
        </div>
      </div>
    </Carousel>
  );
};

SampleCarousel.propTypes = {
  autoplaySpeed: PropTypes.number.isRequired,
};

export default SampleCarousel;
