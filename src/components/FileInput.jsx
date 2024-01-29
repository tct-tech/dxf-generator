import React, { useState } from 'react';
import DataProcessor from './DataProcessor';
import '../styles/styles.css';

const FileInput = () => {
    const [selectedFile, setSelectedFile] = useState(null); 

    const handleFileInput = async (e) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const textArray = text.split('\n').filter((el) => {
                return el !== '';
            });
            setSelectedFile(textArray);
        }
        reader.readAsText(e.target.files[0]);
    }

    return(
        <div className='inputForm'>
            <input type="file" onChange={(e)=>{ handleFileInput(e) }}/>
            <DataProcessor file={selectedFile}/>
        </div>
    );
}

export default FileInput;