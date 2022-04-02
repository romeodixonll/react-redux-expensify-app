/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createAt, id }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>

      <p>
        {amount} - {createAt}
      </p>
    </div>
  );
};

export default ExpenseListItem;
