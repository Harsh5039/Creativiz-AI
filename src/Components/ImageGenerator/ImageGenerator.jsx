import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import photo from '../Assets/photo.jpg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
            const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                   Authorization: `Bearer $import.meta.env.REACT_APP_OPENAI_SECRET}`,
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            }
        );                                      
        let data = await response.json();
        // Check if data_array exists and has at least one element
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            setImage_url(data.data[0].url);
        } else {
            // Handle the case where data is not in the expected format or is undefined
            console.error('Data is undefined or not in the expected format:', data);
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">Ai-image<span> generator</span></div>
            <div className='img-loading'>
                <div className='image'><img src={image_url === "/" ? photo : image_url} alt="" /></div>
            </div>
            <div className="search-box">
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe the text you want to see' />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator;
