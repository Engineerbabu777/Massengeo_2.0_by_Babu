

import moment from 'moment';

export const formatTimeAgoMoment = (dateString) => moment(dateString).fromNow();