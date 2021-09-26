# Portable E-Book Reader

That project is a template to create E-Book Reader. Not a PDF reader.

> [Click](#docs "Docs") to see docs.

## Features

* Whiteboard
* Extras (PDF/Sound/Video)
* Zoom
* Draw On Page
* Touch Support
* Cross Platform (Windows/Linux/MacOS/BSD)
* Multiple Books Support
* Absolutely Free & Open Source (MIT License)

## To-Do List

* [-] Bookmarks
* [-] Create detailed docs

## Used in project

* [NeutralinoJS](https://github.com/neutralinojs/neutralinojs) - MIT License
* [Bootstrap Icons](https://github.com/twbs/icons) - MIT License
* [drawingboard.js](https://github.com/Leimi/drawingboard.js) - MIT License

## Support

* Windows (x64) 10 and above 
* MacOS (x64, arm64)
* Linux (x64, ia32, armhf)
* BSD (Possible to build from the source)

> Learn about from [NeutralinoJS - Github](https://github.com/neutralinojs/neutralinojs)

* Windows 7 (x64) and above
   > With special launcher. [About Launcher](#launcher "About Launcher")

<h2 id="launcher">Launcher</h2>

Main purpose of launcher is supporting Win7 and Win8. Also you can try run that if have any problem on Neutralino Windows build.
> You should use bat file in project to start app.

> This launcher requires `chrome.exe`.

## Updater

Main purpose of updater is updating applications (that use this template). 

> Updater may harm your app.

> Files that no longer use will continue to be stored.

<h1 id="docs">Docs</h1>

## Notes

* Not supported PDF files. You must convert PDF to image (like JPG/PNG/SVG) format.
   > You can use [PDF-to-Image](https://github.com/gokulmanohar/PDF-to-Image)
* If you are on Windows, you might get an empty white screen. The reason is that accessing localhost from a UWP context is disabled by default.
   > You can learn solution from [Neutralino Docs](https://neutralino.js.org/docs/getting-started/your-first-neutralinojs-app#:~:text=If%20you%20are%20on%20Windows%2C%20you%20might%20get%20an%20empty%20white%20screen.%20The%20reason%20is%20that%20accessing%20localhost%20from%20a%20UWP%20context%20is%20disabled%20by%20default.)
   > If you use earlier build of Windows 10, install [Webview2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/). (Webview2 Runtime comes with latest Win10 builds and Win11.)
* `gh-pages/version.txt` and `gh-pages/update.zip` require for  update. Zip file keep update files. Version.txt keep version of update.
   > `gh-pages/version.txt`: `1~0` `1`: Latest edition, `~`: Separator, `0`: Earlier edition supported by updates.
* Updater and Special Launcher written in [Vlang](https://vlang.io) `0.2.4`.

## Creating an application

> Without special launcher.

1. Clone this repo.
2. Run `neu update` command.
3. Edit [books.json](#books "books.json").
4. Edit [brand.json](#brand "books.json").
5. Run `neu build` command.
6. Your app will be successfully created.
   > Check out `/dist` directory.

> With special launcher.

1. Clone this repo.
2. Run `neu update` command.
3. Edit [books.json](#books "books.json").
4. Edit [brand.json](#brand "books.json").
5. Move `/bin/*` to `/*` and remove `bin` folder.
6. Compile launcher code.
7. After move launcher and bat file to `/` of project.
8. Your app is ready.
   > Note: You must distribute project folder to share program.

<h3 id="books">books.json</h3>

```
    {
        "name":"Example",
        "folder":"example",
        "forename":"page",
        "format":"jpg",
        "cover":1,
        "start":2,
        "end":6,
        "extras":{
            "1":"sound_1.mp3",
            "2":"video_2.mp4"
        }
    }
```

/resources/books/`%folder%`/`%forename%%page%`.`%format%`

* name: Name of book
* folder: Assets folder of book
* forename: Forename of book' pages
* format: File type of images
* cover: Page of book cover
* start: Pages start with that number
* end: Pages finish with that number
* extras: Extra photo/music/video
   * `"number":"file"`
   > number: Number of Page
   
   > file: Extra file


<h3 id="brand">brand.json</h3>

```
{
    "name":"Brand",
    "logo":"brand.svg"
}
```

* name: Name of your brand
* logo: Logo of your brand

### app.json
```
{
    "big_buttons":0,
    "show_clock":1
}
```

> This is experimental features. Can change/remove.

* "big_buttons": Show big buttons on status bar and paint controls. Recommend for high-resolution or touch screens. (Default: 0)
* "show_clock": Show clock on status bar. (Default: 1)