"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findImageMessage = void 0;

var findImageMessage = function findImageMessage(messageType, data) {
  // SWITCH FOR IMAGE!
  switch (messageType) {
    case 'text':
      return null;

    case 'image':
      return data.image;

    case 'image-text':
      return data.image;

    default:
      null;
  }
};

exports.findImageMessage = findImageMessage;