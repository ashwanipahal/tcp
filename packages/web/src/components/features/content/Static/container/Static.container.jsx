import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createLayoutPath } from '@tcp/core/src/utils';
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
  const {
    router: {
      query: { contentType },
    },
  } = props;
  const urlPath = contentType && createLayoutPath(contentType);
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

export default withRouter(connect(mapStateToProps)(Static));
