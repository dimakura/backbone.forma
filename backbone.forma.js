!function(exports, global) {
    global.forma = exports, exports.Action = function() {
        var Action = function(options) {
            "object" == typeof options ? _.extend(this, options) : "string" == typeof options && (this.label = options), 
            this.id || (this.id = exports.utils.nextId());
        };
        return Action.prototype.generateActionButtonTag = function() {
            var engine = new exports.ActionEngine();
            return engine.generateActionButtonTag(this);
        }, Action;
    }(), exports.DefaultActionEngine = function() {
        var Engine = function() {};
        return Engine.prototype.generateActionButtonTag = function(action) {
            this.action = action, this.iconEngine = exports.iconEngine;
            var children = [];
            this.action.icon && children.push(this.iconEngine.generateIconTag(this.action.icon)), 
            this.action.label && children.push(this.action.label);
            var buttonClasses = [ "forma-action", "btn" ];
            return buttonClasses.push(this.action.type ? "btn-" + this.action.type : "btn-default"), 
            new exports.html.Tag("button", {
                id: this.action.id,
                "class": buttonClasses
            }, children);
        }, Engine;
    }(), exports.ActionEngine = exports.DefaultActionEngine, exports.DefaultTextFieldEngine = function() {
        var generateLabelTag = function() {
            if (this.field.label) {
                var children = [ this.field.label ];
                return this.field.required && children.push(new exports.html.Tag("span", {
                    "class": "forma-required"
                }, "*")), new exports.html.Tag("label", {
                    "for": this.field.id
                }, children);
            }
        }, generateInputField = function() {
            var type = this.field.hidden ? "password" : this.field.email ? "email" : "text";
            return new exports.html.Tag("input", {
                id: this.field.id,
                name: this.field.name,
                type: type,
                value: "<%-" + this.field.name + "%>",
                "class": "form-control"
            });
        }, generateErrorTemplate = function() {
            return [ '<%if(typeof _errors !== "undefined" && _errors && _errors.' + this.field.name + ") { %>", '<div class="text-danger"><%= _errors.' + this.field.name + " %></div>", "<%}%>" ].join("");
        }, Engine = function() {};
        return Engine.prototype.generateFieldTag = function(field, opts) {
            opts && opts.errors;
            this.field = field, this.iconEngine = exports.iconEngine;
            var children = [ generateLabelTag.apply(this), generateInputField.apply(this), generateErrorTemplate.apply(this) ], classNameTemplate = '<%if(typeof _errors !== "undefined" && _errors && _errors.' + this.field.name + "){%>has-error<%}%>";
            return new exports.html.Tag("div", {
                "class": [ "forma-field", "form-group", classNameTemplate ]
            }, children);
        }, Engine.registerOnChangeEvent = function(field, view, callback) {
            view.events["change #" + field.id] = function() {
                callback($("#" + field.id).val());
            };
        }, Engine;
    }(), exports.TextFieldEngine = exports.DefaultTextFieldEngine, exports.DefaultFormEngine = function() {
        var generateTitleTag = function() {
            var iconTag, title = this.form.title, icon = this.form.icon, children = [];
            return title ? (icon && (iconTag = this.iconEngine.generateIconTag(icon, {
                "class": "forma-title-icon"
            }), children.push(iconTag)), title && children.push(new exports.html.Tag("span", {
                "class": "forma-title-text"
            }, title)), new exports.html.Tag("div", {
                "class": "forma-title"
            }, children)) : void 0;
        }, generateFieldsTag = function() {
            var fields = this.form.fields;
            return fields ? new exports.html.Tag("div", {
                "class": "form-fields"
            }, fields.map(function(field) {
                var fieldTag = field.generateFieldTag();
                return fieldTag;
            })) : void 0;
        }, generateActionsTag = function() {
            if (this.form.actions) {
                var children = this.form.actions.map(function(action) {
                    return action.generateActionButtonTag();
                });
                return new exports.html.Tag("div", {
                    "class": "form-actions"
                }, children);
            }
        }, generateBodyTag = function() {
            return new exports.html.Tag("form", {
                role: "form",
                "class": "form-body"
            }, [ generateFieldsTag.apply(this), generateActionsTag.apply(this) ]);
        }, Engine = function() {};
        return Engine.prototype.generateFormTag = function(form) {
            this.form = form, this.iconEngine = exports.iconEngine;
            var children = [ generateTitleTag.apply(this), generateBodyTag.apply(this) ];
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
    }, exports.iconEngine = exports.DefaultIconEngine, exports.Error = function() {
        var FormaError = function(message) {
            this.name = "FormaError", this.message = message, this.stack = new Error().stack;
        };
        return FormaError.prototype = new Error(), FormaError.prototype.constructor = FormaError, 
        FormaError;
    }(), exports.Form = function() {
        var Form = function(options) {
            "object" == typeof options ? _.extend(this, options) : "string" == typeof options && (this.title = options);
        };
        return Form.prototype.generateFormTag = function() {
            var engine = new forma.FormEngine();
            return engine.generateFormTag(this);
        }, Form.prototype.toHtml = function() {
            return this.generateFormTag().toHtml();
        }, Form;
    }(), exports.FormView = function() {
        var initializeActions = function() {
            var self = this, form = self.form;
            form.actions && form.actions.forEach(function(action) {
                self.events["click #" + action.id] = action.action;
            });
        }, initializeChangeListeners = function() {
            var self = this, form = self.form;
            form.fields.forEach(function(field) {
                field.registerOnChangeEvent(self);
            });
        }, FormView = Backbone.Marionette.ItemView.extend({
            initialize: function(options) {
                if ("object" == typeof options && _.extend(this, options), !this.form) throw new exports.Error("form not defined");
                this.events = this.events || {}, initializeActions.apply(this), initializeChangeListeners.apply(this);
            },
            getTemplate: function() {
                return _.template(this.form.toHtml());
            }
        });
        return FormView;
    }(), exports.TextField = function() {
        var TextField = function(options) {
            "object" == typeof options ? _.extend(this, options) : "string" == typeof options && (this.name = options), 
            this.id || (this.id = exports.utils.nextId());
        };
        return TextField.prototype.generateFieldTag = function(opts) {
            var engine = new exports.TextFieldEngine();
            return engine.generateFieldTag(this, opts);
        }, TextField.prototype.registerOnChangeEvent = function(view) {
            var self = this;
            exports.TextFieldEngine.registerOnChangeEvent(this, view, function(value) {
                view.model.set(self.name, value);
            });
        }, TextField;
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
    }(), exports.utils = function() {
        var counter = 0, utils = {
            nextId: function() {
                return "formaid-" + counter++;
            }
        };
        return utils;
    }();
}({}, function() {
    return this;
}());