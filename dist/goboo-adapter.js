/*
 * GoBoo - GET IT. BOOK IT. [http://goboo.de]
 *
 * (c) Tristan Lins <t.lins@goboo.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * {@link http://goboo.de goboo - GET IT. BOOK IT}
 *
 * online booking system by karo media
 *
 * @module goboo/Adapter
 *
 * @copyright 2014 {@link mailto:t.lins@goboo.de Tristan Lins}
 * @license {@link http://opensource.org/licenses/MIT MIT}
 * @author Tristan Lins <t.lins@goboo.de>
 * @link http://goboo.de
 */

/**
 * The goboo namespace.
 * @namespace
 */
var goboo = goboo || {};
window.goboo = goboo;

/**
 * Current initialized environment.
 *
 * @access public
 */
goboo.env = {};

/**
 * The active adapter.
 *
 * @access public
 */
goboo.env.adapter = null;

/**
 * Initialized the environment.
 *
 * @param object options
 * @access public
 */
goboo.init = function(customOptions) {
	var options = {
		'host': 'demo.goboo.io'
	};

	for (var key in (customOptions || {})) {
		options[key] = customOptions[key];
	}

	goboo.env.adapter = new goboo.Adapter(options);
};

/*
 * GoBoo - GET IT. BOOK IT. [http://goboo.de]
 *
 * (c) Tristan Lins <t.lins@goboo.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a new adapter to communicate with the goboo API.
 *
 * @memberOf goboo
 * @class
 * @classdesc Adapter to communicate with the goboo API.
 * @constructor
 * @access public
 *
 * @copyright 2014 {@link mailto:t.lins@goboo.de Tristan Lins}
 * @license {@link http://opensource.org/licenses/MIT MIT}
 * @author Tristan Lins <t.lins@goboo.de>
 * @link http://goboo.de
 */
