set WshShell = WScript.CreateObject("WScript.Shell" )
sStartmenuPath = WshShell.SpecialFolders("StartMenu")
set oShellLink = WshShell.CreateShortcut(sStartmenuPath & "" & Wscript.Arguments.Named("shortcut") & ".lnk")
oShellLink.TargetPath = Wscript.Arguments.Named("target")
oShellLink.WindowStyle = 1
oShellLink.Save