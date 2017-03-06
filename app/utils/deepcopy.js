function deepcopy (object) {
    //return JSON.parse(JSON.stringify(object))
    if(typeof object == 'object') {
        if(object.constructor === Array) {
            return object.slice(0)
        }
        let clone = {}
        Object.entries(object).forEach( ([key, value]) => {
            clone[key] = deepcopy(value)
        })
        return clone
    }
    return object
}

export default deepcopy
