import { exec } from 'child_process'

export default class Share
{

    execute(path)
    {
        return new Promise((resolve, reject) => {
            // 1. Kill existing ngrok tunnels
            // 2. Share the current path (but direct the output to dev/null)
            // 3. Get the share URL
            exec('killall ngrok && valet share > /dev/null & && valet fetch-share-url', { cwd: path },
                 (error, stdout, stderr) => {

                // Only send back the last line, which oughta be our ngrok URL
                resolve(stdout.split("\n").slice(-1))
            })
        })
    }


}
