import React from 'react';
import './image.css';

function image({ img, name, handlePreviewImage }) {

    return (
        <div id={name} className='image'>
            <img onclick={() => handlePreviewImage(name)} src={img} alt='' />
            <h3>{name}</h3>
        </div>
    )
}

export default image
