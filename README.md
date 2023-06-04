function Filter({ allTickets, checkAllTickets }) {
return (

<div className={classes.Filter}>
<div className={classes.Title}>Количество пересадок</div>
<form action="">
<ul className={classes.List}>
<li>
<label htmlFor="all-stops" className={classes.Item}>
<input
type="checkbox"
name=""
id="all-stops"
checked={allTickets}
onChange={() => checkAllTickets()}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
Все
</label>
</li>
<li>
<label htmlFor="without-stops" className={classes.Item}>
<input
type="checkbox"
name=""
id="without-stops"
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
/>
<span className={classes.CustomCheckbox} />
Без пересадок
</label>
</li>
<li>
<label htmlFor="one-stop" className={classes.Item}>
<input
type="checkbox"
name=""
id="one-stop"
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
/>
<span className={classes.CustomCheckbox} />1 пересадка
</label>
</li>
<li>
<label htmlFor="two-stops" className={classes.Item}>
<input
type="checkbox"
name=""
id="two-stops"
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
/>
<span className={classes.CustomCheckbox} />2 пересадки
</label>
</li>
<li>
<label htmlFor="three-stops" className={classes.Item}>
<input
type="checkbox"
name=""
id="three-stops"
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
/>
<span className={classes.CustomCheckbox} />3 пересадки
</label>
</li>
</ul>
</form>
</div>
);
}

const checkboxs = [
{ name: 'all', label: 'Все', checked: false },
{ name: 'without-stops', label: 'Без пересадок' },
{ name: 'one-stop', label: '1 пересадка', checked: false },
{ name: 'two-stops', label: '2 пересадки', checked: false },
{ name: 'three-stops', label: '3 пересадки', checked: false },
];

const tabs = checkboxs.map(({ name, label, checked }) => {
const isActive = name === checkboxFiters;
checked = isActive ? 'true' : 'false';
return (

<li key={name}>
<label htmlFor={name} className={classes.Item}>
<input
type="checkbox"
name={name}
id={name}
checked={checked}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
{label}
</label>
</li>
);
});

//=================================
/_ eslint-disable _/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withAviasalesService } from '../Hoc';
import classes from './Item-filter.module.scss';

function Filter({ onCheckboxFilterChange, checkboxFiters }) {
const [process, setprocess] = useState([
{ id: 0, name: 'ONe', status: false },
{ id: 1, name: 'two', status: false },
{ id: 2, name: 'three', status: false },
{ id: 3, name: 'four', status: false },
{ id: 4, name: 'five', status: false },
]);
return (

<div className={classes.Filter}>
<div className={classes.Title}>Количество пересадок</div>
<form action="">
<ul className={classes.List}>
<li>
<label htmlFor="all" className={classes.Item}>
<input
type="checkbox"
name="all"
id="all"
checked={checkboxFiters}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
Все
</label>
</li>
<li>
<label htmlFor="without-stops" className={classes.Item}>
<input
type="checkbox"
name="without-stops"
id="without-stops"
checked={checkboxFiters}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
Без пересадок
</label>
</li>
<li>
<label htmlFor="one-stop" className={classes.Item}>
<input
type="checkbox"
name="one-stop"
id="one-stop"
checked={checkboxFiters}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />1 пересадка
</label>
</li>
<li>
<label htmlFor="two-stops" className={classes.Item}>
<input
type="checkbox"
name="two-stops"
id="two-stops"
checked={checkboxFiters}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />2 пересадки
</label>
</li>
<li>
<label htmlFor="three-stops" className={classes.Item}>
<input
type="checkbox"
name="three-stops"
id="three-stops"
checked={checkboxFiters}
onChange={() => onCheckboxFilterChange(name)}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />3 пересадки
</label>
</li>
</ul>
</form>
</div>
);
}

function mapMethodsToProps(data) {
return {
checkboxFiters: data.checkboxFiters,
onCheckboxFilterChange: data.onCheckboxFilterChange,
};
}

Filter.propTypes = {
checkboxFiters: PropTypes.string,
onCheckboxFilterChange: PropTypes.func,
};

export default withAviasalesService(mapMethodsToProps)(Filter);

//==============================================
/_ eslint-disable _/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withAviasalesService } from '../Hoc';
import classes from './Item-filter.module.scss';

