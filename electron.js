'use strict';

const electron = require('electron');
const app = electron.app; //Module to control application life.

//Module to store and restore window size and positions.
const windowStateKeeper = require('electron-window-state');
const BrowserWindow = electron.BrowserWindow; //Module to create native browser window.

//Module to create native menus that can be used as application menus and context menus.
const Menu = require('menu');

const path = require('path');

if(process.env.NODE_ENV === 'dev'){
  require('electron-debug')({
    showDevTools: true;
  });
}

//Keep a global reference of the window object, if you don't, the window will
//be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

//Quit when all windows are closed.
app.on('window-all-closed', function(){
  //On OS x it is common for applications and their menu bar
  //to stay active until the user quits explicitly with cmd+Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

/*
 *This method will be called when Electron has finished
 *initialization and is ready to create browser windows.
 */
app.on('ready', function() {
  //Load the previous state with fallback to defaluts
  //let windowState = windowStateKeeper('main', {
  //  width : 1000,
  //  height: 600
  //});
  ////Create the browser window.
  //mainWindow = new BrowserWindow({
  //  'x'      : windowState.x,
  //  'y'      : windowState.y,
  //  'width'  : windowState.width,
  //  'height' : windowState.height,

  //});
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function(){
     mainWindow = null;
  });
});
