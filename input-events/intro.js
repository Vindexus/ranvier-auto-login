'use strict';
const path = require('path')

const dir = path.resolve('../config.json')
console.log('dir',dir);
const config = require(dir);

/**
 * MOTD event
 */
module.exports = (srcPath) => {
  const EventUtil = require(srcPath + 'EventUtil');

  return {
    event: state => (socket, args) => {
      if (config.account) {
        socket.once('login', () => {
          socket.emit('data', config.account)
        })
      }
      if (config.password) {
        socket.once('password', () => {
          socket.emit('data', config.password)
        })
      }
      if (config.character) {
        socket.once('choose-character', () => {
          socket.emit('data', config.character)
        })
      }
    }
  }
}