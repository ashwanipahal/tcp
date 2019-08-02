import React from 'react'; //eslint-disable-line
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/RewardsPoints.view.style';

// @flow
// type Props = {
//   navData: Array<Object>,
//   mainContent: Function,
//   active: string,
//   className: string,
//   router: object,
//   labels: object,
// };

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
const MyAccountLayoutView = (props: Props) => {
  const { className, pointsToNextReward, currentPoints, totalRewards } = props;
  return (
    <div className={className}>
      <div className="divWidth">
        <Row>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <BodyCopy fontFamily="secondary" fontSize="fs14">
              {`Current Points: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {currentPoints}
              </BodyCopy>
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 8, medium: 5, small: 4 }}>
            <BodyCopy component="p" fontFamily="secondary" fontSize="fs14">
              {`My Rewards: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {`$`}
                {totalRewards && Math.trunc(totalRewards)}
              </BodyCopy>
            </BodyCopy>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ large: 12, medium: 8, small: 6 }}>
            <div className="progress-container elem-mt-MED elem-mt-MED elem-mb-SM">
              <div className="progressbar-rewards" style={{ width: `${currentPoints}%` }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ large: 12, medium: 8, small: 6 }}>
            <BodyCopy fontFamily="secondary" fontSize="fs14">
              {`Points to your next reward: `}
              <BodyCopy component="span" fontWeight="black" fontFamily="secondary" fontSize="fs14">
                {pointsToNextReward}
              </BodyCopy>
            </BodyCopy>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withStyles(MyAccountLayoutView, styles);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
