import { exec } from 'child_process'

export default class AllBranches
{
    execute(cwd = './')
    {
        return new Promise((resolve, reject) => {
            exec('git branch -a', { cwd }, (error, stdout, stderr) => {
                const parsedBranches = this.parseBranches(stdout)
                resolve(parsedBranches)
            })
        })
    }

    parseBranches(output) {
        const lines = output.split("\n")
        const branches = []
        for(let i = 0; i < lines.length; i++) {
            if(lines[i].includes('remotes/origin/HEAD -> origin/master')) {
                continue
            }
            const lineName = this.processBranchName(lines[i])
            if(lineName.substr(0, 2) == '* '){
                branches.push({
                    name: lineName.substr(2),
                    current: true
                })
                continue;
            }
            branches.push({
                name: lineName,
                current: false
            })
        }
        return branches
    }

    processBranchName(name) {
        name =  name.trim()
                    .replace('remotes/', '')
        return name
    }

}
