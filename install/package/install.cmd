<!-- : --- Self-Elevating Batch Script ---------------------------
@whoami /groups | find "S-1-16-12288" > nul && goto :admin
set "ELEVATE_CMDLINE=cd /d "%~dp0" & call "%~f0" %*"
cscript //nologo "%~f0?.wsf" //job:Elevate & exit /b

-->
<job id="Elevate"><script language="VBScript">
  Set objShell = CreateObject("Shell.Application")
  Set objWshShell = WScript.CreateObject("WScript.Shell")
  Set objWshProcessEnv = objWshShell.Environment("PROCESS")
  strCommandLine = Trim(objWshProcessEnv("ELEVATE_CMDLINE"))
  objShell.ShellExecute "cmd", "/c " & strCommandLine, "", "runas"
</script></job>
:admin -----------------------------------------------------------

@echo off
echo Running as elevated user.
echo Script file : %~f0
echo Arguments   : %*
echo Working dir : %cd%
echo before rem
REM - Extract cab file. Make sure fresh directory
echo after rem
call IF EXIST "C:\Program Files\Dynamine" rmdir /S /Q "C:\Program Files\Dynamine"
echo Expanding...
call EXPAND dynamine.cab -F:* "C:\Program Files"
echo Renaming...
call move "C:\Program Files\Dynamine-win32-x64" "C:\Program Files\Dynamine"
echo Making shortcut
REM call mkshortcut /target:"C:\Program Files\Dynamine\Dynamine.exe"  /shortcut:"Dynamine"
REM call move 
echo Starting...
call "C:\Program Files\Dynamine\Dynamine.exe"
echo end
REM - Move everything from the cab extracted folder into the Dynamine directory
REM - Move the dynamine-daemon.exe into the Dynamine directory
REM - Call install on dynamine-daemon.exe /install
REM - Create desktop shortcut for UI