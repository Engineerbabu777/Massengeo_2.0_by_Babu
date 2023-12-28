import moment from 'moment'
import { formatDistance, format } from 'date-fns';
export const formatTimeAgoMoment = dateString => {
  const date = new Date(dateString)
  const now = new Date()

  const diffSeconds = Math.round((now - date) / 1000)
  const diffMinutes = Math.round(diffSeconds / 60)
  const diffHours = Math.round(diffMinutes / 60)

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  } else {
    return format(date, 'HH:mm')
  }
}
