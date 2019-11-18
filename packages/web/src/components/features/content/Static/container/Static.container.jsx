import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Static from '../views/Static.view';

Static.propTypes = {
  slots: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}),
};

Static.defaultProps = {
  labels: {},
};

const mapStateToProps = (state, props) => {
  // TO DO - Replace the mock with the state.
  const { urlPath } = props;
  const { Layouts, Modules } = state;
  const contentSlots = Layouts && Layouts[urlPath] ? Layouts[urlPath].slots : [];
  return {
    slots: contentSlots.map(slot => {
      const { contentId: slotContent = '' } = slot;
      const contentIds = slotContent && slotContent.split(',');
      if (contentIds && contentIds.length > 1) {
        const response = {
          ...slot,
          data: {
            slot: [],
          },
        };

        contentIds.forEach(contentId => {
          response.data.slot.push(Modules[contentId]);
        });

        return response;
      }
      return {
        ...slot,
        data: Modules[slot.contentId],
      };
    }),
  };
};

export default connect(mapStateToProps)(Static);
