import szip
import net.http
import os

updater_version:="0.1"
version_file:="https://malisipi.github.io/Portable-EBook-Reader/version.txt"
update_file:="https://malisipi.github.io/Portable-EBook-Reader/Update.zip"
app_folder:="EBook"

print("Updater:"+updater_version+"\n")
print("Checking Updates..."+"\n")

latest_version := http.get(version_file) or {
   print("Check Wi-fi Connection ::err:NoWifi")
   exit(1)
}

current_version := os.read_file("version.txt") or {panic("::err:NoVersionFile")}

if current_version.int() < latest_version.text.split("~")[0].int() {
   if current_version.int() < latest_version.text.split("~")[1].int() {
      print("End Of Life ::err:EndOfLife")
      exit(1)
   }
   print("New Update Found!\n")
   print("Downloading Updates...\n")
   http.download_file(update_file,"./update.zip") or { // Get Updates
      print("Check Wi-fi Connection ::err:NoWifi")
      exit(1)
   }
   print("Extracting Updates...\n")
   szip.extract_zip_to_dir("./update.zip",app_folder) or {panic("::err:ExtractUpdate")} // Extract Updates
   os.write_file("version.txt",latest_version.text.split("~")[0]) or {panic("::err:UpdateVersionFile")}
   print("Done\n")
} else {
   print("You are using latest version. :)")
}