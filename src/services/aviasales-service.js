/* eslint-disable */
import { nanoid } from 'nanoid';

export default class AviasalesService {
  apiBase = 'https://aviasales-test-api.kata.academy';

  getResource = async (url) => {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    if (res.status === 500) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return res.json();
  };

  getTickets = async () => {
    let isNotLastTicketsPack = true;
    while (isNotLastTicketsPack) {
      const { searchId } = await this.getResource(`/search`);
      const data = await this.getResource(`/tickets?searchId=${searchId}`);
      const { tickets, stop } = await data;
      if (stop) isNotLastTicketsPack = false;
      return tickets.map((ticket, stop) => this.transformTickets(ticket, stop));
    }
  };

  transformTickets = (ticket, stop) => {
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
      stop: stop,
    };
  };
}
