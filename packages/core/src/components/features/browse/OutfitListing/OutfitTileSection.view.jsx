import React from 'react';
import { PropTypes } from 'prop-types';
import OutfitTileSectionStyle from './OutfitTileSection.style';
import withStyles from '../../../common/hoc/withStyles';
import BodyCopy from '../../../common/atoms/BodyCopy';
import OutfitTile from './OutfitTile';

const getOutfitTile = (outfitTile, asPath, className) => {
  return (
    outfitTile &&
    outfitTile.map(item => <OutfitTile className={className} item={item} asPath={asPath} />)
  );
};

const OutfitTileSection = props => {
  const { className, asPath, outfitDetails } = props;
  const outfitTile = outfitDetails[asPath];

  return (
    <div className={className}>
      <BodyCopy
        className="outfit-title"
        fontSize="fs16"
        fontFamily="secondary"
        fontWeight="semibold"
      >
        OUTFITS
      </BodyCopy>
      <div className={`${className} outfit-section-wrapper`}>
        {getOutfitTile(outfitTile, asPath)}
      </div>
    </div>
  );
};

OutfitTileSection.propTypes = {
  className: PropTypes.string,
  asPath: PropTypes.string,
  outfitDetails: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array])),
};

OutfitTileSection.defaultProps = {
  className: '',
  asPath: '',
  outfitDetails: {},
};

export default withStyles(OutfitTileSection, OutfitTileSectionStyle);
