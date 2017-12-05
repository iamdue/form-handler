/**
 * modular jQuery plugin boilerplate
 * @version 1.0
 * @author Gyorgy Sagi <gyorgy.sagi@gmail.com>
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(root.jQuery);
    }
}
(this, function ($) {

    'use strict';


    var FormUtils = {};

    FormUtils.validate = {
        fieldProps: function(){

        }
    };
    FormUtils.utils = {
        'uuidv4': function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        'getErrorElementSelectorByInputElement': function(element, inputName){
            var errorElementSelector = this.options.defaultErrorElemSelector + 'error-' + (element.tagName || element.nodeName).toLowerCase() + "__" + inputName;
            return {
                'element': document.querySelector('.' + errorElementSelector),
                'class': errorElementSelector
            }
        }
    };
    FormUtils.message = {
        /**
         *
         * @param errorObject
         * @example {'formInputName': {
         *      'type': 'error||warning||success'
         *      'messages': [],
         *      'hide': false||true(default false)
         * }}
         */

        'add': function (inputName, props) {
            var element = document.querySelector('[name="' + inputName + '"]');
            if (element && typeof props === 'object') {
                var elementErrorElement = FormUtils.utils.getErrorElementSelectorByInputElement(element, inputName);
                if (!elementErrorElement.element) {
                    elementErrorElement = document.createElement('div');
                    elementErrorElement.classList.add(elementErrorElement.class);
                    element.parentNode.insertBefore(elementErrorElement, element.nextSibling);
                }
                elementErrorElement.innerHTML = props.messages.join('<br>');
                if (props.hide) {
                    elementErrorElement.style.display = 'none';
                }
                return true;
            }
            return false;
        },
        remove: function (element, removeFromDom) {
            removeFromDom = removeFromDom || false;
            var elementErrorElement = FormUtils.utils.getErrorElementSelectorByInputElement(element, inputName);
            if(!removeFromDom){
                elementErrorElement.style.display = 'none';
            } else {
                elementErrorElement.parentNode.removeChild(elementErrorElement);
            }
        },
        'fill': function (errorObject) {
            for (var inputName in errorObject) {
                if (errorObject.hasOwnProperty(inputName)) {
                    FormUtils.message.add.call(this, inputName, errorObject[inputName]);
                }
            }
        }
    };

    var defaults = {
        'defaultErrorElem': function (errorMessage) {
            '<div class="errorMessage">' + errorMessage + '</div>'
        },
        'defaultErrorElemSelector': '.errorMessage'
    };

    /**
     * FormHandler constructor
     * @constructs FormHandler object
     * @param scope - scope where formHandler initiated
     * @param options - configuration options
     */
    function FormHandler(options, scope) {

        this.scope = null;

        if (scope && typeof scope.tagName !== 'undefined') {
            this.scope = scope;
        }

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;

        return this.init();

    }

    /**
     * extends FormHandler object prototype
     * @type {{init: Function, addEventHandlers: Function}}
     */
    FormHandler.prototype = {

        init: function () {
            this.addEventHandlers();
            return {
                'uuid': FormUtils.utils.uuidv4(),
                'fill': FormUtils.message.fill
            }
        },

        /**
         * add Eventhandlers
         */
        addEventHandlers: function () {

        }

    };

    $.fn.FormHandler = function (options) {
        this.each(function () {
            if (!$.data(this, "FormHandler")) {
                $.data(this, "FormHandler", new FormHandler(options, this));
            }
        });
    };

    window.FormHandler = FormHandler;


}));
