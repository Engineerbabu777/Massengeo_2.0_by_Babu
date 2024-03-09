"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.databaseConnect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var databaseConnect = function databaseConnect() {
  return regeneratorRuntime.async(function databaseConnect$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(_mongoose["default"].connections.readyState === 1)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", _mongoose["default"].connection.asPromise());

        case 4:
          return _context2.abrupt("return", _mongoose["default"].connect(process.env.MONGO_URI).then(function _callee() {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log('Database Connected');

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (err) {
            return console.log('Error: ', err);
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.databaseConnect = databaseConnect;