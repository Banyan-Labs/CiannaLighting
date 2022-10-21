import { ListOfRecursiveArraysOrValues } from 'lodash';
import React, { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosPrivate, axiosFileUpload } from '../../api/axios';
import { useAppSelector } from '../../app/hooks';
import './styles/inventory.scss';
// import catalogInterface from "../../../server/src/interfaces/catalogInterface"

interface CatalogType {
    item_ID: string;
    itemName: string;
    employeeID: string;
    itemDescription: string;
    bodyDiameter: string;
    bodyLength: string;
    bodyWidth: string;
    bodyHeight: string;
    fixtureOverallHeight: string;
    sconceHeight: string;
    sconceWidth: string;
    sconceExtension: string;
    socketQuantity: number;
    powerInWatts: number;
    estimatedWeight: number;
    price: number;
    material: string;
    exteriorFinish: string[];
    interiorFinish: string[];
    lensMaterial: string[];
    glassOptions: string[];
    acrylicOptions: string[];
    environment: string[];
    safetyCert: string[];
    projectVoltage: string[];
    socketType: string[];
    mounting: string[];
    crystalType: string[];
    designStyle: string[];
    usePackages: string[];
    // images: File[]; //s3
    // pdf: string[]; //s3
    // drawingFiles: string[]; //s3
    costAdmin: number;
    partnerCodeAdmin: string;
}
type SetList = {
    name: string;
    value: string;
};

