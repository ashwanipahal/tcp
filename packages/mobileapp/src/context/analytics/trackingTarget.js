import { ACPCore } from '@adobe/react-native-acpcore';
import { transformPageEvent, transformClickEvent } from '../transformEvents';

export function trackingTarget(events) {
  events.forEach(event => {
    if (event.hitType === 'pageView') {
      const { eventName, currentScreen, contextData = {} } = event;
      const transformedEvents = transformPageEvent(currentScreen);
      if (transformedEvents) {
        ACPCore.trackAction(eventName, { ...transformedEvents, ...contextData });
      }
    }
    if (event.hitType === 'click') {
      const { eventName, name, module, contextData = {} } = event;
      const transformedEvents = transformClickEvent(name, module);
      if (transformedEvents) {
        ACPCore.trackAction(eventName, { ...transformedEvents, ...contextData });
      }
    }
  });
}
