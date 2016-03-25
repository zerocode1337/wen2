'use strict';

const electron = require('electron');
const app = electron.app; //Module to control application life.

//Module to store and restore window size and positions.
const windowStateKeeper = require('electron-window-state');
const BrowserWindow = electron.BrowserWindow; //Module to create native browser window.

//Module to create native menus that can be used as application menus and context menus.
const remote = require('electron').remote;
const Menu = remote.Menu;

const path = require('path');
