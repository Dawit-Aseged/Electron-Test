// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;

const { cwd } = require('process');


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Menu stuff
  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {label: "Adjust Notification Value"},
        {
          label: "CoinMarketCap",
          click() {
            shell.openExternal('http://coinmarketcap.com');
          }
          
        },
        {type: 'separator'},
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);
  
  Menu.setApplicationMenu(menu);
  
  ipc.on('update-notify-value', function(event, arg) {
    mainWindow.webContents.send('targetPriceVal', arg)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    


  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


 
















// Very Important for Project 
var gitPath = "D:\\Projects\\MAD Project Management WFA\\Asmera\\Asmera"
// Testing PowerShell
function btnClick() {
  var spawn = require("child_process").spawn,child;
  child = spawn("powershell.exe",['git status'], {cwd:gitPath});
  child.stdout.on("data",function(data){
      console.log("Powershell Data: " + data);
  });
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
  child.on("exit",function(){
      console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
}


