/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { sortByAmount } from '../actions/filters';
import { sortByDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import { setStartDate } from '../actions/filters';
import { setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => {
    this.props.dispatch(setStartDate(startDate))
    this.props.dispatch(setEndDate(endDate))
    
  }
  onFocusChange = (calendarFocused) => [
    this.setState(()=>({calendarFocused}))
  ]
  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.filters.text}
          onChange={(e) => {
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={(e) => {
            this.props.dispatch(
              e.target.value === 'amount' ? sortByAmount() : sortByDate()
            );
          }}>
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
        </select>
        <DateRangePicker
          startDate= {this.props.filters.startDate}
          endDate = {this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput ={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={()=>false}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
