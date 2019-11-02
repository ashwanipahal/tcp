/** @module AlternateSizes
 * @summary renders a Alternate sizes for products of other category.
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from './styles/AlternateSizes.style';

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
        <ul className="alternate-sizes-list">
          <li className="alternate-sizes-title">{title}</li>
          {Object.keys(buttonsList).map(item => {
            return (
              <li className="alternate-sizes-keys" key={item}>
                <a href={buttonsList[item]}>{item}</a>
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
