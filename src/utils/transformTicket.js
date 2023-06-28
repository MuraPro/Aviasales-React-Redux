import { nanoid } from 'nanoid';

function transformTickets(ticket) {
  return {
    carrier: ticket.carrier,
    price: ticket.price,
    forward: ticket.segments[0],
    forwardDuration: ticket.segments[0].duration,
    backward: ticket.segments[1],
    backwardDuration: ticket.segments[1].duration,
    forwardStops: ticket.segments[0].stops,
    backwardStops: ticket.segments[1].stops,
    fStops: ticket.segments[0].stops.length,
    bStops: ticket.segments[1].stops.length,
    id: nanoid(),
  };
}

export default transformTickets;
