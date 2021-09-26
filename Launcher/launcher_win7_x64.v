import vweb
import os

struct App {
    vweb.Context
}

fn main() {
    port:=3748
    vweb.run(&App{}, port)
}

fn get_mimetype(fileName string) string{

    extension_of_file:= fileName.split('.').last().to_lower()
    charset:=" charset=utf-8"

    if extension_of_file=="htm" || extension_of_file=="html" {
        return "text/html; $charset"

    } else if extension_of_file=="css" {
        return "text/css; $charset"

    } else if extension_of_file=="gif" {
        return "image/gif"

    } else if extension_of_file=="jpg" {
        return "image/jpg"

    } else if extension_of_file=="mp3" {
        return "audio/mp3"

    } else if extension_of_file=="wav" {
        return "audio/wav"

    } else if extension_of_file=="mp4" {
        return "video/mp4"

    } else if extension_of_file=="js" {
        return "application/javascript; $charset"

    } else if extension_of_file=="json" {
        return "application/json; $charset"

    } else if extension_of_file=="md" {
        return "text/markdown; $charset"

    } else if extension_of_file=="pdf" {
        return "application/pdf;"

    } else if extension_of_file=="png" {
        return "image/png"

    } else if extension_of_file=="svg" {
        return "image/svg+xml; $charset"

    } else if extension_of_file=="wasm" {
        return "application/wasm"

    } else if extension_of_file=="xml" {
        return "text/xml; $charset"

    } else if extension_of_file=="ico" {
        return "img/x-icon; $charset"

    } else{
    return "text/plain; $charset"
    }
}

['/close']
fn (mut app App) close() vweb.Result {

    os.execute("taskkill /f /im chrome.exe")
    exit(1)
    return app.text("")
}

['/res/:file']
fn (mut app App) res(file string) vweb.Result {

    mut data:="${os.getwd()}/resources/$file"
    data = os.read_file(data) or { return app.text("") }
    app.send_response_to_client(get_mimetype(file),data)
    return app.text("")
}

['/res/:folder/:file']
fn (mut app App) res_subfolder(folder string, file string) vweb.Result {

    mut data:="${os.getwd()}/resources/$folder/$file"
    data = os.read_file(data) or { return app.text("") }
    app.send_response_to_client(get_mimetype(file),data)
    return app.text("")

}

['/res/:folder/:folder2/:file']
fn (mut app App) res_subfolder_subfolder(folder string, folder2 string, file string) vweb.Result {

    mut data:="${os.getwd()}/resources/$folder/$folder2/$file"
    data = os.read_file(data) or { return app.text("") }
    app.send_response_to_client(get_mimetype(file),data)
    return app.text("")

}