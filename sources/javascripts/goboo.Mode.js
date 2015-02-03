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
