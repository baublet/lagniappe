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
