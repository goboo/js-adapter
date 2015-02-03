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
            street: booking.getStreet(),
            postcode: booking.getPostcode(),
            city: booking.getCity(),
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
