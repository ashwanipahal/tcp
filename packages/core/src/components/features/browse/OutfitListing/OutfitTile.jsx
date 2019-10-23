import React from 'react';
import { PropTypes } from 'prop-types';
import OutfitTileStyle from './OutfitTile.style';
import withStyles from '../../../common/hoc/withStyles';
import { BodyCopy, Anchor, Image } from '../../../common/atoms';
// import DamImage from '../../../common/atoms/BodyCopy';

const OutfitTile = props => {
  const { className, item, asPath, labels } = props;

  //  for DAM
  // const imgData = {
  //   alt: asPath,
  //   url: item.imageUrl,
  // };

  return (
    <div className={`${className}`}>
      <Anchor
        to={`/outfit?outfitId=${item.id}&vendorColorProductIdsList=${item.subItemsId}`}
        asPath={item.pdpUrl}
        title={asPath}
      >
        {/* TO DO - image from DAM
        <DamImage className="outfit-tile" imgData={imgData} isProductPage />
        */}
        <Image className="outfit-tile" src={item.imageUrl} />
        <BodyCopy className="shop-look-label" fontFamily="secondary" fontSize="fs12">
          {labels.lbl_outfit_shop_this_look}
        </BodyCopy>
      </Anchor>
    </div>
  );
};

OutfitTile.propTypes = {
  className: PropTypes.string,
  asPath: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitTile.defaultProps = {
  className: '',
  asPath: '',
  item: {},
  labels: {},
};

export default withStyles(OutfitTile, OutfitTileStyle);
