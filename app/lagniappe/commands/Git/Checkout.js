import { exec } from 'child_process'

export default class AllBranches
{

    execute(branch, cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('git checkout ' + branch, { cwd }, (error, stdout, stderr) => {
                resolve()
            })
        })
    }

}
