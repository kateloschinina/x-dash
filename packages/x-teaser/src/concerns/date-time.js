const ONE_HOUR = 1000 * 60 * 60;

const FOUR_HOURS = ONE_HOUR * 4;

/**
 * To Date
 * @param {Date | String | Number} date
 * @returns {Date}
 */
function toDate(date) {
	if (typeof date === 'string') {
		return new Date(date);
	}

	if (typeof date === 'number') {
		return new Date(date);
	}

	return date;
}

/**
 * Get Relative Date
 * @param {Date | String | Number} date
 * @returns {Number}
 */
function getRelativeDate(date) {
	return Date.now() - toDate(date).getTime();
}

/**
 * Get Status
 * @param {Date | String | Number} publishedDate
 * @param {Date | String | Number} firstPublishedDate
 * @returns {String}
 */
function getStatus(publishedDate, firstPublishedDate) {
	if (getRelativeDate(publishedDate) < ONE_HOUR) {
		if (publishedDate === firstPublishedDate) {
			return 'new';
		} else {
			return 'updated';
		}
	}

	return '';
}

/**
 * Is Recent
 * @param {Number} relativeDate
 * @returns {Boolean}
 */
function isRecent(relativeDate) {
	return relativeDate < FOUR_HOURS;
}

module.exports = {
	toDate,
	isRecent,
	getStatus,
	getRelativeDate
};