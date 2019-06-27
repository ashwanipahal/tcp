import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';
import { Col, Image, Row } from '../../../atoms';
import { Carousel } from '../..';
import ModuleHHeader from './ModuleHHeader';
import ModuleHCTALinks from './ModuleHCTALinks';
import style from '../ModuleH.style';
import config from '../config';

const fullBleed = {
  small: true,
  medium: false,
  large: false,
};

const colSize = {
  small: 6,
  medium: 8,
  large: 12,
};

const offsetLeft = {
  small: 0,
  medium: 1,
  large: 1,
};

class ModuleH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      next: 0,
    };
  }

  render() {
    const {
      className,
      composites: { divCTALinks, headerText },
    } = this.props;
    const carouselConfig = config.CAROUSEL_OPTIONS;
    carouselConfig.beforeChange = (current, next) => {
      this.setState({ current, next });
    };
    const { current, next } = this.state;

    return (
      <Row fullBleed={fullBleed} className={`${className} moduleH`}>
        <Col colSize={colSize} offsetLeft={offsetLeft} className="moduleH__header--wrapper">
          <ModuleHHeader headerText={headerText} />
          <ModuleHCTALinks dataCTALinks={divCTALinks} currentIndex={{ current, next }} />
        </Col>
        <Col colSize={colSize}>
          <Carousel
            options={carouselConfig}
            autoplay
            carouselConfig={{
              type: 'light',
              arrow: 'none',
            }}
          >
            {divCTALinks.map((item, index) => {
              return <Image key={index.toString()} alt={item.image.alt} src={item.image.url} />;
            })}
          </Carousel>
        </Col>
      </Row>
    );
  }
}

ModuleH.propTypes = {
  className: PropTypes.string.isRequired,
  composites: PropTypes.shape({
    divCTALinks: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})])
      )
    ),
    headerText: PropTypes.shape({
      textLines: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      ),
    }),
  }).isRequired,
};

export default errorBoundary(withStyles(ModuleH, style));
export { ModuleH as ModuleHVanilla };
