// This file, when called, will load every file in the watchers directory
// and kick them off.
//
// Note: this file and the logic it calls assumes our stores are initialized.
// If they are not, the watchers themselves will begin to throw errors.

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const watcherFiles = requireAll(require.context('./watchers', true, /^\.\/.*\.js$/));

const watchers = {
    _watcherClasses: {},
    _watchers: {},
    getWatcher: (name) => {
        return this._watchers[name]
    }
}

watcherFiles.forEach(watcher => {
    // Skip over our default/base Watcher
    if(watcher.name == 'Watcher') return
    watchers._watcherClasses[watcher.name] = watcher
    const watcherInstance = new watchers._watcherClasses[watcher.name]()
    watchers._watchers[watcherInstance.name] = watcherInstance
    watcherInstance.start()
})

export default watchers
