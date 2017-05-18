import PackageManager from 'dependencies/PackageManager'
import Git from 'dependencies/Git'
import Go from 'dependencies/Go'

// Add your dependencies here, IN THE PROPER ORDER! E.g., you probably can't
// install nginx on OSX easily without Homebrew, so Homebrew has to go first.
const dependencies = [
    new PackageManager(),
    new Git(),
    new Go(),
]

export default dependencies
