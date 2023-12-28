import moment from 'moment'
import { formatDistance, format, differenceInDays } from 'date-fns'
export const formatTimeAgo = dateString => {
  const dateMoment = moment(dateString) // Parse the timestamp in the user's local timezone
  const now = moment() // Get the current time in the user's local timezone

  const diffDays = now.diff(dateMoment, 'days')

  console.log(diffDays)

  // GET BOTH DATES!
  const inputDate = new Date(dateString)
  const todayDate = new Date()

  const formattedDate = inputDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const formattedDate2 = todayDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  if (formattedDate === formattedDate2) {
    return dateMoment.format('hh:mm A')
  }

  console.log(formattedDate, formattedDate2)
  if (diffDays === 1 || (diffDays === 0 && dateMoment.date() !== now.date())) {
    // Yesterday: Show 'Yesterday'
    return 'Yesterday'
  } else {
    // More than 48 hours ago: Format as MM/DD/YYYY
    return dateMoment.format('MM/DD/YYYY')
  }
}
