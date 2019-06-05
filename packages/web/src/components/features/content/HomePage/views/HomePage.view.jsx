import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { PropTypes } from 'prop-types';
import { NavBar, Test } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport
const colSize = {
  small: 2,
  medium: 8,
  large: 3,
  xlarge: 3,
};
const offsetRight = {
  small: 2,
  medium: 2,
  large: 4,
  xlarge: 4,
};

const colSize1 = {
  small: 2,
  medium: 8,
  large: 2,
  xlarge: 2,
};

const offsetLeft1 = {
  large: 2,
  xlarge: 2,
};

const colSize2 = {
  small: 2,
  medium: 8,
  large: 1,
  xlarge: 1,
};

const offsetLeft2 = {
  small: 2,
  medium: 2,
};

class HomePageView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalIsOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen,
    });
  }

  render() {
    const { modalIsOpen } = this.state;
    const { links } = this.props;
    return (
      <Fragment>
        <NavBar links={links} />
        <Test className="test" />
        <Grid>
          <Row noFlex>
            <Col isColInlineBlock colSize={colSize} offsetRight={offsetRight}>
              Random line1 takes 3 col in desktop
            </Col>
            <Col isColInlineBlock colSize={colSize} offsetLeft={offsetRight}>
              Random line2 takes 3 col in desktop
            </Col>
            <Col isColInlineBlock colSize={colSize} offsetLeft={offsetRight}>
              Random line3 takes 3 col in desktop
            </Col>
            <Col isColInlineBlock colSize={colSize1} offsetLeft={offsetLeft1}>
              Random line4 takes 2 col in desktop
            </Col>
            <Col isColInlineBlock colSize={colSize2} offsetLeft={offsetLeft2}>
              Random line5 takes 1 col in desktop
            </Col>
          </Row>
          <Row>
            <Col isColInlineBlock colSize={colSize} offsetRight={offsetRight}>
              <h2>Modal Sample</h2>
              <button type="button" onClick={this.toggleModal}>
                Open Modal
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.toggleModal}
                contentLabel="Modal"
                overlayClassName="TCPModal__Overlay"
                className="TCPModal__Content"
                shouldCloseOnEsc
              >
                <h2>Modal Title</h2>
                <p>Modal content goes here...</p>
                <form>
                  <input type="input" placeholder="please start tabbing..." />
                  <br />
                  <br />
                  <button type="button">tab navigation</button>
                  <br />
                  <br />
                  <button type="button">stays</button>
                  <br />
                  <br />
                  <button type="button">inside</button>
                  <br />
                  <br />
                  <button type="button">the modal</button>
                </form>
              </Modal>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

HomePageView.propTypes = {
  links: PropTypes.string.isRequired,
};
export default HomePageView;
