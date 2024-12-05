const {
  app,
  BrowserWindow,
  nativeImage,
  Tray,
  Menu,
  screen,
} = require("electron");
const path = require("path");

let tray;

function createLoginWindow() {
  const loginWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  loginWindow.loadFile("login.html");
}

function createWidget() {
  const widgetWidth = 300;
  const widgetHeight = 200;

  const widget = new BrowserWindow({
    width: widgetWidth,
    height: widgetHeight,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  widget.loadFile("widget.html");

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const x = width - widgetWidth - 10;
  const y = height - widgetHeight - 10;

  widget.setBounds({ x, y, width: widgetWidth, height: widgetHeight });
}

app.whenReady().then(() => {
  createLoginWindow();
  createWidget();

  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "icon.ico")));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ]);
  tray.setContextMenu(contextMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoginWindow();
      createWidget();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
