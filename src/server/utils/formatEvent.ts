import type { ClientEvent, ServerEvent } from "src/types";
import totalUniqueRSVPs from "src/utils/totalUniqueRsvps";

// all events in the input array have the same hash
const formatEvent = (event: Array<ServerEvent>): ClientEvent => {
  if (event.length === 0) {
    throw new Error("[utils/formatEvent] input event array empty");
  }
  const firstInSeries = event[0];
  if (!firstInSeries) {
    throw new Error("firstInSeries undefined");
  }
  const { startDateTime, endDateTime } = firstInSeries;

  return {
    ...firstInSeries,
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    totalUniqueRsvps: totalUniqueRSVPs(event),
    sessions: event.map((e) => {
      const { id, startDateTime, endDateTime, limit, rsvps } = e;
      return {
        id,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        limit,
        rsvps,
        rsvpCount: rsvps.length,
        availableSeats: limit - rsvps.length > 0 ? limit - rsvps.length : 0,
        noLimit: limit === 0,
      };
    }),
  };
};

// all events in the input array have different hashes
export const formatEvents = (events: Array<ServerEvent>): Array<ClientEvent> =>
  events.map((event) => formatEvent([event]));

export default formatEvent;
