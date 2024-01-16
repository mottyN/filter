# Specify the task name and action
$TaskName = "DailyBackupTask"
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "node --env-file= <path to .env file> <My app>/database/utils/restoreDatabaseDump.js"


# Specify the trigger for daily execution
$Trigger = New-ScheduledTaskTrigger -Daily -At "3:00 AM"


# Create the task
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Settings (New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries)


# Register the task
Register-ScheduledTask -TaskName $TaskName -InputObject $Task