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
    var street;
    var postcode;
    var city;
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
     * Get the contact street address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#getStreet
     * @access public
     * @returns int
     */
    this.getStreet = function() {
        return street;
    };

    /**
     * Set the contact street address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#setStreet
     * @access public
     */
    this.setStreet = function(newStreet) {
        street = newStreet;
    };

    /**
     * Get the contact postcode address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#getPostcode
     * @access public
     * @returns int
     */
    this.getPostcode = function() {
        return postcode;
    };

    /**
     * Set the contact postcode address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#setPostcode
     * @access public
     */
    this.setPostcode = function(newPostcode) {
        postcode = newPostcode;
    };

    /**
     * Get the contact city address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#getCity
     * @access public
     * @returns int
     */
    this.getCity = function() {
        return city;
    };

    /**
     * Set the contact city address of the booking.
     *
     * @memberof goboo.Booking
     * @alias goboo.Booking#setCity
     * @access public
     */
    this.setCity = function(newCity) {
        city = newCity;
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
