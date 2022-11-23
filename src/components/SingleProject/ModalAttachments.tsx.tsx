/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState, FormEvent, ChangeEvent  } from 'react';
import useParams from '../../app/utils';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector  } from '../../app/hooks';
import {
    getRoomLights,
} from '../../redux/actions/lightActions';
import {
    getProjectAttach,
    addProjectAttach
} from '../../redux/actions/projectActions';
import '../NewRoomModal/style/newRoomModal.css';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    project: any;
    attachDelete: any;
    setAttachDelete: any;
    
};

export const ModalAttachments: FC<Props> = ({
    closeModal,
    openModal,
    project,
    attachDelete,
    setAttachDelete
}) => {
    const projId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const { projectAttach } = useAppSelector(
        ({ project }) => project
    );

    console.log(projectAttach)

    const userId = useParams('_id');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [imgFiles, setImgfiles] = useState<any>([]);
    const [pdfFiles, setPdfFiles] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [pdf, setPdf] = useState<any>([]);
    const [imageName, setImageNames] = useState<any>([]);
    const [pdfNames, setPdfNames] = useState<any>([]);


    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'images') {
            setImgfiles(e.target.files);
        }
        if (e.target.name === 'pdf') {
            setPdfFiles(e.target.files);
        }
        console.log(pdfFiles, pdf, pdfNames, imgFiles, images, imageName)
    };

    const listFileNames1 = (e: any) => {
        e.preventDefault();
        if (pdfFiles.length) {
            for (const key of Object.keys(pdfFiles)) {
                setPdf([...pdf, pdfFiles[key]]);
                setPdfNames([...pdfNames, pdfFiles[key].name]);
            }
        
        }
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
    };


    const onSubmit = async (e: any) => {
        e.preventDefault();
        const fs = new FormData();

        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                fs.append('images', images[i]);
            }
        }
        if (pdf.length) {
            for (let i = 0; i < pdf.length; i++) {
                fs.append('pdf', pdf[i]);
            }
        }
             fs.append('projId', String(projId))
             fs.append('clientId', String(userId))
            
            
        try {
         if (projectAttach === null) {
            dispatch(addProjectAttach(fs)) 
         } else {
              fs.append('edit', 'add')
            dispatch(getProjectAttach(fs))
         }
         if (pdf.length | images.length)
          closeModal(!openModal)
         
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
                            setAttachDelete(false)
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                {!attachDelete ? (
                    <form className="" onSubmit={onSubmit}>
                    <div className='project-details-attachment'>
                        <h3>{project?.name}</h3>
                        <p>{project?.archived === true ? "Project Archived" : ''}</p>
                        
                    </div>
                <div className="">
                        <h4 className="title-attachments">
                            Images & Attachments
                        </h4>
                        <div className="">
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
                            <button onClick={(e) => listFileNames1(e)}>
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
                        </div>
                    </div>
                    <button id="inventory-btn" onClick={(e) => onSubmit(e)}>
                    Submit
                </button>
                </form>
                ) : (
                    <div>
                        <button>Delete Attachment</button>
                    </div>
                )}
                
                
            </div>
        </div>
    );
};
