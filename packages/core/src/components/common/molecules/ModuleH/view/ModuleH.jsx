// @flow
import React from 'react';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';
import { Col, Image, Row } from '../../../atoms';
import { Carousel } from '../..';
import ModuleHHeader from './ModuleH.Header';
import ModuleHCTALinks from './ModuleH.Links';
import style from '../ModuleH.style';
import config from '../config';

type Props = {
  className: string,
  composites: Object,
};

type State = {
  current: number,
  next: number,
};

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
class ModuleH extends React.PureComponent<Props, State> {
  constructor(props: Object) {
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
    const { CAROUSEL_OPTIONS, COL_SIZE, FULL_BLEED, OFFSET_LEFT } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ current, next });
    };
    const { current, next } = this.state;

    return (
      <Row fullBleed={FULL_BLEED} className={`${className} moduleH`}>
        <Col colSize={COL_SIZE} offsetLeft={OFFSET_LEFT} className="moduleH__header--wrapper">
          <ModuleHHeader headerText={headerText} />
          <ModuleHCTALinks dataCTALinks={divCTALinks} currentIndex={{ current, next }} />
        </Col>
        <Col colSize={COL_SIZE}>
          <Carousel options={CAROUSEL_OPTIONS} carouselConfig={{ type: 'light' }}>
            {divCTALinks.map((item, index) => {
              return <Image key={index.toString()} alt={item.image.alt} src={item.image.url} />;
            })}
          </Carousel>
        </Col>
      </Row>
    );
  }
}

export default errorBoundary(withStyles(ModuleH, style));
export { ModuleH as ModuleHVanilla };
