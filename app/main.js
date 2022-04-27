const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    //ventana del proyecto, se le pueden pasar varias cosas, como el width y el height
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile(__dirname + '/index.html')
})

