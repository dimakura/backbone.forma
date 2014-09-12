!function(exports, global) {
    global.forma = exports, exports.DefaultFormEngine = function() {
        var generateTitleTag = function() {
            var title = this.form.title, icon = this.form.icon;
            if (title) {
                var iconTag, children = [];
                return icon && (iconTag = this.iconEngine.generateIconTag(icon, {
                    "class": "forma-title-icon"
                }), children.push(iconTag)), title && children.push(new exports.html.Tag("span", {
                    "class": "forma-title-text"
                }, title)), new exports.html.Tag("div", {
                    "class": "forma-title"
                }, children);
            }
        }, Engine = function() {};
        return Engine.prototype.generateFormTag = function(form) {
            this.form = form, this.iconEngine = exports.iconEngine;
            var children = [ generateTitleTag.apply(this) ];
            return new exports.html.Tag("div", {
                "class": "forma-form"
            }, children);
        }, Engine;
    }(), exports.FormEngine = exports.DefaultFormEngine, exports.DefaultIconEngine = {
        generateIconTag: function(name, opts) {
            var classNames = [ "fa", "fa-" + name ];
            return opts && opts.class && classNames.push(opts.class), new forma.html.Tag("i", {
                "class": classNames
            });
        }
    }, exports.iconEngine = exports.DefaultIconEngine, exports.DefaultTextFieldEngine = function() {
        var generateLabelTag = function() {
            return this.field.label ? new exports.html.Tag("label", {
                "for": this.field.id
            }, this.field.label) : void 0;
        }, generateInputField = function() {
            var type = this.field.hidden ? "password" : this.field.email ? "email" : "text";
            return new exports.html.Tag("input", {
                id: this.field.id,
                type: type,
                value: "<%-" + this.field.name + "%>"
            });
        }, Engine = function() {};
        return Engine.prototype.generateFieldTag = function(field) {
            this.field = field, this.iconEngine = exports.iconEngine;
            var children = [ generateLabelTag.apply(this), generateInputField.apply(this) ];
            return new exports.html.Tag("div", {
                "class": [ "forma-field", "form-group" ]
            }, children);
        }, Engine;
    }(), exports.TextFieldEngine = exports.DefaultTextFieldEngine, exports.Error = function() {
        var FormaError = function(message) {
            this.name = "FormaError", this.message = message, this.stack = new Error().stack;
        };
        return FormaError.prototype = new Error(), FormaError.prototype.constructor = FormaError, 
        FormaError;
    }(), exports.Form = function() {
        var Form = function(options) {
            "object" == typeof options ? _.extend(this, options) : "string" == typeof options && (this.title = options);
        };
        return Form.prototype.toHtml = function() {
            var engine = new forma.FormEngine();
            return engine.generateFormTag(this).toHtml();
        }, Form;
    }(), exports.FormView = function() {
        var FormView = Backbone.Marionette.ItemView.extend({
            initialize: function(options) {
                if (this.form = options && options.form, !this.form) throw new exports.Error("form not defined");
            },
            getTemplate: function() {
                return _.template(this.form.toHtml());
            }
        });
        return FormView;
    }(), exports.html = function() {
        var html = {};
        return html.Tag = function() {
            var Tag = function() {
                for (var i = 0, l = arguments.length; l > i; i++) {
                    var argValue = arguments[i];
                    "string" != typeof argValue || this.name ? "string" == typeof argValue ? this.children = argValue : argValue instanceof Array ? this.children || (this.children = argValue) : argValue instanceof Object && (this.parameters || (this.parameters = argValue)) : this.name = argValue;
                }
                this.name = this.name || "div";
            }, parameterPair = function(params, key) {
                var value = params[key];
                return value instanceof Array ? value = value.join(" ") : "object" == typeof value && (value = _.keys(value).map(function(key) {
                    return key + ":" + value[key];
                }).join(";")), key + '="' + value + '"';
            }, tagStart = function() {
                var self = this, ary = [ "<", self.name ];
                if (self.parameters) {
                    var parametersArray = [];
                    _.keys(self.parameters).forEach(function(key) {
                        parametersArray.push(parameterPair(self.parameters, key));
                    }), ary.push(" " + parametersArray.join(" "));
                }
                return ary.push(">"), ary.join("");
            }, tagEnd = function() {
                return [ "</", this.name, ">" ].join("");
            }, tagBody = function() {
                return "string" == typeof this.children ? this.children : this.children instanceof Array ? this.children.filter(function(x) {
                    return x;
                }).map(function(child) {
                    return "string" == typeof child ? child : "function" == typeof child.toHtml ? child.toHtml() : child.toString();
                }).join("") : void 0;
            };
            return Tag.prototype.toHtml = function() {
                return [ tagStart.apply(this), tagBody.apply(this), tagEnd.apply(this) ].join("");
            }, Tag;
        }(), html;
    }(), exports.TextField = function() {
        var counter = 0, TextField = function(options) {
            "object" == typeof options ? _.extend(this, options) : "string" == typeof options && (this.name = options), 
            this.id || (this.id = "formaid-" + counter++);
        };
        return TextField;
    }();
}({}, function() {
    return this;
}());