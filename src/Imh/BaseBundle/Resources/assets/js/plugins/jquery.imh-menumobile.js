/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpianoe
 * Licensed under the MIT license
 * @see
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ($, window, document) {
    "use strict";

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "imhMenuMobile";

    /**
     * A really lightweight plugin wrapper around the constructor,
     * preventing against multiple instantiations
     * @param userOptions
     * @returns {*}
     */
    $.fn[pluginName] = function (userOptions) {
        var args = arguments;
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                // Init
                $.data(this, "plugin_" + pluginName, new Plugin(this, userOptions));
            } else if ($.type(userOptions) === "string") {
                // Call method of plugin, like $('.my-element').pluginExample('setValue', 2);
                $.data(this, "plugin_" + pluginName)[userOptions].apply($.data(this, "plugin_" + pluginName), Array.prototype.slice.call(args, 1));
            }
        });
    };

    /**
     * Default config
     * @type {Object}
     */
    $.fn[pluginName].defaults = {};

    /**
     * Plugin constructor
     *
     * @param element
     * @param options
     * @constructor
     */
    function Plugin(element, options) {
        this.$element = $(element);
        this.$layer   = $("[data-layer]");
        this.$main    = $("[data-main]");
        this.$lang    = $("[data-lang]");
        this.$burger  = this.$element.find("[data-menumobile-hamburger]");
        this.flag     = 0;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this._name   = pluginName;
        this.init();
    }

    Plugin.prototype.instance = function() {
        return this;
    };

    /**
     * Place initialization logic here
     * You already have access to the DOM element and
     * the options via the instance, e.g. this.element
     * and this.options
     */
    Plugin.prototype.init = function() {
        this.$element.addClass("has-no-transition");
        this.actionsOnClick();
    };

    /**
     * Public method makeMenuAnimatable
     */
    Plugin.prototype.makeMenuAnimatable = function() {
        this.$element.removeClass("has-no-transition");
    };

    /**
     * Public method makeMenuVisible
     */
    Plugin.prototype.makeMenuVisible = function() {
        this.$element.addClass("is-visible");
    };

    /**
     * Public method makeMenuInvisible
     */
    Plugin.prototype.makeMenuInvisible = function() {
        this.$element.removeClass("is-visible");
    };

    /**
     * Public method actionsOnClick
     */
    Plugin.prototype.actionsOnClick = function() {
        this.$element.on("click", "[data-menumobile-hamburger]", function(e) {
            this.$layer.toggleClass("is-visible");
            this.$lang.hide();

            if(this.flag === 1) {
                this.$main.hide();
                this.flag = 0;
            } else {
                this.$main.show();
            }

            this.checkVisibleLayer();
            e.preventDefault();
        }.bind(this));

        this.$element.on("click", "[data-menumobile-globe]", function(e) {
            this.flag = 1;
            this.$layer.addClass("is-visible");
            this.$main.hide();
            this.$lang.show();

            this.checkVisibleLayer();
            e.preventDefault();
        }.bind(this));
    };

    Plugin.prototype.checkVisibleLayer = function() {
        if(this.$layer.hasClass("is-visible")) {
            this.$burger.addClass("is-active");
            $("html, body").on("touchmove", function(e) {
                e.preventDefault();
            });
        } else {
            this.$burger.removeClass("is-active");
            $("html, body").off("touchmove");
        }
    };

})(jQuery, window, document);