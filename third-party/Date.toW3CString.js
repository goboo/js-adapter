/**
 * Convert a Date object to a string, according to W3C date time format: yyyy-mm-ddThh:ii:ss+zz:zz
 *
 * @memberOf Date
 * @access public
 * @license MIT
 * @copyright 2013 Tristan Lins
 * @author Tristan Lins <tristan.lins@bit3.de>
 */
Date.prototype.toW3CString = function () {
	var year = this.getFullYear();
	var month = this.getMonth();
	month ++;
	if (month < 10) {
		month = '0' + month;
	}
	var day = this.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	var hours = this.getHours();
	if (hours < 10) {
		hours = '0' + hours;
	}
	var minutes = this.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	var seconds = this.getSeconds();
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	var offset = -this.getTimezoneOffset();
	var offsetHours = Math.abs(Math.floor(offset / 60));
	var offsetMinutes = Math.abs(offset) - offsetHours * 60;
	if (offsetHours < 10) {
		offsetHours = '0' + offsetHours;
	}
	if (offsetMinutes < 10) {
		offsetMinutes = '0' + offsetMinutes;
	}
	var offsetSign = '+';
	if (offset < 0) {
		offsetSign = '-';
	}
	return year + '-' + month + '-' + day +
		'T' + hours + ':' + minutes + ':' + seconds +
		offsetSign + offsetHours + ':' + offsetMinutes;
}
