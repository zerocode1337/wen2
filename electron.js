'use strict';

const electron = require('electron');
const app = electron.app; //Module to control application life.

// Module to store and restore window size and positions.
const windowStateKeeper = require('electron-window-state');
const BrowserWindow = electron.BrowserWindow; //Module to create native browser window.

// Module to create native menus that can be used as application menus and context menus.
const menu = require('menu');

const path = require('path');
//if(process.env.NODE_ENV === 'dev'){
//  require('electron-debug')({
//    showDevTools: true;
//  });
//}

var menuTemplate = [{
    label: '应用',
    submenu: [{
        label: '退出',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
            app.quit();
        }
    }, {
        label: '最小化',
        accelerator: 'CmdOrCtrl+H',
        click: function() {
            app.hide();
        }
    }]
}, {
    label: '编辑',
    submenu: [{
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut:'
    }, {
        label: '拷贝',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy:'
    }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste:'
    }]
}];

// Start Servers
require('./server');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function(){
    // On OS x it is common for applications and their menu bar
    // to stay active until the user quits explicitly with cmd+Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

/*
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 */
app.on('ready', function() {

    // Load the menu
    // menu.setApplicationMenu(menu.buildFromTemplate(menuTemplate));

    // Load the previous state with fallback to defaluts
    let windowState = windowStateKeeper('main', {
        width : 1800,
        height: 600
    });
    // Create the browser window.
    mainWindow = new BrowserWindow({
        x        : windowState.x,
        y        : windowState.y,
        width    : windowState.width,
        height   : windowState.height,
        minWidth : 800,
        minHeight: 600,
        title    : "MonkeyWen",
        icon     : path.join(__dirname, '/dist/images/icon/monkey_128.png'),
        webPreferences  : {
            nodeIntegration : true,
            preload        : path.resolve(path.join(__dirname, 'preload.js'))
        },
        autoHideMenuBar : true
    });

    /*
     mainWindow.webContents.on('will-navigate', function(event, url) {
        if(url.indexOf('localhost:1337') === -1 &&
           url.indexOf('oauth') === -1 &&
           url.indexOf('sign_in') === -1) {
               event.preventDefault();
               require('open')(url,'chrome');
           }
    });

    mainWindow.webContents.on('new-window', function(event, url) {
        if(url.indexOf('localhost:1337') === -1 &&
           url.indexOf('oauth') === -1 &&
           url.indexOf('sign_in') === -1) {
               event.preventDefault();
               require('open')(url,'chrome');
           }
    });

    if(windowState.isMaximized) {
         mainWindow.maximize();
    }
    */
    // Load the index.html
    mainWindow.loadURL('http://localhost:1337/');

    mainWindow.on('close', function() {
         windowState.saveState(mainWindow);
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});
