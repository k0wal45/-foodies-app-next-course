'use client'

import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

const ImagePicker = ({label, name}) => {
  const [pickedImage, setPickedImage] = useState()
  const imageInput = useRef()

  const handleClick = () => {
    imageInput.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }

    fileReader.readAsDataURL(file)
  }
  
  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt='The image selected by the user' fill/>
          )
          }
        </div>
        <input onChange={handleImageChange} className={classes.input} type="file" name={name} id={name} accept='image/png, image/jpeg' ref={imageInput} required/>
        <button onClick={handleClick} className={classes.button} type='button'>Pick an image</button>
      </div>
    </div>
  )
}

export default ImagePicker
