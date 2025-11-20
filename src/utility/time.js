import moment from "moment";

export function getTimeDiff(timestamp) {
  if (!timestamp) {
    return {
      diffSeconds: 0,
      diffMinutes: 0,
      diffHours: 0,
      diffDays: 0,
      diffWeeks: 0
    }
  }  

  const now = moment()
  const createdAt = moment(timestamp)
  const diffSeconds = now.diff(createdAt, 'seconds');
  const diffMinutes = now.diff(createdAt, 'minutes');
  const diffHours = now.diff(createdAt, 'hours');
  const diffDays = now.diff(createdAt, 'days');
  const diffWeeks = now.diff(createdAt, 'weeks');

  return {
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
    diffWeeks
  }
}

export function timeAgo(timestamp) {
  const { diffSeconds, diffMinutes, diffHours, diffDays, diffWeeks } = getTimeDiff(timestamp)

  if (diffSeconds < 60) {
    return `${diffSeconds}s`
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`
  } else if (diffHours < 24) {
    return `${diffHours}h`
  } else if (diffDays < 7) {
    return `${diffDays}d`
  } else {
    return `${diffWeeks}w`
  }
}

export function timeAgoGeneral(timestamp) {
  if (!timestamp) {
    return 'never'
  } else {
    const { diffSeconds, diffMinutes, diffHours, diffDays, diffWeeks } = getTimeDiff(timestamp)

    if (diffSeconds < 60) {
      return 'today'
    } else if (diffMinutes < 60) {
      return 'today'
    } else if (diffHours < 24) {
      return 'today'
    } else if (diffDays < 7) {
      if (diffDays === 1) {
        return 'yesterday'
      } else {
        return 'this week'
      }
    } else {
      return `${diffWeeks}w ago`;
    }
  }
}

export function timeAgoRecent(timestamp) {
  if (!timestamp) {
    return 'never';
  } else {
    const now = moment();
    const createdAt = moment(timestamp);

    if (now.isSame(createdAt, 'day')) {
      return 'today';
    } else if (now.subtract(1, 'day').isSame(createdAt, 'day')) {
      return 'yesterday';
    } else if (now.isSame(createdAt, 'week')) {
      return 'this week';
    } else {
      const diffWeeks = now.diff(createdAt, 'weeks');
      return `${diffWeeks}w ago`;
    }
  }
}

export function timeAgoSpecific(timestamp) {
  if (!timestamp) {
    return 'never';
  } else {
    const now = moment();
    const createdAt = moment(timestamp);

    if (now.isSame(createdAt, 'day')) {
      return 'Today';
    } else if (now.subtract(1, 'day').isSame(createdAt, 'day')) {
      return 'Yesterday';
    } else {
      return createdAt.format('MMM D');
    }
  }
}

export function msToMinSec(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}