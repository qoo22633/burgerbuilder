import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: salad(1)</p>
        <p>Total <strong>USD </strong></p>
    </div>
);

export default order;