// src/components/Form/FileBase64.jsx
import React from 'react'

/**
 * Props:
 * - multiple: boolean (default false)
 * - accept: string (optional, e.g. "image/*")
 * - onDone: function({ base64, file })  // called when file(s) read
 */
export default function FileBase64({ multiple = false, accept, onDone }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // If multiple, read all, otherwise only first
    if (multiple) {
      Promise.all(files.map(file => readFileAsDataURL(file)))
        .then(results => {
          // results is array of dataURLs matching files order
          const payload = results.map((base64, i) => ({ base64, file: files[i] }))
          onDone(payload)
        })
        .catch(err => {
          console.error('Failed to read files', err)
        })
    } else {
      const file = files[0]
      readFileAsDataURL(file)
        .then(base64 => onDone({ base64, file }))
        .catch(err => console.error('Failed to read file', err))
    }

    // Optional: reset input so same file can be re-selected
    e.target.value = ''
  }

  const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => {
      reader.abort()
      reject(new DOMException("Problem parsing input file."))
    }
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })

  return (
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleChange}
    />
  )
}
