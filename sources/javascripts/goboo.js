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