goboo.Adapter = function(customOptions) {
	"use strict";

	/**
	 * The adapters options.
	 *
	 * @methodOf goboo.Adapter
	 * @type {object}
	 * @access private
	 */
	var options = {
		'host': 'demo.goboo.de',
		'path': ''
	};

	for (var key in (customOptions || {})) {
		options[key] = customOptions[key];
	}

	/**
	 * Base URL to API.
	 *
	 * @methodOf goboo.Adapter
	 * @type {string}
	 * @access private
	 */
	var baseUrl = 'http://' + options.host + options.path + '/api/v3/';

	/**
	 * List all slots between two dates.
	 *
	 * @methodOf goboo.Adapter
	 * @alias goboo.Adapter#listSlots
	 * @access public
	 * @param {int} roomId
	 * @param {Date} from
	 * @param {Date} until
	 * @param {function} callback
	 * @returns {@link goboo.Slot}[]
	 */
	this.listSlots = function(roomId, from, until, callback) {
		var parameters = [];
		if (from) {
			parameters.push('from=' + encodeURIComponent(from.toW3CString()));
		}
		if (until) {
			parameters.push('until=' + encodeURIComponent(until.toW3CString()));
		}
		var query = '';
		if (parameters.length) {
			query = '?' + parameters.join('&');
		}
		var r = new XMLHttpRequest();
		r.open("GET", baseUrl + "rest/room/" + roomId + "/slots" + query, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4) {
				return;
			}

			var json;
			if (r.status != 200) {
				json = false;
			}
			else {
				json = JSON.parse(r.responseText);
			}

			var slots = [];
			if (json) {
				for (var index in json.slots) {
					var slotData = json.slots[index];
					var slot = new goboo.Slot();
					slot.setId(slotData.id);
					slot.setRoomId(roomId);
					slot.setStartDateTime(new Date(slotData.startDateTime));
					slot.setDuration(slotData.duration);
					slot.setPlayTime(slotData.playTime);
					slot.setCapacity(slotData.capacity);
					slot.setAttendance(slotData.attendance);
					slot.setPlayers(slotData.players);
					slot.setLocked(slotData.locked);
					slots.push(slot);
				}
			}
			callback(slots);
		};
		r.send();
	};

	/**
	 * List predecessors of a specific slot.
	 *
	 * @methodOf goboo.Adapter
	 * @alias goboo.Adapter#listSlots
	 * @access public
	 * @param {goboo.Slot} slot
	 * @param {int} limit
	 * @param {function} callback
	 * @returns {@link goboo.Slot}[]
	 */
	this.listSlotPredecessors = function(slot, limit, callback) {
		var query = limit ? ('?limit=' + limit) : '';

		var r = new XMLHttpRequest();
		r.open("GET", baseUrl + "rest/room/" + slot.getRoomId() + "/slot/" + slot.getId() + '/predecessors' + query, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4) {
				return;
			}

			var json;
			if (r.status != 200) {
				json = false;
			}
			else {
				json = JSON.parse(r.responseText);
			}

			var slots = [];
			if (json) {
				for (var index in json) {
					var slotData = json[index];
					var slot = new goboo.Slot();
					slot.setId(slotData.id);
					slot.setRoomId(roomId);
					slot.setStartDateTime(new Date(slotData.startDateTime));
					slot.setDuration(slotData.duration);
					slot.setPlayTime(slotData.playTime);
					slot.setCapacity(slotData.capacity);
					slot.setAttendance(slotData.attendance);
					slot.setPlayers(slotData.players);
					slot.setLocked(slotData.locked);
					slots.push(slot);
				}
			}
			callback(slots);
		};
		r.send();
	};

	/**
	 * List successors of a specific slot.
	 *
	 * @methodOf goboo.Adapter
	 * @alias goboo.Adapter#listSlots
	 * @access public
	 * @param {goboo.Slot} slot
	 * @param {int} limit
	 * @param {function} callback
	 * @returns {@link goboo.Slot}[]
	 */
	this.listSlotSuccessors = function(slot, limit, callback) {
		var query = limit ? ('?limit=' + limit) : '';

		var r = new XMLHttpRequest();
		r.open("GET", baseUrl + "rest/room/" + slot.getRoomId() + "/slot/" + slot.getId() + '/successors' + query, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4) {
				return;
			}

			var json;
			if (r.status != 200) {
				json = false;
			}
			else {
				json = JSON.parse(r.responseText);
			}

			var slots = [];
			if (json) {
				for (var index in json) {
					var slotData = json[index];
					var slot = new goboo.Slot();
					slot.setId(slotData.id);
					slot.setRoomId(slotData.room);
					slot.setStartDateTime(new Date(slotData.startDateTime));
					slot.setDuration(slotData.duration);
					slot.setPlayTime(slotData.playTime);
					slot.setCapacity(slotData.capacity);
					slot.setAttendance(slotData.attendance);
					slot.setPlayers(slotData.players);
					slot.setLocked(slotData.locked);
					slots.push(slot);
				}
			}
			callback(slots);
		};
		r.send();
	};

	/**
	 * Get details of one slot.
	 *
	 * @memberOf goboo.Adapter
	 * @alias goboo.Adapter#getSlot
	 * @access public
	 * @param {int} roomId
	 * @param {int} slotId
	 * @param {function} callback
	 * @returns {@link goboo.Slot}
	 */
	this.getSlot = function(roomId, slotId, callback) {
		var r = new XMLHttpRequest();
		r.open("GET", baseUrl + "rest/room/" + roomId + "/slot/" + slotId, true);
		r.onreadystatechange = function () {
			if (r.readyState != 4) {
				return;
			}

			var json;
			if (r.status != 200) {
				json = false;
			}
			else {
				json = JSON.parse(r.responseText);
			}

			var slot = null;
			if (json) {
				slot = new goboo.Slot();
				slot.setId(json.id);
				slot.setRoomId(json.room);
				slot.setStartDateTime(new Date(json.startDateTime));
				slot.setDuration(json.duration);
				slot.setPlayTime(json.playTime);
				slot.setCapacity(json.capacity);
				slot.setAttendance(json.attendance);
				slot.setPlayers(json.players);
				slot.setLocked(json.locked);

				var modes = [];
				for (var index in json.availableModes) {
					var mode = new goboo.Mode();
					mode.setToken(modeData.token);
					mode.setLabel(modeData.label);
					mode.setDescription(modeData.description);
					mode.setMinAttendance(modeData.minAttendance);
					mode.setMaxAttendance(modeData.maxAttendance);
					mode.setVotes(modeData.votes);
					modes.push(mode);
				}

				slot.setAvailableModes(modes);
			}

			callback(slot);
		};
		r.send();
	};

	/**
	 * Book a slot.
	 *
	 * @memberOf goboo.Adapter
	 * @alias goboo.Adapter#bookSlot
	 * @access public
	 * @param {goboo.Booking} booking The booking details.
	 * @param {function} successCallback Callback triggered on success.
	 * @param {function} failCallback Callback triggered on failure.
	 * @returns {@link goboo.Slot}
	 */
	this.bookSlot = function(booking, successCallback, failCallback) {
		var slots   = booking.getSlots();
		var roomId  = null;
		var roomIds = {};
		var slotIds = [];
		for (var slotIndex in slots) {
			var slot = slots[slotIndex];

			roomId = slot.getRoomId();
			roomIds[roomId] = true;
			slotIds.push(slot.getId());
		}

		if (roomIds.length > 1) {
			throw "A booking can only contain slots from the same room.";
		}
		else if (roomIds.length < 1) {
			return;
		}

		var d = {
			name: booking.getName(),
			mobile: booking.getMobile(),
			email: booking.getEmail(),
			attendance: booking.getAttendance(),
			players: booking.getPlayers(),
			exclusive: booking.isExclusive(),
			preferredModes: booking.getPreferredModes(),
			notes: booking.getNotes(),
			slots: slotIds
		};

		var r = new XMLHttpRequest();
		r.open("POST", baseUrl + "rest/room/" + roomId + "/book", true);
		r.setRequestHeader("Content-type", "application/json");
		r.onreadystatechange = function () {
			if (r.readyState != 4) {
				return;
			}

			var json;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (e) {
				json = false;
			}

			var slot = null;
			if (!json) {
				failCallback(false, r);
			}
			else if (json.error) {
				failCallback(json.error.message, r);
			}
			else if (r.status != 200) {
				failCallback(false, r);
			}
			else {
				successCallback(json, r);
			}
		};
		r.send(JSON.stringify(d));
	};
};

