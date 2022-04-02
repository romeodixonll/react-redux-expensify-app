/** @format */

//set_text_filter
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});
//Sort_by_date
export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});
//Sort_by_amount
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});
//Set_start_date
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate,
});
//Set_end_date
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate,
});
