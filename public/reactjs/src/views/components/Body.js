import React from 'react';
import './Body.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button } from '@material-ui/core';
import './fileUpload.css';
import Image from './image';

function Body({ handleUploadFile, imgList }) {

    const handlePreviewImage = (name) => {
        console.log('cliced', name)
    }

    return (
        <>
            <div className='body'>
                <div className='file_upload'>
                    <div className='file_border'>
                        <Button
                            className='input_button'
                            variant="contained"
                            component="label"
                        >
                            <CloudUploadIcon className='upload_icon' />
                            <span className='upload_lable'>Upload</span>
                            <input onChange={(event) => handleUploadFile(event)} className='file_input'
                                type="file" accept="image/*"
                            />
                        </Button>
                    </div>
                </div>
                <div className='img_container'>
                    <div className='img_list'>
                        {imgList && imgList?.map((record, index) => {
                            return <Image
                                className='image'
                                img={record.file_data}
                                name={record.file_name}
                                handlePreviewImage={(name) => handlePreviewImage(name)}
                            />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body;