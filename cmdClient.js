const { exec } = require('child_process');

// הפקודה הראשונה
const command1 = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f';

// הפקודה השנייה
const command2 = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d 100.200.3.4:8080 /f';

// הפעלת הפקודה הראשונה
exec(command1, (error1, stdout1, stderr1) => {
    if (error1) {
        console.error(`Error executing command 1: ${error1}`);
        return;
    }
    
    // הפעלת הפקודה השנייה
    exec(command2, (error2, stdout2, stderr2) => {
        if (error2) {
            console.error(`Error executing command 2: ${error2}`);
            return;
        }

        // הפקודות הושלמו בהצלחה
        console.log('Commands executed successfully.');
    });
});
