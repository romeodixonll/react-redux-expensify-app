/** @format */

import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Add_expense
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  create_at = 0,
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    create_at,
  },
});

//Remove_expense
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

//Edit_expense
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

//set_text_filter
const setTextFilter = (text = '') =>( {
  type: 'SET_TEXT_FILTER',
  text
})
//Sort_by_date
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
 
    
})
//Sort_by_amount
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  
});
//Set_start_date
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})
//Set_end_date
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
//Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
      
        } else {
          return expense;
        }
      });
    
  
    default:
      return state;
  }
};

//Filter Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date', //date or amount
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
        
      }
    
    case 'SORT_BY_DATE':
      return {
        ...state, 
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    
    case 'SET_START_DATE':
      return {
        ...state, 
        startDate:action.startDate
      }
    case 'SET_END_DATE':
        return {
          ...state,
          endDate: action.endDate,
        };
    default:
      return state;
  }
};

//timestamps(milliseconds)
//january 1st 1970(unix epoch)
//

//Get visible expenses
const getVisisbleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.create_at >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.create_at <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.create_at < b.create_at ? 1:-1
    }else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1:-1
    }
  })
}

//Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState()
  const visisbleExpenses = getVisisbleExpenses(state.expenses, state.filters)
  console.log(visisbleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 300, create_at:-21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'coffee', amount: 100, create_at:-1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));


const demoState = {
  expenses: [
    {
      id: 'asldknfasdfn',
      description: 'january rent',
      note: 'this is the final payment for this address',
      amount: 54500,
      create_at: 0,
    },
  ],

  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
