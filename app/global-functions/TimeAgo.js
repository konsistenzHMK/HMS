import React from 'react'
import * as MomentFile from '../custom-files/MomentFile'

const TimeAgo = (time) => {
  // Using moment's inbuilt function to get relative time.
  return MomentFile.moment(time).fromNow().toString()
}

export default TimeAgo
