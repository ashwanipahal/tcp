import React from 'react';
import { PropTypes } from 'prop-types';
import OutfitTileStyle from './OutfitTile.style';
import withStyles from '../../../common/hoc/withStyles';
import { BodyCopy, Anchor, Image } from '../../../common/atoms';

const OutfitTile = props => {
  const { className, item, asPath } = props;
  return (
    <div className={`${className}`}>
      <Anchor
        to={`/outfit?outfitId=${item.id}&vendorColorProductIdsList=${item.subItemsId}`}
        asPath={item.pdpUrl}
        title={asPath}
      >
        <Image className="outfit-tile" src={item.imageUrl} />
        <BodyCopy className="shop-look-label" fontFamily="secondary" fontSize="fs12">
          Shop This Look ›
        </BodyCopy>
      </Anchor>
    </div>
  );
};

OutfitTile.propTypes = {
  className: PropTypes.string,
  asPath: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitTile.defaultProps = {
  className: '',
  asPath: '',
  item: {},
};

export default withStyles(OutfitTile, OutfitTileStyle);
