/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState, ChangeEvent  } from 'react';
import useParams from '../../app/utils';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import '../NewRoomModal/style/newRoomModal.css';
import { axiosFileUpload } from '../../api/axios';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    project: any;
    
};

export const ModalAttachments: FC<Props> = ({
    closeModal,
    openModal,
    project,
}) => {
    const [imgFiles, setImgfiles] = useState<any>([]);
    const [pdfFiles, setPdfFiles] = useState<any>([]);
    const [drawingFilesArray, setDrawingFilesArray] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [pdf, setPdf] = useState<any>([]);
    const [drawingFiles, setDrawingFiles] = useState<any>([]);
    const [imageName, setImageNames] = useState<any>([]);
    const [pdfNames, setPdfNames] = useState<any>([]);
    const [drawingFilesNames, setDrawingFilesNames] = useState<any>([]);


    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'images') {
            setImgfiles(e.target.files);
        }
        if (e.target.name === 'pdf') {
            setPdfFiles(e.target.files);
        }
        if (e.target.name === 'drawingFiles') {
            setDrawingFilesArray(e.target.files);
        }
        console.log(pdfFiles, pdf, pdfNames,'\n', imgFiles, images, imageName)
    };

    const listFileNames = (e: any) => {
        e.preventDefault();
        if (imgFiles.length) {
            for (const key of Object.keys(imgFiles)) {
                console.log(imgFiles[key]);
                const objectUrl = URL.createObjectURL(imgFiles[key]);
                setImageNames([...imageName, objectUrl]);
                setImages([...images, imgFiles[key]]);
            }
        }
        if (pdfFiles.length) {
            for (const key of Object.keys(pdfFiles)) {
                setPdf([...pdf, pdfFiles[key]]);
                setPdfNames([...pdfNames, pdfFiles[key].name]);
            }
        }
        if (drawingFilesArray.length) {
            for (const key of Object.keys(drawingFilesArray)) {
                const objectUrl = URL.createObjectURL(drawingFilesArray[key]);
                setDrawingFiles([...drawingFiles, drawingFilesArray[key]]);
                setDrawingFilesNames([...drawingFilesNames, objectUrl]);
            }
        }
    };


    const onSubmit = async (e: any) => {
        e.preventDefault();
        const axiosPriv = axiosFileUpload();
        const fs = new FormData();

        console.log("imgs, pdf",images, pdf)
        fs.append('projId', project._id)
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                fs.append('images', images[i]);
                console.log("imgs: ", images[i])
                console.log("fs: ",fs)
            }
            console.log("fsIMG : ",fs)
        }
        if (pdf.length) {
            for (let i = 0; i < pdf.length; i++) {
                fs.append('pdf', pdf[i]);
                console.log("pdf: ", pdf)
                console.log("pdfI: ", pdf[i])
                console.log("fspdf: ", fs)
            }
            console.log("fs pdf: ",fs, pdf)
        }
        if (drawingFiles.length) {
            for (let i = 0; i < drawingFiles.length; i++) {
                fs.append('drawingFiles', drawingFiles[i]);
            }
        }
             
            //  fs.append('edit', 'add')
             console.log("imgfiles, imgs, fs: ",imgFiles, images, fs)
        try {
            (await axiosPriv).post('/new-attachments', fs);
        }
        catch (error: any) {
            alert(error.messsge);
            console.log('Error Message: ', error.message);
        }
    };

    return (
        <div className="new-room-modal-background">
            <div className="new-room-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <form className="" onSubmit={onSubmit}>
                    <div className='project-details-attachment'>
                        <h3>{project?.name}</h3>
                        <p>{project?.archived === true ? "Project Archived" : ''}</p>
                        
                    </div>
                <div className="tab">
                        <input type="checkbox" id="chck5" />
                        <label className="tab-label" htmlFor="chck5">
                            Images & Attachments
                        </label>
                        <div className="tab-content">
                            <label htmlFor="images">Images</label>
                            <br />
                            
                            <input
                                className="list-input"
                                id="images"
                                placeholder="Upload Images"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                multiple
                                name="images"
                                onChange={(e) => handleFileUpload(e)}
                            />
                            <button onClick={(e) => listFileNames(e)}>
                                Add Value
                            </button>

                            <div className='img-container-attach'>
                                {imageName.map((url: any, index: number) => {
                                    console.log(url);
                                    return <img src={url} key={index} alt="" />;
                                })}
                            </div>
                            <br />
                            <label htmlFor="pdf">PDF</label>
                            <br />
                            <input
                                className="list-input"
                                id="pdf"
                                placeholder="Upload PDF's"
                                type="file"
                                accept="application/pdf"
                                multiple
                                name="pdf"
                                onChange={(e) => handleFileUpload(e)}
                            />
                            <button onClick={(e) => listFileNames(e)}>
                                Add Value
                            </button>
                            <input
                                className="body-input"
                                id="pdfValues"
                                placeholder="Values go here"
                                type="text"
                                name="pdfValues"
                                value={pdf}
                                readOnly
                                required
                            />
                            <br />
                            <label htmlFor="drawingFiles">Drawing Files</label>
                            <br />
                            <input
                                className="list-input"
                                id="drawingFiles"
                                placeholder="Upload Drawing Files"
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                name="drawingFiles"
                                onChange={(e) => handleFileUpload(e)}
                            />
                            <button className='btn-attach-add' onClick={(e) => listFileNames(e)}>
                                Add Values
                            </button>
                            <div>
                                {drawingFilesNames.map(
                                    (url: any, index: number) => {
                                        console.log(url);
                                        return (
                                            <img src={url} key={index} alt="" />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <button id="inventory-btn" onClick={(e) => onSubmit(e)}>
                    Submit
                </button>
                </form>
                
            </div>
        </div>
    );
};
