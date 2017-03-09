import { store } from './index.js'
import fs from 'fs'

const watchersFolder = './watchers'
fs.readdir(watchersFolder, (err, files) => {
  files.forEach(file => {
    console.log(file)
  })
})
