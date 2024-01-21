const { exec } = require('child_process');
require('dotenv').config();


// MySQL database configuration
const dbConfig = {
    host: "34.31.160.141",
    user: "root",
    password: process.env.passwordDB,
    database: "jjh",
};


// Backup directory
const backupDir = process.env.BACKUP_DIR;
 const restoreDatabaseDump = (backupFile) => {
   const restoreCommand = `mysqldump --host=${dbConfig.host} --user=${dbConfig.user} --password=${dbConfig.password} ${dbConfig.database} < ${backupDir}/${backupFileName}`;


   exec(command, (error, stdout, stderr) => {
       if (error) {
           console.error(`Error restoring database: ${error.message}`);
           return;
       }
       console.log('Database restored successfully');
   });
};


// Usage
const backupFile = process.argv[2];
restoreDatabaseDump(backupFile);


