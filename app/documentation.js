import glob from 'glob'
import path from 'path'

const pattern = 'app/documentation/**/*.md'
const base    = 'app/documentation/'

const docTree = {
    basePath: path.resolve(base),
    _tree: [],
    _treeArray: [],
    _treeParsed: false,
    getTree() {
        if(this._treeParsed) return this._tree
        this.getFiles()
        this.parseTree()
        return this._tree
    },
    getFiles() {
        this._tree = []
        this._treeArray = []
        this._treeArray = glob.sync(pattern, {})
        this._treeParsed = false
    },
    parseTree() {
        this._tree = this._parse(this._treeArray)
        this._treeParsed = true
    },
    _parse(treeArray) {
        let scrubbedTree = treeArray.map(n => n.replace(base, ''))
        let tree = { _paths: [] }
        for (let i = 0; i < scrubbedTree.length; i++) {
            let parts = scrubbedTree[i].split('/')
            let currentNode = tree
            let currentPath = scrubbedTree[i]
            for(let j = 0; j < parts.length; j++) {
                const part = parts[j]
                if(part.includes('.md')) {
                    if(!currentNode._paths) currentNode._paths = []
                    currentNode._paths.push({
                        path: currentPath,
                        url: '/docs' + this.basePath + '/' + scrubbedTree[i],
                        display: this._formatItemText(currentPath)
                    })
                } else {
                    if(!currentNode[part]) currentNode[part] = {}
                    currentNode = currentNode[part]
                }
            }
        }
        return tree
    },
    _formatItemText(path) {
        return path.split('/').pop().replace('.md', '')
    }
}

export default docTree