/*
 * GoBoo - GET IT. BOOK IT. [http://goboo.de]
 *
 * (c) Tristan Lins <t.lins@goboo.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a new booking.
 *
 * @memberOf goboo
 * @class
 * @classdesc The booking.
 * @constructor
 * @access public
 *
 * @copyright 2014 {@link mailto:t.lins@goboo.de Tristan Lins}
 * @license {@link http://opensource.org/licenses/MIT MIT}
 * @author Tristan Lins <t.lins@goboo.de>
 * @link http://goboo.de
 */
goboo.Booking = function() {
	var name;
	var mobile;
	var email;
	var slots;
	var attendance;
	var players;
	var exclusive;
	var preferredModes;
	var notes;

	/**
	 * Get the contact name of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getName
	 * @access public
	 * @returns string
	 */
	this.getName = function() {
		return name;
	};

	/**
	 * Set the contact name of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setName
	 * @access public
	 */
	this.setName = function(newName) {
		name = newName;
	};

	/**
	 * Get the contact mobile phone number of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getMobile
	 * @access public
	 * @returns Date
	 */
	this.getMobile = function() {
		return mobile;
	};

	/**
	 * Set the contact mobile phone number of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setMobile
	 * @access public
	 */
	this.setMobile = function(newMobile) {
		mobile = newMobile;
	};

	/**
	 * Get the contact email address of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getEmail
	 * @access public
	 * @returns int
	 */
	this.getEmail = function() {
		return email;
	};

	/**
	 * Set the contact email address of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setEmail
	 * @access public
	 */
	this.setEmail = function(newEmail) {
		email = newEmail;
	};
	
	/**
	 * Get the slots of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getSlots
	 * @access public
	 * @returns string
	 */
	this.getSlots = function() {
		return slots;
	};

	/**
	 * Set the slot of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setSlots
	 * @access public
	 */
	this.setSlots = function(newSlots) {
		slots = newSlots;
	};

	/**
	 * Get the attendance of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getAttendance
	 * @access public
	 * @returns int
	 */
	this.getAttendance = function() {
		return attendance;
	};

	/**
	 * Set the attendance of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setAttendance
	 * @access public
	 */
	this.setAttendance = function(newAttendance) {
		attendance = newAttendance;
	};

	/**
	 * Get the players of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getPlayers
	 * @access public
	 * @returns int
	 */
	this.getPlayers = function() {
		return players;
	};

	/**
	 * Set the players of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setPlayers
	 * @access public
	 */
	this.setPlayers = function(newPlayers) {
		players = newPlayers;
	};

	/**
	 * Get the exclusive of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getExclusive
	 * @access public
	 * @returns bool
	 */
	this.isExclusive = function() {
		return exclusive;
	};

	/**
	 * Set the exclusive of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setExclusive
	 * @access public
	 */
	this.setExclusive = function(newExclusive) {
		exclusive = newExclusive;
	};

	/**
	 * Get the preferredModes of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getPreferredModes
	 * @access public
	 * @returns int
	 */
	this.getPreferredModes = function() {
		return preferredModes;
	};

	/**
	 * Set the preferredModes of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setPreferredModes
	 * @access public
	 */
	this.setPreferredModes = function(newPreferredModes) {
		preferredModes = newPreferredModes;
	};

	/**
	 * Get the notes of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#getNotes
	 * @access public
	 * @returns int
	 */
	this.getNotes = function() {
		return notes;
	};

	/**
	 * Set the notes of the booking.
	 *
	 * @memberof goboo.Booking
	 * @alias goboo.Booking#setNotes
	 * @access public
	 */
	this.setNotes = function(newNotes) {
		notes = newNotes;
	};
};

