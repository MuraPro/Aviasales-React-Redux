/* eslint-disable */

const filterTickets = (tickArr, usedcheckbox) => {
  return tickArr.filter((current) => {
    if (usedcheckbox.all) return current;
    if (usedcheckbox.without && current.fStops === 0 && current.bStops === 0) return true;
    if ((usedcheckbox.one && current.fStops === 1) || (usedcheckbox.one && current.bStops === 1))
      return true;
    if ((usedcheckbox.two && current.fStops === 2) || (usedcheckbox.two && current.bStops === 2))
      return true;
    if (
      (usedcheckbox.three && current.fStops === 3) ||
      (usedcheckbox.three && current.bStops === 3)
    )
      return true;
    return false;
  });
};

export default filterTickets;
