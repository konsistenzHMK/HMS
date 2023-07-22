import React from 'react'

const checkMatchDates = (str1,str2) => {
  const [year1, month1, day1] = str1.split('-');
  const [year2, month2, day2] = str2.split('-');

  if(year1==year2 && month1==month2 && day1==day2) return true;
  return false;
}

export default checkMatchDates