/*
 * GoBoo - GET IT. BOOK IT. [http://goboo.de]
 *
 * (c) Tristan Lins <t.lins@goboo.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a new mode.
 *
 * @memberOf goboo
 * @class
 * @classdesc The mode representing a game mode. As part of a slot the min and max attendance and vote count is provided.
 * @constructor
 * @access public
 *
 * @copyright 2014 {@link mailto:t.lins@goboo.de Tristan Lins}
 * @license {@link http://opensource.org/licenses/MIT MIT}
 * @author Tristan Lins <t.lins@goboo.de>
 * @link http://goboo.de
 */
goboo.Mode = function() {
	var token;
	var label;
	var description;
	var minAttendance;
	var maxAttendance;
	var votes;

	/**
	 * Get the token of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getToken
	 * @access public
	 * @returns string
	 */
	this.getToken = function() {
		return token;
	}

	/**
	 * Set the token of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setToken
	 * @access public
	 */
	this.setToken = function(newToken) {
		token = newToken;
	}

	/**
	 * Get the label of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getLabel
	 * @access public
	 * @returns Date
	 */
	this.getLabel = function() {
		return label;
	}

	/**
	 * Set the label of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setLabel
	 * @access public
	 */
	this.setLabel = function(newLabel) {
		label = newLabel;
	}

	/**
	 * Get the description of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getDescription
	 * @access public
	 * @returns int
	 */
	this.getDescription = function() {
		return description;
	}

	/**
	 * Set the description of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setDescription
	 * @access public
	 */
	this.setDescription = function(newDescription) {
		description = newDescription;
	}

	/**
	 * Get the minAttendance of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getMinAttendance
	 * @access public
	 * @returns string
	 */
	this.getMinAttendance = function() {
		return minAttendance;
	}

	/**
	 * Set the minAttendance of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setMinAttendance
	 * @access public
	 */
	this.setMinAttendance = function(newMinAttendance) {
		minAttendance = newMinAttendance !== null ? parseInt(newMinAttendance) : null;
	}

	/**
	 * Get the maxAttendance of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getMaxAttendance
	 * @access public
	 * @returns string
	 */
	this.getMaxAttendance = function() {
		return maxAttendance;
	}

	/**
	 * Set the maxAttendance of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setMaxAttendance
	 * @access public
	 */
	this.setMaxAttendance = function(newMaxAttendance) {
		maxAttendance = newMaxAttendance !== null ? parseInt(newMaxAttendance) : null;
	}

	/**
	 * Get the votes of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#getVotes
	 * @access public
	 * @returns int
	 */
	this.getVotes = function() {
		return votes;
	}

	/**
	 * Set the votes of this mode.
	 *
	 * @memberof goboo.Mode
	 * @alias goboo.Mode#setVotes
	 * @access public
	 */
	this.setVotes = function(newVotes) {
		votes = parseInt(newVotes);
	}
};

/*
 * GoBoo - GET IT. BOOK IT. [http://goboo.de]
 *
 * (c) Tristan Lins <t.lins@goboo.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a new slot.
 *
 * @memberOf goboo
 * @class
 * @classdesc The slot representing a bookable time span within the system.
 * @constructor
 * @access public
 *
 * @copyright 2014 {@link mailto:t.lins@goboo.de Tristan Lins}
 * @license {@link http://opensource.org/licenses/MIT MIT}
 * @author Tristan Lins <t.lins@goboo.de>
 * @link http://goboo.de
 */
