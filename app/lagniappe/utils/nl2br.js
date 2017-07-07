import React from 'react'

let newlineRegex = /(\r\n|\r|\n)/g

export default function(str) {
  if (typeof str === 'number') {
    return str
  } else if (typeof str !== 'string') {
    return ''
  }

  return str.split(newlineRegex).map(function(line, index) {
    if (line.match(newlineRegex)) {
      return React.createElement('br', { key: index })
    }
    return line
  })
}
