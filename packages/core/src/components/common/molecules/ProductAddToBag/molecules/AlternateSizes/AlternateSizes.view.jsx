/** @module AlternateSizes
 * @summary renders a Alternate sizes for products of other category.
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../atoms/Anchor';
import styles from './styles/AlternateSizes.style';
import { BodyCopy } from '../../../../atoms';

// @flow
type Props = {
  className: string,
};

export class AlternateSizes extends React.PureComponent<Props> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonsList: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  render() {
    const { title, buttonsList, className } = this.props;
    return (
      <section className={`${className} alternate-sizes`}>
        <BodyCopy
          className="alternate-sizes-title"
          fontSize="fs12"
          color="gray.900"
          fontFamily="secondary"
        >
          {title}
        </BodyCopy>
        <ul className="alternate-sizes-list">
          {Object.keys(buttonsList).map(item => {
            return (
              <li className="alternate-sizes-keys" key={item}>
                <Anchor
                  asPath={`/p/${buttonsList[item]}`}
                  to={`/p?pid==${buttonsList[item]}`}
                  fontSizeVariation="medium"
                  underline
                >
                  {item}
                </Anchor>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default withStyles(AlternateSizes, styles);

export { AlternateSizes as AlternateSizesVanilla };