goboo.Slot = function() {
	var id = -1;
	var roomId = -1;
	var startDateTime = new Date();
	var endDateTime = null;
	var duration = -1;
	var playTime = null;
	var capacity = -1;
	var locked = false;
	var attendance = -1;
	var players = [];
	var availableModes = [];

	/**
	 * Get the id of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getId
	 * @access public
	 * @returns string
	 */
	this.getId = function() {
		return id;
	};

	/**
	 * Set the id of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setId
	 * @access public
	 */
	this.setId = function(newId) {
		id = newId;
	};

	/**
	 * Get the room id of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getRoomId
	 * @access public
	 * @returns string
	 */
	this.getRoomId = function() {
		return roomId;
	};

	/**
	 * Set the room id of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setRoomId
	 * @access public
	 */
	this.setRoomId = function(newId) {
		roomId = newId;
	};

	/**
	 * Get the startDateTime of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getStartDateTime
	 * @access public
	 * @returns Date
	 */
	this.getStartDateTime = function() {
		return startDateTime;
	};

	/**
	 * Set the startDateTime of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setStartDateTime
	 * @access public
	 */
	this.setStartDateTime = function(newStartDateTime) {
		startDateTime = newStartDateTime;
	};

	/**
	 * Get the endDateTime of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getEndDateTime
	 * @access public
	 * @returns Date
	 */
	this.getEndDateTime = function() {
		if (endDateTime) {
			return endDateTime;
		}

		var temp = new Date(startDateTime);
		temp.setSeconds(temp.getSeconds() + (duration * 60));
		return temp;
	};

	/**
	 * Set the endDateTime of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setEndDateTime
	 * @access public
	 */
	this.setEndDateTime = function(newEndDateTime) {
		endDateTime = newEndDateTime;
	};

	/**
	 * Get the duration of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getDuration
	 * @access public
	 * @returns int
	 */
	this.getDuration = function() {
		return duration;
	};

	/**
	 * Set the duration of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setDuration
	 * @access public
	 */
	this.setDuration = function(newDuration) {
		duration = parseInt(newDuration);
	};

	/**
	 * Get the play time of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getPlayTime
	 * @access public
	 * @returns int
	 */
	this.getPlayTime = function() {
		return playTime;
	};

	/**
	 * Set the play time of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setPlayTime
	 * @access public
	 */
	this.setPlayTime = function(newPlayTime) {
		playTime = parseInt(newPlayTime);
	};

	/**
	 * Get the capacity of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getCapacity
	 * @access public
	 * @returns string
	 */
	this.getCapacity = function() {
		return capacity;
	};

	/**
	 * Set the capacity of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setCapacity
	 * @access public
	 */
	this.setCapacity = function(newCapacity) {
		capacity = parseInt(newCapacity);
	};

	/**
	 * Get the locked of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getLocked
	 * @access public
	 * @returns boolean
	 */
	this.isLocked = function() {
		return locked;
	};

	/**
	 * Set the locked of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setLocked
	 * @access public
	 */
	this.setLocked = function(newLocked) {
		locked = newLocked ? true : false;
	};

	/**
	 * Get the attendance of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getAttendance
	 * @access public
	 * @returns int|null
	 */
	this.getAttendance = function() {
		return attendance;
	};

	/**
	 * Set the attendance of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setAttendance
	 * @access public
	 */
	this.setAttendance = function(newAttendance) {
		attendance = newAttendance !== null ? parseInt(newAttendance) : null;
	};

	/**
	 * Get the players of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getPlayers
	 * @access public
	 * @returns Array
	 */
	this.getPlayers = function() {
		return players;
	};

	/**
	 * Set the players of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setPlayers
	 * @access public
	 */
	this.setPlayers = function(newPlayers) {
		players = newPlayers ? newPlayers : [];
	};

	/**
	 * Get the availableModes of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#getAvailableModes
	 * @access public
	 * @returns Array
	 */
	this.getAvailableModes = function() {
		return availableModes;
	};

	/**
	 * Set the availableModes of this slot.
	 *
	 * @memberof goboo.Slot
	 * @alias goboo.Slot#setAvailableModes
	 * @access public
	 */
	this.setAvailableModes = function(newAvailableModes) {
		availableModes = newAvailableModes ? newAvailableModes : [];
	};
};