function Filter({
onCheckboxFilterChange,
checkboxFiters,
onTicketsClear,
onCheckboxChange,
allChecked,
}) {
const [process, setprocess] = useState([
{ name: 'without-stops', label: 'Без пересадок', checked: false },
{ name: 'one-stop', label: '1 пересадка', checked: false },
{ name: 'two-stops', label: '2 пересадки', checked: false },
{ name: 'three-stops', label: '3 пересадки', checked: false },
]);

function handleCheckbox(e) {
setprocess(
process.map((item) =>
item.name === e.target.id ? { ...item, checked: !item.checked } : item,
),
);

    onCheckboxFilterChange(e.target.name, e.target.checked);

}

function handleCheckboxAll(e) {
onCheckboxFilterChange(e.target.name, e.target.checked);
}

const customLi = (

<li key={'all'}>
<label htmlFor={'all'} className={classes.Item}>
<input
type="checkbox"
name={'all'}
id={'all'}
checked={allChecked}
onChange={handleCheckboxAll}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
Все
</label>
</li>
);

const tabs = process.map(({ name, label, checked }) => {
return (

<li key={name}>
<label htmlFor={name} className={classes.Item}>
<input
type="checkbox"
name={name}
id={name}
checked={checked}
onChange={handleCheckbox}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
{label}
</label>
</li>
);
});

return (

<div className={classes.Filter}>
<div className={classes.Title}>Количество пересадок</div>
<form action="">
<ul className={classes.List}>
{customLi}
{tabs}
</ul>
</form>
</div>
);
}

function mapMethodsToProps(data) {
return {
allChecked: data.allChecked,
onCheckboxChange: data.onCheckboxChange,
checkboxFiters: data.checkboxFiters,
onTicketsClear: data.onTicketsClear,
onCheckboxFilterChange: data.onCheckboxFilterChange,
};
}

Filter.propTypes = {
allChecked: PropTypes.bool,
onCheckboxChange: PropTypes.func,
checkboxFiters: PropTypes.string,
onCheckboxFilterChange: PropTypes.func,
onTicketsClear: PropTypes.func,
};

export default withAviasalesService(mapMethodsToProps)(Filter);

!=============================================

/_ eslint-disable _/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withAviasalesService } from '../Hoc';
import classes from './Item-filter.module.scss';

function Filter({ onCheckboxFilterChange, mark }) {
const [process, setprocess] = useState([
{ name: 'without-stops', label: 'Без пересадок', flag: true },
{ name: 'one-stop', label: '1 пересадка', flag: true },
{ name: 'two-stops', label: '2 пересадки', flag: true },
{ name: 'three-stops', label: '3 пересадки', flag: true },
]);

function heandlerCheckboxs(e) {
setprocess(
process.map((item) => (item.name === e.target.id ? { ...item, flag: !item.flag } : item)),
);
onCheckboxFilterChange(e.target.name);
}

function heandlerAllCheckbox(e) {
onCheckboxFilterChange(e.target.name);

    e.target.checked
      ? setprocess(
          process.map((item) => {
            return { ...item, flag: true };
          }),
        )
      : setprocess(
          process.map((item) => {
            return { ...item, flag: false };
          }),
        );

}

const customCheckBox = (
<li>
<label htmlFor="all" className={classes.Item}>
<input
type="checkbox"
name="all"
id="all"
checked={mark}
onChange={heandlerAllCheckbox}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
tabIndex={1}
/>
<span className={classes.CustomCheckbox} />
Все
</label>
</li>
);

const list = process.map(({ name, label, flag }) => {
return (
<li key={name}>
<label htmlFor={name} className={classes.Item}>
<input
type="checkbox"
name={name}
id={name}
checked={flag}
onChange={heandlerCheckboxs}
className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
/>
<span className={classes.CustomCheckbox} />
{label}
</label>
</li>
);
});

return (
<div className={classes.Filter}>
<div className={classes.Title}>Количество пересадок</div>
<form action="">
<ul className={classes.List}>
{customCheckBox}
{list}
</ul>
</form>
</div>
);
}

function mapMethodsToProps(data) {
return {
mark: data.mark,
onCheckboxChange: data.onCheckboxChange,
checkboxFiters: data.checkboxFiters,
onTicketsClear: data.onTicketsClear,
onCheckboxFilterChange: data.onCheckboxFilterChange,
};
}

Filter.propTypes = {
mark: PropTypes.bool,
onCheckboxChange: PropTypes.func,
checkboxFiters: PropTypes.string,
onCheckboxFilterChange: PropTypes.func,
onTicketsClear: PropTypes.func,
};

export default withAviasalesService(mapMethodsToProps)(Filter);
