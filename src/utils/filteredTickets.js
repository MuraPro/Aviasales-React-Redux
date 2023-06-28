function filterTickets(arr, usedcheckbox) {
  return arr.filter((current) => {
    if (usedcheckbox.all) return current;
    if (usedcheckbox.without && current.fStops === 0 && current.bStops === 0) return true;
    if (usedcheckbox.one && current.fStops === 1 && current.bStops === 1) return true;
    if (usedcheckbox.two && current.fStops === 2 && current.bStops === 2) return true;
    if (usedcheckbox.three && current.fStops === 3 && current.bStops === 3) return true;
    return false;
  });
}

export default filterTickets;
