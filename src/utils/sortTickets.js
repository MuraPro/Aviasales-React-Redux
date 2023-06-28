function sortTickets(items, filters) {
  return items.sort((a, b) => {
    if (filters === 'cheap') return a.price - b.price;
    if (filters === 'speed') {
      return a.forwardDuration + a.backwardDuration - (b.forwardDuration + b.backwardDuration);
    }
    if (filters === 'optimal') {
      return (
        a.price -
        b.price +
        (a.forwardDuration + a.backwardDuration) -
        (b.forwardDuration + b.backwardDuration)
      );
    }
    return items;
  });
}

export default sortTickets;
