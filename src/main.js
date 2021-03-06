'use strict';


/**
  This file contains all of the code related to initializing the electron app.
  It creates the window the Angular app will live in and creates all of the hooks for the Electron life cycle.

  startMainWindow() is the main entry point for the angular code. It loads the inialize.html page which handles login
*/
const APP_NAME = 'Dynamine';
const VERSION = '1.0.0';

const electron  = require('electron');
const path      = require('path');
const ospath = require('ospath');
const jsonfile  = require('jsonfile');

let absPath = path.dirname(__dirname), configFile = ospath.data() + '/' + APP_NAME + '/config.json';
let {app, ipcMain, BrowserWindow, Menu} = electron;
var mainWindow, appConfig = {dynamine: {}, app: {enableAnimation: true}};

let startMainWindow = function () {
    mainWindow = new BrowserWindow({
        backgroundColor: '#1A242D',
        width: 1200,
        height: 680,
        center: true,
        title: app.getName(),
        minHeight: 500,
        minWidth: 900,
        icon: path.join(__dirname,  'images/icon/dynamineLogo_64x64.png')
    });

    /**

    NOTE: Disable the login page here for development purposes

    */
    //mainWindow.loadURL('file://' + absPath + '/src/initialize.html');
    mainWindow.loadURL('file://' + absPath + '/src/index.html');

    // Debugging
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.setName(APP_NAME);

app.on('ready', () => {
    try {
        appConfig = jsonfile.readFileSync(configFile);

    } catch (e) {
        /* Ignore. Uses default settings. */
    } finally {
        startMainWindow();
    }
});

app.on('activate', () => {
    if (mainWindow === null) startMainWindow();
});

app.on('browser-window-created', (e, window) => {
    let menuTemplate = [{
        label: 'File',
        submenu: [{ type: 'separator' }, { role: 'quit' }]
    }, {
        label: 'Edit',
        submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }]
    }, {
        label: 'Window',
        submenu: [{role: 'togglefullscreen'}]
    }, {
        label: 'Help',
        submenu: [{
            label: 'GitHub Repository',
            click: () => {
                electron.shell.openExternal('https://github.com/dynamine/dynamine-ui');
            }
        }, {
            label: 'Report Issues',
            click: () => {
                electron.shell.openExternal('https://github.com/dynamine/dynamine-ui/issues');
            }
        }, {
            type: 'separator'
        }, {
            label: 'About Dynamine',
            click: () => {
                electron.shell.openExternal('https://dynamine.io/');
            }
        }]
    }];

    let menu = Menu.buildFromTemplate(menuTemplate);

    if (process.platform === 'darwin' || process.platform === 'mas') {
        Menu.setApplicationMenu(menu);

    } else {
        window.setMenu(menu);
    }
});

app.on('quit', () => {
  if(mainWindow) { //preventing message shown for null mainWindow
    mainWindow.close(); //make sure we run window shutdown code before quiting
  }
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});

ipcMain.on('get-config', (event, arg) => {
    if (arg === 'VERSION') {
        event.returnValue = VERSION;
        return;
    }

    event.returnValue = appConfig[arg];
});

ipcMain.on('write-config', (event, arg) => {
    appConfig[arg.name] = arg.config;

    jsonfile.writeFile(configFile, appConfig, function (error) {
        if (error) {
            event.sender.send('write-config-error', {message: 'Could not write configuration file.' + error});

        } else {
            event.sender.send('write-config-success', {message: 'Configuration saved successfully'});
        }
    });
});

ipcMain.on('open-external', (event, arg) => {
    electron.shell.openExternal(arg);
});
