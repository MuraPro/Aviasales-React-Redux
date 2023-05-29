import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import classes from './Item-list-card.module.scss';

import { getStartTime, getEndTime, getTravelTime, getStops } from '../../utils/getTime';

function CardView({ ticket }) {
  const {
    carrier,
    price,
    forward: { origin, destination, date },
    forwardDuration,
    backward,
    backwardDuration,
    forwardStops,
    backwardStops,
    forwardStopsLength,
    backwardStopsLength,
  } = ticket;

  return (
    <>
      <div className={classes.GridRow}>
        <span className={classes.Price}>{price}Р</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="s7 logo" className={classes.Logo} />
      </div>
      <div className={classnames(classes.GridRow, classes.Forward)}>
        <div>
          <p className={classes.TextSecondary}>
            {origin} – {destination}
          </p>
          <p>
            {getStartTime(date)} – {getEndTime(date, forwardDuration)}
          </p>
        </div>
        <div>
          <p className={classes.TextSecondary}>В пути</p>
          <p>{getTravelTime(forwardDuration)}</p>
        </div>
        <div>
          <p className={classes.TextSecondary}>{getStops(forwardStopsLength)}</p>
          <p>{forwardStops.join(', ')}</p>
        </div>
      </div>
      <div className={classes.GridRow}>
        <div>
          <p className={classes.TextSecondary}>
            {backward.origin} – {backward.destination}
          </p>
          <p>
            {getStartTime(backward.date)} – {getEndTime(backward.date, backwardDuration)}
          </p>
        </div>
        <div>
          <p className={classes.TextSecondary}>В пути</p>
          <p>{getTravelTime(backwardDuration)}</p>
        </div>
        <div>
          <p className={classes.TextSecondary}>{getStops(backwardStopsLength)}</p>
          <p>{backwardStops.join(', ')}</p>
        </div>
      </div>
    </>
  );
}

CardView.propTypes = {
  ticket: PropTypes.object,
};
export default CardView;
