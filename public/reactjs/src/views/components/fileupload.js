import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button } from '@material-ui/core';
import './fileUpload.css';

function fileupload({ handleUploadFile }) {
    return (
        <div className='file_upload'>
            <div className='file_border'>
                <Button
                    className='input_button'
                    variant="contained"
                    component="label"
                >
                    <CloudUploadIcon className='upload_icon' />
                    <span className='upload_lable'>Upload</span>
                    <input
                        onChange={(event) => handleUploadFile}
                        className='file_input'
                        type="file"
                        accept="image/*"
                    />
                </Button>
            </div>
        </div>
    )
}

export default fileupload
