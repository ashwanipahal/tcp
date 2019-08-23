import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

import styles from '../FooterNavLinksList.style';

class FooterNavLinksList extends React.Component<Props> {
  loginModalOpenClick = e => {
    const { setLoginModalMountState } = this.props;
    e.preventDefault();
    if (e.target.href.toLowerCase().indexOf('favorites') > -1) {
      setLoginModalMountState({ state: true });
    }
  };

  render() {
    const { className, listArray, colNum } = this.props;
    return (
      <React.Fragment>
        <ul className={`${className} list`}>
          {listArray.map((linkItems, index) => (
            <li>
              <Anchor
                id={linkItems.title.replace(/ /g, '')}
                className={className}
                noLink
                to={linkItems.url}
                anchorVariation="primary"
                fontSizeVariation="large"
                data-locator={`col_${colNum}_link_${index}`}
                target={linkItems.target}
                title={linkItems.title}
                onClick={e => this.loginModalOpenClick(e)}
              >
                {linkItems.text}
              </Anchor>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

FooterNavLinksList.propTypes = {
  className: PropTypes.string.isRequired,
  listArray: PropTypes.shape([]).isRequired,
  colNum: PropTypes.number.isRequired,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