const Inventory: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const [itemDetails, setItemDetails] = useState<any>({
        employeeID: user._id,
        item_ID: '',
        itemName: '',
        itemDescription: '',
        bodyDiameter: '',
        bodyLength: '',
        bodyWidth: '',
        bodyHeight: '',
        fixtureOverallHeight: '',
        sconceHeight: '',
        sconceWidth: '',
        sconceExtension: '',
        material: '',
        socketQuantity: 0,
        powerInWatts: 0,
        estimatedWeight: 0,
        price: 0,
        exteriorFinish: [], //[]
        interiorFinish: [], //[]
        lensMaterial: [], //[]
        glassOptions: [], //[]
        acrylicOptions: [], //[]
        environment: [], //[]
        safetyCert: [], //[]
        projectVoltage: [], //[]
        socketType: [], //[]
        mounting: [], //[]
        crystalType: [], //[]
        designStyle: [], //[]
        usePackages: [], //[]
        // images: [], //[]//s3
        // pdf: [], //[]//s3
        // drawingFiles: [], //[]//s3
        costAdmin: 0,
        partnerCodeAdmin: '',
    });
    const [listValue, setListValue] = useState<SetList>({
        name: '',
        value: '',
    });
    const [imgFiles, setImgfiles] = useState<any>();
    const [pdfFiles, setPdfFiles] = useState<any>();
    const [drawingFilesArray, setDrawingFilesArray] = useState<any>();

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setItemDetails({
            ...itemDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
        console.log(itemDetails, 'DEETS');
    };
    const handleArrayValue = (e: FormEvent<HTMLInputElement>) => {
        if (listValue.name != e.currentTarget.name) {
            setListValue({
                name: e.currentTarget.name,
                value: e.currentTarget.value,
            });
        } else {
            setListValue({
                name: listValue.name,
                value: e.currentTarget.value,
            });
        }
    };

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
    };
    const listValSubmit = (e: any) => {
        e.preventDefault();
        const valueOfKey: any =
            itemDetails[listValue.name as keyof CatalogType];
        setItemDetails({
            ...itemDetails,
            [listValue.name]: [...valueOfKey, listValue.value],
        });
        setListValue({
            name: '',
            value: '',
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const axiosPriv = axiosFileUpload();
        const fs = new FormData();

        for (const key of Object.keys(imgFiles)) {
            fs.append('images', imgFiles[key]);
        }
        for (const key of Object.keys(pdfFiles)) {
            fs.append('pdf', imgFiles[key]);
        }
        for (const key of Object.keys(drawingFilesArray)) {
            fs.append('drawingFiles', imgFiles[key]);
        }
        for (const key of Object.keys(itemDetails)) {
            fs.append(key, itemDetails[key]);
        }

        // if (itemDetails.images.length) {
        //     for (let i = 0; i < itemDetails.images.length; i++) {
        //         fs.append('images', itemDetails.images[i]);
        //     }
        // }
        // if (itemDetails.pdf.length) {
        //     for (let i = 0; i < itemDetails.pdf.length; i++) {
        //         fs.append('pdf', itemDetails.pdf[i]);
        //     }
        // }
        // if (itemDetails.drawingFiles.length) {
        //     for (let i = 0; i < itemDetails.drawingFiles.length; i++) {
        //         fs.append('drawingFiles', itemDetails.drawingFiles[i]);
        //     }
        // }

        try {
            (await axiosPriv).post('/internal/create-light', fs);

            setItemDetails({
                employeeID: user._id,
                item_ID: '',
                itemName: '',
                itemDescription: '',
                bodyDiameter: '',
                bodyLength: '',
                bodyWidth: '',
                bodyHeight: '',
                fixtureOverallHeight: '',
                sconceHeight: '',
                sconceWidth: '',
                sconceExtension: '',
                material: '',
                socketQuantity: 0,
                powerInWatts: 0,
                estimatedWeight: 0,
                price: 0,
                exteriorFinish: [], //[]
                interiorFinish: [], //[]
                lensMaterial: [], //[]
                glassOptions: [], //[]
                acrylicOptions: [], //[]
                environment: [], //[]
                safetyCert: [], //[]
                projectVoltage: [], //[]
                socketType: [], //[]
                mounting: [], //[]
                crystalType: [], //[]
                designStyle: [], //[]
                usePackages: [], //[]
                // images: [], //[]//s3
                // pdf: [], //[]//s3
                // drawingFiles: [], //[]//s3
                costAdmin: 0,
                partnerCodeAdmin: '',
            });
        } catch (error: any) {
            alert(error.messsge);
            console.log('Error Message: ', error.message);
        }
    };

    return (
        <div className="inventory-container">
            <form className="inventory-form" onSubmit={onSubmit}>
                <label htmlFor="name">Item ID</label>
                <input
                    className="body-input"
                    id="item_ID"
                    type="text"
                    name="item_ID"
                    value={itemDetails.item_ID}
                    onChange={(e) => handleFormInput(e)}
                    placeholder="Item ID"
                    required
                />
                <label htmlFor="name">Item Name</label>
                <input
                    className="body-input"
                    id="itemName"
                    type="text"
                    name="itemName"
                    value={itemDetails.itemName}
                    onChange={(e) => handleFormInput(e)}
                    placeholder="Item Name"
                    required
                />
                <label htmlFor="description">Description</label>
                <input
                    className="body-input"
                    id="itemDescription"
                    placeholder="Description"
                    type="text"
                    name="itemDescription"
                    value={itemDetails.itemDescription}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="region">Body Diameter</label>
                <input
                    className="body-input"
                    id="bodyDiameter"
                    placeholder="Body Diameter"
                    type="text"
                    name="bodyDiameter"
                    value={itemDetails.bodyDiameter}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Body Length</label>
                <input
                    className="body-input"
                    id="bodyLength"
                    placeholder="Body Length"
                    type="text"
                    name="bodyLength"
                    value={itemDetails.bodyLength}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Body Width</label>
                <input
                    className="body-input"
                    id="bodyWidth"
                    placeholder="bodyWidth"
                    type="text"
                    name="bodyWidth"
                    value={itemDetails.bodyWidth}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Body Height</label>
                <input
                    className="body-input"
                    id="bodyHeight"
                    placeholder="Body Height"
                    type="text"
                    name="bodyHeight"
                    value={itemDetails.bodyHeight}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Fixture Height</label>
                <input
                    className="body-input"
                    id="fixtureOverallHeight"
                    placeholder="Fixture Overall Height"
                    type="text"
                    name="fixtureOverallHeight"
                    value={itemDetails.fixtureOverallHeight}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Sconce Height</label>
                <input
                    className="body-input"
                    id="sconceHeight"
                    placeholder="Sconce Height"
                    type="text"
                    name="sconceHeight"
                    value={itemDetails.sconceHeight}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Sconce Width</label>
                <input
                    className="body-input"
                    id="sconceWidth"
                    placeholder="Sconce Width"
                    type="text"
                    name="sconceWidth"
                    value={itemDetails.sconceWidth}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Sconce Extension</label>
                <input
                    className="body-input"
                    id="sconceExtension"
                    placeholder="Sconce Extension"
                    type="text"
                    name="sconceExtension"
                    value={itemDetails.sconceExtension}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Material</label>
                <input
                    className="body-input"
                    id="material"
                    placeholder="Material"
                    type="text"
                    name="material"
                    value={itemDetails.material}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Socket Quantity</label>
                <input
                    className="body-input"
                    id="socketQuantity"
                    placeholder="Socket Quantity"
                    type="number"
                    name="socketQuantity"
                    value={itemDetails.socketQuantity}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Power in Watts</label>
                <input
                    className="body-input"
                    id="powerInWatts"
                    placeholder="Power in Watts"
                    type="number"
                    name="powerInWatts"
                    value={itemDetails.powerInWatts}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Estimated Weight</label>
                <input
                    className="body-input"
                    id="estimatedWeight"
                    placeholder="Estimated Weight"
                    type="number"
                    name="estimatedWeight"
                    value={itemDetails.estimatedWeight}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Price</label>
                <input
                    className="body-input"
                    id="price"
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={itemDetails.price}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="exteriorFinish">Exterior Finish</label>
                <input
                    className="list-input"
                    id="exteriorFinish"
                    placeholder="Exterior Finish"
                    type="text"
                    name="exteriorFinish"
                    value={
                        listValue.name == 'exteriorFinish'
                            ? listValue.value
                            : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="exteriorFinishValues"
                    placeholder="Values go here"
                    type="text"
                    name="exteriorFinishValues"
                    value={itemDetails.exteriorFinish}
                    readOnly
                    required
                />

                <label htmlFor="interiorFinsish">Interior Finish</label>
                <input
                    className="list-input"
                    id="interiorFinish"
                    placeholder="Interior Finish"
                    type="text"
                    name="interiorFinish"
                    value={
                        listValue.name == 'interiorFinish'
                            ? listValue.value
                            : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="interiorFinishValues"
                    placeholder="Values go here"
                    type="text"
                    name="exteriorFinishValues"
                    value={itemDetails.interiorFinish}
                    readOnly
                    required
                />
                <label htmlFor="lensMaterial">Lens Material</label>
                <input
                    className="list-input"
                    id="lensMaterial"
                    placeholder="Lens Material"
                    type="text"
                    name="lensMaterial"
                    value={
                        listValue.name == 'lensMaterial' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="lensMaterialValues"
                    placeholder="Values go here"
                    type="text"
                    name="lensMaterialValues"
                    value={itemDetails.lensMaterial}
                    readOnly
                    required
                />
                <label htmlFor="glassOptions">Glass Options</label>
                <input
                    className="list-input"
                    id="glassOptions"
                    placeholder="Glass Options"
                    type="text"
                    name="glassOptions"
                    value={
                        listValue.name == 'glassOptions' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="glassOptionsValues"
                    placeholder="Values go here"
                    type="text"
                    name="glassOptionsValues"
                    value={itemDetails.glassOptions}
                    readOnly
                    required
                />
                <label htmlFor="acrylicOptions">Acrylic Options</label>
                <input
                    className="list-input"
                    id="acrylicOptions"
                    placeholder="Acrylic Options"
                    type="text"
                    name="acrylicOptions"
                    value={
                        listValue.name == 'acrylicOptions'
                            ? listValue.value
                            : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="acrylicOptionsValues"
                    placeholder="Values go here"
                    type="text"
                    name="acrylicOptionsValues"
                    value={itemDetails.acrylicOptions}
                    readOnly
                    required
                />
                <label htmlFor="environment">Environment</label>
                <input
                    className="list-input"
                    id="environment"
                    placeholder="Environment"
                    type="text"
                    name="environment"
                    value={
                        listValue.name == 'environment' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="environmentValues"
                    placeholder="Values go here"
                    type="text"
                    name="environmentValues"
                    value={itemDetails.environment}
                    readOnly
                    required
                />
                <label htmlFor="safetyCert">Safety Cert</label>
                <input
                    className="list-input"
                    id="safetyCert"
                    placeholder="Safety Certifications"
                    type="text"
                    name="safetyCert"
                    value={
                        listValue.name == 'safetyCert' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="safetyCertValues"
                    placeholder="Values go here"
                    type="text"
                    name="safetyCertValues"
                    value={itemDetails.safetyCert}
                    readOnly
                    required
                />
                <label htmlFor="projectVoltage">Project Voltage</label>
                <input
                    className="list-input"
                    id="projectVoltage"
                    placeholder="Project Voltage"
                    type="text"
                    name="projectVoltage"
                    value={
                        listValue.name == 'projectVoltage'
                            ? listValue.value
                            : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="projectVoltageValues"
                    placeholder="Values go here"
                    type="text"
                    name="projectVoltageValues"
                    value={itemDetails.projectVoltage}
                    readOnly
                    required
                />
                <label htmlFor="socketType">Socket Type</label>
                <input
                    className="list-input"
                    id="socketType"
                    placeholder="Socket Types"
                    type="text"
                    name="socketType"
                    value={
                        listValue.name == 'socketType' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="socketTypeValues"
                    placeholder="Values go here"
                    type="text"
                    name="socketTypeValues"
                    value={itemDetails.socketType}
                    readOnly
                    required
                />
                <label htmlFor="mounting">Mounting</label>
                <input
                    className="list-input"
                    id="mounting"
                    placeholder="Mounting"
                    type="text"
                    name="mounting"
                    value={listValue.name == 'mounting' ? listValue.value : ''}
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="mountingValues"
                    placeholder="Values go here"
                    type="text"
                    name="mountingValues"
                    value={itemDetails.mounting}
                    readOnly
                    required
                />
                <label htmlFor="crystalType">Crystal Types</label>
                <input
                    className="list-input"
                    id="crystalType"
                    placeholder="Crystal Types"
                    type="text"
                    name="crystalType"
                    value={
                        listValue.name == 'crystalType' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="crystalTypeValues"
                    placeholder="Values go here"
                    type="text"
                    name="crystalTypeValues"
                    value={itemDetails.crystalType}
                    readOnly
                    required
                />
                <label htmlFor="designStyle">Design Styles</label>
                <input
                    className="list-input"
                    id="designStyle"
                    placeholder="Design Styles"
                    type="text"
                    name="designStyle"
                    value={
                        listValue.name == 'designStyle' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="designStyleValues"
                    placeholder="Values go here"
                    type="text"
                    name="designStyleValues"
                    value={itemDetails.designStyle}
                    readOnly
                    required
                />
                <label htmlFor="usePackages">Use Packages</label>
                <input
                    className="list-input"
                    id="usePackages"
                    placeholder="Use Packages"
                    type="text"
                    name="usePackages"
                    value={
                        listValue.name == 'usePackages' ? listValue.value : ''
                    }
                    onChange={(e) => handleArrayValue(e)}
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="usePackagesValues"
                    placeholder="Values go here"
                    type="text"
                    name="usePackagesValues"
                    value={itemDetails.usePackages}
                    readOnly
                    required
                />
                <label htmlFor="images">Images</label>
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
                {/* <button onClick={(e) => listValSubmit(e)}>Add Value</button> // Was this for like some sort of image preview?
                <input
                    className="body-input"
                    id="imagesValues"
                    placeholder="Values go here"
                    type="text"
                    name="imagesValues"
                    readOnly
                    required
                /> */}
                <label htmlFor="pdf">PDF</label>
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
                {/* <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="pdfValues"
                    placeholder="Values go here"
                    type="text"
                    name="pdfValues"
                    value={itemDetails.pdf}
                    readOnly
                    required
                /> */}
                <label htmlFor="drawingFiles">Drawing Files</label>
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
                {/* <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="drawingFilesValues"
                    placeholder="Values go here"
                    type="text"
                    name="drawingFilesValues"
                    value={itemDetails.drawingFiles}
                    readOnly
                    required
                /> */}
                <label htmlFor="costAdmin">Cost</label>
                <input
                    className="body-input"
                    id="costAdmin"
                    placeholder="Cost"
                    type="number"
                    name="costAdmin"
                    value={itemDetails.costAdmin}
                    onChange={(e) => handleFormInput(e)}
                />
                <label htmlFor="partnerCodeAdmin">Partner Code</label>
                <input
                    className="body-input"
                    id="partnerCodeAdmin"
                    placeholder="Partner Code"
                    type="text"
                    name="partnerCodeAdmin"
                    value={itemDetails.partnerCodeAdmin}
                    onChange={(e) => handleFormInput(e)}
                />

                <button onClick={(e) => onSubmit(e)}>submit</button>
            </form>
        </div>
    );
};

export default Inventory;
