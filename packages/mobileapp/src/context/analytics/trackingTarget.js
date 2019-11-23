import { ACPCore } from '@adobe/react-native-acpcore';
import { transformPageEvent, transformClickEvent } from '../transformEvents';

export function trackingTarget(events) {
  events.forEach(event => {
    if (event.hitType === 'pageView') {
      const { currentScreen, eventName } = event;
      const transformedEvents = transformPageEvent(currentScreen);
      if (transformedEvents) {
        ACPCore.trackAction(eventName, transformedEvents);
      }
    }
    if (event.hitType === 'click') {
      const { eventName, name, module, contextData = {} } = event;
      const transformedEvents = { ...transformClickEvent(name, module), ...contextData };
      ACPCore.trackAction(eventName, transformedEvents);
    }
  });
}
