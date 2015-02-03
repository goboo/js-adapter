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
