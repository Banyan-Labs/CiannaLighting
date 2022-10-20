import { ListOfRecursiveArraysOrValues } from 'lodash';
import React, { FC, useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
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
    projecVoltage: string[];
    socketType: string[];
    mounting: string[];
    crystalType: string[];
    designStyle: string[];
    usePackages: string[];
    images: string[]; //s3
    pdf: string[]; //s3
    drawingFiles: string[]; //s3
    costAdmin: number;
    partnerCodeAdmin: string;
}
type SetList = {
    name: string;
    value: string;
};

const Inventory: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const [itemDetails, setItemDetails] = useState<CatalogType>({
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
        projecVoltage: [], //[]
        socketType: [], //[]
        mounting: [], //[]
        crystalType: [], //[]
        designStyle: [], //[]
        usePackages: [], //[]
        images: [], //[]//s3
        pdf: [], //[]//s3
        drawingFiles: [], //[]//s3
        costAdmin: 0,
        partnerCodeAdmin: '',
    });
    const [listValue, setListValue] = useState<SetList>({
        name: '',
        value: '',
    });
    console.log(typeof itemDetails.images, 'type yo');

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setItemDetails({
            ...itemDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
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
    const listValSubmit = (e:any) => {
        e.preventDefault()
        const valueOfKey: any = itemDetails[listValue.name as keyof CatalogType]
        setItemDetails({
            ...itemDetails,
            [listValue.name]: [...valueOfKey, listValue.value],
        });
        setListValue({
            name:'',
            value: ''
        })
    };

    const onSubmit =async (e: any) => {
         const axiosPriv = axiosPrivate();
         try{
            (await axiosPriv).post("/create-light", itemDetails)
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
                projecVoltage: [], //[]
                socketType: [], //[]
                mounting: [], //[]
                crystalType: [], //[]
                designStyle: [], //[]
                usePackages: [], //[]
                images: [], //[]//s3
                pdf: [], //[]//s3
                drawingFiles: [], //[]//s3
                costAdmin: 0,
                partnerCodeAdmin: '', 
            })
         }catch(error:any){
            alert(error.messsge)
            console.log("Error Message: ", error.message)
         }
        return 'yo yo yo: ' + e.currentTarget.name;
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
                <label htmlFor="description">Exterior Finish</label>
                <input
                    className="list-input"
                    id="exteriorFinish"
                    placeholder="Exterior Finish"
                    type="text"
                    name="exteriorFinish"
                    value={listValue.name == 'exteriorFinish' ? listValue.value : ''}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                    <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                <input
                    className="body-input"
                    id="exteriorFinish"
                    placeholder="Values go here"
                    type="text"
                    name="exteriorFinish"
                    value={itemDetails.exteriorFinish}
                    // onChange={(e) => handleArrayValue(e)}
                    // required
                />
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Interior Finish</label>
                <input
                    className="list-input"
                    id="interiorFinish"
                    placeholder="Interior Finish"
                    type="text"
                    name="interiorFinish"
                    value={itemDetails.interiorFinish}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Lens Material</label>
                <input
                    className="list-input"
                    id="lensMaterial"
                    placeholder="Lens Material"
                    type="text"
                    name="lensMaterial"
                    value={itemDetails.lensMaterial}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Glass Options</label>
                <input
                    className="list-input"
                    id="glassOptions"
                    placeholder="Glass Options"
                    type="text"
                    name="glassOptions"
                    value={itemDetails.glassOptions}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Acrylic Options</label>
                <input
                    className="list-input"
                    id="acrylicOptions"
                    placeholder="Acrylic Options"
                    type="text"
                    name="acrylicOptions"
                    value={itemDetails.acrylicOptions}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Environment</label>
                <input
                    className="list-input"
                    id="environment"
                    placeholder="Environment"
                    type="text"
                    name="environment"
                    value={itemDetails.environment}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Safety Cert</label>
                <input
                    className="list-input"
                    id="safetyCert"
                    placeholder="Safety Certifications"
                    type="text"
                    name="safetyCert"
                    value={itemDetails.safetyCert}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Project Voltage</label>
                <input
                    className="list-input"
                    id="exteriorFinish"
                    placeholder="Project Voltage"
                    type="text"
                    name="projectVoltage"
                    value={itemDetails.projecVoltage}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Socket Type</label>
                <input
                    className="list-input"
                    id="socketType"
                    placeholder="Socket Types"
                    type="text"
                    name="socketType"
                    value={itemDetails.socketType}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Mounting</label>
                <input
                    className="list-input"
                    id="mounting"
                    placeholder="Mounting"
                    type="text"
                    name="mounting"
                    value={itemDetails.mounting}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Crystal Types</label>
                <input
                    className="list-input"
                    id="crystalType"
                    placeholder="Crystal Types"
                    type="text"
                    name="crystalType"
                    value={itemDetails.crystalType}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Design Styles</label>
                <input
                    className="list-input"
                    id="designStyle"
                    placeholder="Design Styles"
                    type="text"
                    name="designStyle"
                    value={itemDetails.designStyle}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Use Packages</label>
                <input
                    className="list-input"
                    id="usePackages"
                    placeholder="Use Packages"
                    type="text"
                    name="usePackages"
                    value={itemDetails.usePackages}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Images</label>
                <input
                    className="list-input"
                    id="images"
                    placeholder="Upload Images"
                    type="text"
                    name="images"
                    value={itemDetails.images}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">PDF</label>
                <input
                    className="list-input"
                    id="pdf"
                    placeholder="Upload PDF's"
                    type="text"
                    name="pdf"
                    value={itemDetails.pdf}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Drawing Files</label>
                <input
                    className="list-input"
                    id="drawingFiles"
                    placeholder="Upload Drawing Files"
                    type="text"
                    name="price"
                    value={itemDetails.drawingFiles}
                    onChange={(e) => handleArrayValue(e)}
                    required
                />
                <button onClick={(e) => listValSubmit(e)}>Add Value</button>
                {/* mayyyyybe another div here (below) holding values */}
                <label htmlFor="description">Cost</label>
                <input
                    className="body-input"
                    id="costAdmin"
                    placeholder="Cost"
                    type="number"
                    name="costAdmin"
                    value={itemDetails.costAdmin}
                    onChange={(e) => handleFormInput(e)}
                    required
                />
                <label htmlFor="description">Partner Code</label>
                <input
                    className="body-input"
                    id="partnerCodeAdmin"
                    placeholder="Partner Code"
                    type="text"
                    name="partnerCodeAdmin"
                    value={itemDetails.partnerCodeAdmin}
                    onChange={(e) => handleFormInput(e)}
                    required
                />

                <button onClick={(e) => onSubmit(e)}>submit</button>
            </form>
        </div>
    );
};

export default Inventory;
