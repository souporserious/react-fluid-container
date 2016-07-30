"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getPublicProps;

function getPublicProps(allowedProps, privateProps) {
  var publicProps = {};
  for (var key in allowedProps) {
    if (allowedProps.hasOwnProperty(key) && !privateProps[key]) {
      publicProps[key] = allowedProps[key];
    }
  }
  return publicProps;
}

module.exports = exports["default"];