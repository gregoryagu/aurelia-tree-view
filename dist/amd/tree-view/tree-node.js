define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-logging', './node-model', '../common/events'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaLogging, _nodeModel, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TreeNode = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var TreeNode = exports.TreeNode = (_dec = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ViewCompiler, _aureliaTemplating.ViewResources, _aureliaDependencyInjection.Container, _aureliaTaskQueue.TaskQueue), _dec2 = (0, _aureliaTemplating.bindable)(), _dec(_class = (_class2 = function () {
    function TreeNode(element, viewCompiler, viewResources, container, taskQueue) {
      _classCallCheck(this, TreeNode);

      _initDefineProp(this, 'model', _descriptor, this);

      this._toggleCalled = false;

      this.element = element;
      this.viewCompiler = viewCompiler;
      this.viewResources = viewResources;
      this.container = container;
      this.taskQueue = taskQueue;
      this.log = (0, _aureliaLogging.getLogger)('tree-node');
    }

    TreeNode.prototype.attached = function attached() {
      if (this.model && this.model._template && this.templateTarget) {
        this.useTemplate();
      }
    };

    TreeNode.prototype.detached = function detached() {
      if (this.viewSlot) {
        this.unbindTemplate();
      }
    };

    TreeNode.prototype.insertChild = function insertChild(child, before) {
      this.model.children.push(child);
    };

    TreeNode.prototype.useTemplate = function useTemplate() {
      var template = this.model._template;
      var model = this.model._templateModel;
      var viewFactory = this.viewCompiler.compile('<template>' + template + '</template>', this.viewResources);
      var view = viewFactory.create(this.container);
      this.viewSlot = new _aureliaTemplating.ViewSlot(this.templateTarget, true);
      this.viewSlot.add(view);
      this.viewSlot.bind(this, model);
      this.viewSlot.attached();
    };

    TreeNode.prototype.unbindTemplate = function unbindTemplate() {
      this.viewSlot.detached();
      this.viewSlot.unbind();
      this.viewSlot.removeAll();
    };

    TreeNode.prototype.modelChanged = function modelChanged(newValue) {
      if (newValue) {
        newValue._element = this;
        if (newValue._template && this.templateTarget) {
          this.useTemplate();
        }
      }
    };

    TreeNode.prototype.removeChild = function removeChild(child) {
      var pos = this.model.children.indexOf(child);
      if (pos > -1) {
        this.model.children.splice(pos, 1);
      } else {
        this.log.warn('child not found in model', child, this.model.children);
      }
    };

    TreeNode.prototype.focusNode = function focusNode(e, permitBubbles) {
      this.model.focused = true;
      return permitBubbles;
    };

    TreeNode.prototype.toggleSelected = function toggleSelected(e, permitBubbles) {
      var _this = this;

      if (e.ctrlKey) {
        if (!this._toggleCalled) {
          this._toggleCalled = true;
          var promise = void 0;
          var newValue = !this.model.selected;
          if (newValue) {
            promise = this.model.selectChildren(e.shiftKey);
          } else {
            promise = this.model.deselectChildren(e.shiftKey);
          }
          promise.then(function () {
            _this._toggleCalled = false;
          });
        }
      }
      return permitBubbles || false;
    };

    TreeNode.prototype.toggleNode = function toggleNode() {
      if (this.model.expanded) {
        this.model.collapseNode();
        (0, _events.fireEvent)(this.element, 'collapsed', { node: this.model });
      } else {
        this.model.expandNode();
        (0, _events.fireEvent)(this.element, 'expanded', { node: this.model });
      }
    };

    return TreeNode;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class2)) || _class);
});