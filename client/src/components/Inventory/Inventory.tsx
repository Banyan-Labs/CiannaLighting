import React, { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { axiosFileUpload } from '../../api/axios';
import { useAppSelector } from '../../app/hooks';
import './styles/inventory.scss';
import { FaPlus, FaRegWindowClose } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { axiosPrivate } from '../../api/axios';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
        crystalPinType: [], //[]
        crystalPinColor: [], //[]
        designStyle: [], //[]
        usePackages: [], //[]
        // images: [], //[]//s3
        // pdf: [], //[]//s3
        // drawingFiles: [], //[]//s3
        editImages: [],
        editpdf: [],
        editDrawingFiles: [],
        editSpecs: [],
        costAdmin: 0,
        partnerCodeAdmin: '',
    });
    const [listValue, setListValue] = useState<SetList>({
        name: '',
        value: '',
    });
    const [imgFiles, setImgfiles] = useState<any>([]);
    const [pdfFiles, setPdfFiles] = useState<any>([]);
    const [specFiles, setSpecFiles] = useState<any>([]);
    const [drawingFilesArray, setDrawingFilesArray] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [pdf, setPdf] = useState<any>([]);
    const [specs, setSpecs] = useState<any>([]);
    const [drawingFiles, setDrawingFiles] = useState<any>([]);
    const [imageName, setImageNames] = useState<any>([]);
    const [pdfNames, setPdfNames] = useState<any>([]);
    const [specNames, setSpecNames] = useState<any>([]);
    const [drawingFilesNames, setDrawingFilesNames] = useState<any>([]);
    const [viewablePDF, setViewablePDF] = useState<any>([]);
    const [viewableSpecs, setViewableSpecs] = useState<any>([]);
    const [typeOfProject, setTypeOfProject] = useState('non-edit');
    const [catalogItems, setCatalogItems] = useState([]);
    const [editingInput, setEditingInput] = useState('');
    const [editingItem, setEditingItem] = useState<any>(false);
    const [numPdfPages, setNumPdfPages] = useState<any>({});
    const [numDrawPages, setNumDrawPages] = useState<any>({});
    const [numSpecPages, setNumSpecPages] = useState<any>({});

    const initializeCatalog = async () => {
        const axiosPriv = axiosPrivate();
        try {
            const catalog = await axiosPriv.post('/public/get-catalog');
            if (catalog) {
                const items = catalog.data.items;
                setCatalogItems(items);
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    useEffect(() => {
        initializeCatalog();
    }, []);
    const handleEditingChange = (val: string) => {
        setEditingInput(val);
    };
    const deleteFiles = (e: any, filePath: any, type: string) => {
        e.preventDefault();
        if (type == 'images') {
            const newImages = imageName.filter(
                (x: any) => x.name != filePath.name
            );
            setImageNames(newImages);
            if (typeof filePath.name == 'string') {
                const newimg = images.filter(
                    (img: any) => img.name != filePath.name
                );
                setImages(newimg);
                if (imgFiles[0].name === filePath.name) {
                    setImgfiles([]);
                }
            } else {
                const editImg = itemDetails.editImages.filter(
                    (url: string) => url !== filePath.url
                );
                setItemDetails({ ...itemDetails, editImages: editImg });
            }
        }
        if (type == 'pdf') {
            const newPdf = viewablePDF.filter(
                (x: any) => x.name != filePath.name
            );
            setViewablePDF(newPdf);
            const newPages = numPdfPages;
            delete newPages[filePath.name];
            setNumPdfPages(newPages);
            if (typeof filePath.name == 'string') {
                const newpdf = pdf.filter(
                    (file: any) => file.name != filePath.name
                );
                setPdf(newpdf);
                if (pdfFiles[0].name === filePath.name) {
                    setPdfFiles([]);
                }
            } else {
                const editPdf = itemDetails.editpdf.filter(
                    (url: string) => url !== filePath.url
                );
                setItemDetails({ ...itemDetails, editpdf: editPdf });
            }
        }
        if (type == 'drawingFiles') {
            const newDrawing = drawingFilesNames.filter(
                (x: any) => x.name != filePath.name
            );
            setDrawingFilesNames(newDrawing);
            const newPages = numDrawPages;
            delete newPages[filePath.name];
            setNumDrawPages(newPages);
            if (typeof filePath.name == 'string') {
                const newdraw = drawingFiles.filter(
                    (file: any) => file.name != filePath.name
                );
                setDrawingFiles(newdraw);
                if (drawingFilesArray[0].name === filePath.name) {
                    setDrawingFilesArray([]);
                }
            } else {
                const editDraw = itemDetails.editDrawingFiles.filter(
                    (url: string) => url !== filePath.url
                );
                setItemDetails({ ...itemDetails, editDrawingFiles: editDraw });
            }
        }
        if (type == 'specs') {
            const newSpecs = viewableSpecs.filter(
                (x: any) => x.name != filePath.name
            );
            setViewableSpecs(newSpecs);
            const newPages = numSpecPages;
            delete newPages[filePath.name];
            setNumSpecPages(newPages);
            if (typeof filePath.name == 'string') {
                const newspecs = specs.filter(
                    (file: any) => file.name != filePath.name
                );
                setSpecs(newspecs);
                if (specFiles[0].name === filePath.name) {
                    setSpecFiles([]);
                }
            } else {
                const editSpec = itemDetails.editSpecs.filter(
                    (url: string) => url !== filePath.url
                );
                setItemDetails({ ...itemDetails, editSpecs: editSpec });
            }
        }
    };

    const checkForm = (e: any) =>{
        e.preventDefault();
        const editKeys = [ 'editImages', 'editpdf','editDrawingFiles', 'editSpecs', '__v']
        const vals = Object.entries(itemDetails);
        const check = vals.map((x: any[])=> x[1] ? typeof x[1] == 'number' ? [x[0], x[1] > 0] : typeof x[1] == 'string' ? [x[0], x[1]?.length >= 1] : [x[0], x[1][0]?.length >= 1] : [x[0], false]);
        const checker =  check.filter((x:any)=> editKeys.indexOf(x[0]) === -1)    
        const checkVals = checker.filter((x: any[])=> !x[1]);
        if(checkVals.length){
            const showRequired = checkVals.map((x:any[])=> x[0])
            alert(`Please fill out the following fields: \n ${showRequired.join('\n')}`)
        }else{
            onSubmit(e);
        }
    }

    const onDocumentLoadSuccess = (
        e: any,
        location: string,
        name: string | number
    ) => {
        if (location == 'pdf') {
            setNumPdfPages({
                ...numPdfPages,
                [name]: e.numPages,
            });
        }
        if (location == 'drawingFiles') {
            setNumDrawPages({
                ...numDrawPages,
                [name]: e.numPages,
            });
        }
        if (location == 'specs') {
            setNumSpecPages({
                ...numSpecPages,
                [name]: e.numPages,
            });
        }
    };
    const setEdit = (e: any) => {
        e.preventDefault();
        const item: any = catalogItems.find(
            (x: any) => x.item_ID.toLowerCase() === editingInput.toLowerCase()
        );
        if (item) {
            const files: any = {
                images: item.images,
                pdf: item.pdf,
                specs: item.specs,
                drawingFiles: item.drawingFiles,
            };
            setImageNames(
                files.images.map((x: string, index: number) =>
                    Object({ name: index, url: x })
                )
            );
            setDrawingFilesNames(
                files.drawingFiles.map((x: string, index: number) =>
                    Object({ name: index, url: x })
                )
            );
            setViewablePDF(
                files.pdf.map((x: string, index: number) =>
                    Object({ name: index, url: x })
                )
            );
            setViewableSpecs(
                files.specs.map((x: string, index: number) =>
                    Object({ name: index, url: x })
                )
            );
            for (const val in files) {
                delete item[val];
            }
            setItemDetails({
                ...item,
                editImages: files.images,
                editpdf: files.pdf,
                editDrawingFiles: files.drawingFiles,
                editSpecs: files.specs,
            });
            setEditingInput('');
        }
    };

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

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'images') {
            setImgfiles(e.target.files);
        }
        if (e.target.name === 'pdf') {
            setPdfFiles(e.target.files);
        }
        if (e.target.name === 'specs') {
            setSpecFiles(e.target.files);
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

    const removeItem = (e: any, item: any) => {
        e.preventDefault();
        setItemDetails({
            ...itemDetails,
            [item]: itemDetails[item].slice(0, -1),
        });
    };
    const listFileNames = (e: any, name: string) => {
        e.preventDefault();
        if (name === 'images' && imgFiles.length) {
            for (const key of Object.keys(imgFiles)) {
                const objectUrl = URL.createObjectURL(imgFiles[key]);
                setImageNames([
                    ...imageName,
                    { name: imgFiles[key].name, url: objectUrl },
                ]);
                setImages([...images, imgFiles[key]]);
            }
        }
        if (name === 'pdf' && pdfFiles.length) {
            for (const key of Object.keys(pdfFiles)) {
                const objectUrl = URL.createObjectURL(pdfFiles[key]);
                setViewablePDF([
                    ...viewablePDF,
                    { name: pdfFiles[key].name, url: objectUrl },
                ]);
                setPdf([...pdf, pdfFiles[key]]);
                setPdfNames([...pdfNames, pdfFiles[key].name]);
            }
        }
        if (name === 'specs' && specFiles.length) {
            for (const key of Object.keys(specFiles)) {
                const objectUrl = URL.createObjectURL(specFiles[key]);
                setViewableSpecs([
                    ...viewableSpecs,
                    { name: specFiles[key].name, url: objectUrl },
                ]);
                setSpecs([...specs, specFiles[key]]);
                setSpecNames([...specNames, specFiles[key].name]);
            }
        }
        if (name === 'drawingFiles' && drawingFilesArray.length) {
            for (const key of Object.keys(drawingFilesArray)) {
                const objectUrl = URL.createObjectURL(drawingFilesArray[key]);
                setDrawingFiles([...drawingFiles, drawingFilesArray[key]]);
                setDrawingFilesNames([
                    ...drawingFilesNames,
                    { name: drawingFilesArray[key].name, url: objectUrl },
                ]);
            }
        }
    };
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const axiosPriv = await axiosFileUpload();
        const fs = new FormData();
        for (const key of Object.keys(itemDetails)) {
            fs.append(key, itemDetails[key]);
        }

        if (images.length) {
            for (let i = 0; i < images.length; i++) {
                fs.append('images', images[i]);
            }
        }
        if (pdf.length) {
            for (let i = 0; i < pdf.length; i++) {
                fs.append('pdf', pdf[i]);
            }
        }
        if (specs.length) {
            for (let i = 0; i < specs.length; i++) {
                fs.append('specs', specs[i]);
            }
        }
        if (drawingFiles.length) {
            for (let i = 0; i < drawingFiles.length; i++) {
                fs.append('drawingFiles', drawingFiles[i]);
            }
        }

        try {
            if (editingItem) {
                const done = await axiosPriv.post('/internal/find-light', fs);
                if (done) {
                    setEditingItem(false);
                    initializeCatalog();
                    alert('Item Edited!');
                }
            } else {
                await axiosPriv.post('/internal/create-light', fs);
                initializeCatalog();
                alert("Item created!")
            }
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
                estimatedWeight: 0,
                lampType: '',
                lampColor: '',
                numberOfLamps: 0,
                wattsPerLamp: 0,
                powerInWatts: 0,
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
                crystalPinType: [], //[]
                crystalPinColor: [], //[]
                designStyle: [], //[]
                usePackages: [], //[]
                editImages: [],
                editpdf: [],
                editDrawingFiles: [],
                editSpecs: [],
                costAdmin: 0,
                partnerCodeAdmin: '',
            });
            setImageNames([]);
            setViewablePDF([]);
            setViewableSpecs([]);
            setDrawingFilesNames([]);
            setNumDrawPages([]);
            setNumPdfPages([]);
            setNumSpecPages([]);
            setImages([]);
            setDrawingFiles([]);
            setPdf([]);
            setSpecs([]);
            initializeCatalog();

            const checked = document.querySelectorAll('input[type=checkbox]');
            checked.forEach((item: any, index: number) => {
                if (index > 0 && item.checked) item.checked = false;
            });
        } catch (error: any) {
            alert(error.messsge);
        }
    };
    return (
        <div className="inventory-container">
            <div className="inventory-head">
                <div className="head-left">
                    <div className="inv-header">
                        {editingItem ? 'Edit Items' : 'Catalog Items'}
                    </div>
                    <div>
                        <p className="mb-4">
                            {editingItem
                                ? 'Edit an item in the catalog.'
                                : 'Add an item to the catalog.'}
                        </p>
                    </div>
                </div>
                <div className="head-right">
                    <div className="button-toggler inv-togl">
                        <button
                            className={
                                typeOfProject === 'non-edit'
                                    ? 'all-project-button'
                                    : 'type-project-btn'
                            }
                            onClick={() => {
                                setTypeOfProject('non-edit');
                                setEditingItem(false);
                            }}
                        >
                            New Item
                        </button>
                        <button
                            className={
                                typeOfProject === 'edit'
                                    ? 'your-projects-button'
                                    : 'type-project-btn'
                            }
                            onClick={() => {
                                setTypeOfProject('edit');
                                setEditingItem(true);
                            }}
                        >
                            Edit Item
                        </button>
                    </div>
                    {editingItem && (
                        <div className="editor-contain">
                            <input
                                list="catalog"
                                id="edit-input"
                                name="editor"
                                className="edit-input"
                                value={editingInput}
                                onChange={(e) =>
                                    handleEditingChange(e.currentTarget.value)
                                }
                            />
                            <label htmlFor="editor" className="form__label">
                                Choose item here..
                            </label>
                            <button
                                className="edit-button"
                                onClick={(e) => setEdit(e)}
                            >
                                edit
                            </button>
                            <datalist id="catalog">
                                {catalogItems.map(
                                    (item: any, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.item_ID}
                                            />
                                        );
                                    }
                                )}
                            </datalist>
                        </div>
                    )}
                </div>
            </div>
            <div className="inventory_form_container">
                <form
                    className="inventory-form"
                    tabIndex={-1}
                    onSubmit={checkForm}
                >
                    <div className="tabs">
                        <div className="tab">
                            <input
                                tabIndex={-1}
                                type="checkbox"
                                id="chck1"
                                defaultChecked
                            />
                            <label className="tab-label" htmlFor="chck1">
                                Details
                            </label>
                            <div className="tab-content">
                                <div className="form__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        type="input"
                                        id="item_ID"
                                        name="item_ID"
                                        value={itemDetails.item_ID}
                                        onChange={(e) => handleFormInput(e)}
                                        placeholder="Item ID"
                                        
                                    />
                                    <label
                                        htmlFor="name"
                                        className="form__label"
                                    >
                                        Item ID
                                    </label>
                                </div>
                                <div className="form__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        type="input"
                                        id="itemName"
                                        name="itemName"
                                        value={itemDetails.itemName || ''}
                                        onChange={(e) => handleFormInput(e)}
                                        placeholder="Item Name"
                                        
                                    />
                                    <label
                                        htmlFor="itemName"
                                        className="form__label"
                                    >
                                        Item Name
                                    </label>
                                </div>
                                <div className="form__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        type="text"
                                        id="itemDescription"
                                        name="itemDescription"
                                        value={
                                            itemDetails.itemDescription || ''
                                        }
                                        onChange={(e) => handleFormInput(e)}
                                        placeholder="Description"
                                        
                                    />
                                    <label
                                        htmlFor="itemName"
                                        className="form__label"
                                    >
                                        Item Description
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck2" />
                        <label className="tab-label" htmlFor="chck2">
                            Measurements
                        </label>
                        <div className="tab-content">
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="bodyDiameter"
                                    placeholder="Body Diameter"
                                    type="text"
                                    name="bodyDiameter"
                                    value={itemDetails.bodyDiameter || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="bodyDiameter"
                                    className="form__label"
                                >
                                    Body Diameter
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="bodyLength"
                                    placeholder="Body Length"
                                    type="text"
                                    name="bodyLength"
                                    value={itemDetails.bodyLength || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="bodyLength"
                                    className="form__label"
                                >
                                    Body Length
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="bodyWidth"
                                    placeholder="bodyWidth"
                                    type="text"
                                    name="bodyWidth"
                                    value={itemDetails.bodyWidth || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="bodyWidth"
                                    className="form__label"
                                >
                                    Body Width
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="bodyHeight"
                                    placeholder="Body Height"
                                    type="text"
                                    name="bodyHeight"
                                    value={itemDetails.bodyHeight || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="bodyHeight"
                                    className="form__label"
                                >
                                    Body Height
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="fixtureOverallHeight"
                                    placeholder="Fixture Overall Height"
                                    type="text"
                                    name="fixtureOverallHeight"
                                    value={
                                        itemDetails.fixtureOverallHeight || ''
                                    }
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="fixtureOverallHeight"
                                    className="form__label"
                                >
                                    Fixture Height
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="sconceHeight"
                                    placeholder="Sconce Height"
                                    type="text"
                                    name="sconceHeight"
                                    value={itemDetails.sconceHeight || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="sconceHeight"
                                    className="form__label"
                                >
                                    Sconce Height
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="sconceWidth"
                                    placeholder="Sconce Width"
                                    type="text"
                                    name="sconceWidth"
                                    value={itemDetails.sconceWidth || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="sconceWidth"
                                    className="form__label"
                                >
                                    Sconce Width
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="sconceExtension"
                                    placeholder="Sconce Extension"
                                    type="text"
                                    name="sconceExtension"
                                    value={itemDetails.sconceExtension || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="sconceExtension"
                                    className="form__label"
                                >
                                    Sconce Extension
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="estimatedWeight"
                                    placeholder="Estimated Weight"
                                    type="number"
                                    name="estimatedWeight"
                                    value={itemDetails.estimatedWeight || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="estimatedWeight"
                                    className="form__label"
                                >
                                    Estimated Weight
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck3" />
                        <label className="tab-label" htmlFor="chck3">
                            Lamp Options
                        </label>
                        <div className="tab-content">
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="lampType"
                                    placeholder="Lamp Type"
                                    type="text"
                                    name="lampType"
                                    value={itemDetails.lampType || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="lampType"
                                >
                                    Lamp Type
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="lampColor"
                                    placeholder="Lamp Color"
                                    type="text"
                                    name="lampColor"
                                    value={itemDetails.lampColor || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="lampColor"
                                >
                                    Lamp Color
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="numberOfLamps"
                                    placeholder="Number of Lamps"
                                    type="number"
                                    name="numberOfLamps"
                                    value={itemDetails.numberOfLamps || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="numberOfLamps"
                                >
                                    Number of Lamps
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="wattsPerLamp"
                                    placeholder="Watts per Lamp"
                                    type="number"
                                    name="wattsPerLamp"
                                    value={itemDetails.wattsPerLamp || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="wattsPerLamp"
                                >
                                    Watts Per Lamp
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="powerInWatts"
                                    placeholder="Power in Watts"
                                    type="number"
                                    name="powerInWatts"
                                    value={itemDetails.powerInWatts || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="powerInWatts"
                                >
                                    Power in Watts
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="lumens"
                                    placeholder="Lumens"
                                    type="number"
                                    name="lumens"
                                    value={itemDetails.lumens || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label className="form__label" htmlFor="lumens">
                                    Lumens
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck4" />
                        <label className="tab-label" htmlFor="chck4">
                            Material Options
                            {/*  */}
                        </label>
                        <div className="tab-content">
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="material"
                                    placeholder="Material"
                                    type="text"
                                    name="material"
                                    value={itemDetails.material || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    htmlFor="description"
                                    className="form__label"
                                >
                                    Material
                                </label>
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
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
                                    <label
                                        htmlFor="exteriorFinish"
                                        className="form__label"
                                    >
                                        Exterior Finish
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'exteriorFinish')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="exteriorFinishValues"
                                    placeholder="Exterior Finishes"
                                    type="text"
                                    name="exteriorFinishValues"
                                    value={itemDetails.exteriorFinish || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
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
                                    <label
                                        htmlFor="interiorFinish"
                                        className="form__label"
                                    >
                                        Interior Finish
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'interiorFinish')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="interiorFinishValues"
                                    placeholder="Interior Finishes"
                                    type="text"
                                    name="interiorFinishValues"
                                    value={itemDetails.interiorFinish || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="lensMaterial"
                                        placeholder="Lens Material"
                                        type="text"
                                        name="lensMaterial"
                                        value={
                                            listValue.name == 'lensMaterial'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        htmlFor="lensMaterial"
                                        className="form__label"
                                    >
                                        Lens Material
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'lensMaterial')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="lensMaterialValues"
                                    placeholder="Lens Materiales"
                                    type="text"
                                    name="lensMaterialValues"
                                    value={itemDetails.lensMaterial || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="glassOptions"
                                        placeholder="Glass Options"
                                        type="text"
                                        name="glassOptions"
                                        value={
                                            listValue.name == 'glassOptions'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        htmlFor="glassOptions"
                                        className="form__label"
                                    >
                                        Glass Options
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'lensMaterial')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="glassOptionsValues"
                                    placeholder="Glass Options"
                                    type="text"
                                    name="glassOptionsValues"
                                    value={itemDetails.glassOptions || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
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
                                    <label
                                        htmlFor="acrylicOptions"
                                        className="form__label"
                                    >
                                        Acrylic Options
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'acrylicOptions')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="acrylicOptionsValues"
                                    placeholder="Acrylic Options"
                                    type="text"
                                    name="acrylicOptionsValues"
                                    value={itemDetails.acrylicOptions || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="crystalType"
                                        placeholder="Crystal Types"
                                        type="text"
                                        name="crystalType"
                                        value={
                                            listValue.name == 'crystalType'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="crystalType"
                                    >
                                        Crystal Types
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'crystalType')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="crystalTypeValues"
                                    placeholder="Crystal Types"
                                    type="text"
                                    name="crystalTypeValues"
                                    value={itemDetails.crystalType || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="crystalPinType"
                                        placeholder="Crystal Pin Types"
                                        type="text"
                                        name="crystalPinType"
                                        value={
                                            listValue.name == 'crystalPinType'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="crystalPinType"
                                    >
                                        Crystal Pin Types
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'crystalPinType')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="crystalPinTypeValues"
                                    placeholder="Crystal Pin Types"
                                    type="text"
                                    name="crystalPinTypeValues"
                                    value={itemDetails.crystalPinType || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="crystalPinColor"
                                        placeholder="Crystal Pin Colors"
                                        type="text"
                                        name="crystalPinColor"
                                        value={
                                            listValue.name == 'crystalPinColor'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="crystalPinColor"
                                    >
                                        Crystal Pin Colors
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'crystalPinColor')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="crystalPinColorValues"
                                    placeholder="Crystal Pin Colors"
                                    type="text"
                                    name="crystalPinColorValues"
                                    value={itemDetails.crystalPinColor || ''}
                                    readOnly
                                    
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck5" />
                        <label className="tab-label" htmlFor="chck5">
                            Other Options
                        </label>
                        <div className="tab-content">
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="socketQuantity"
                                    placeholder="Socket Quantity"
                                    type="number"
                                    name="socketQuantity"
                                    value={itemDetails.socketQuantity || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label
                                    className="form__label"
                                    htmlFor="socketQuantity"
                                >
                                    Socket Quantity
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="price"
                                    placeholder="Price"
                                    type="number"
                                    name="price"
                                    value={itemDetails.price || ''}
                                    onChange={(e) => handleFormInput(e)}
                                    
                                />
                                <label className="form__label" htmlFor="price">
                                    Price
                                </label>
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="environment"
                                        placeholder="Environment"
                                        type="text"
                                        name="environment"
                                        value={
                                            listValue.name == 'environment'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="environment"
                                    >
                                        Environment
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'environment')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="environmentValues"
                                    placeholder="Environments"
                                    type="text"
                                    name="environmentValues"
                                    value={itemDetails.environment || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="safetyCert"
                                        placeholder="Safety Certifications"
                                        type="text"
                                        name="safetyCert"
                                        value={
                                            listValue.name == 'safetyCert'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="safetyCert"
                                    >
                                        Safety Cert
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) => removeItem(e, 'safetyCert')}
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="safetyCertValues"
                                    placeholder="Safety Certs"
                                    type="text"
                                    name="safetyCertValues"
                                    value={itemDetails.safetyCert || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
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
                                    <label
                                        className="form__label"
                                        htmlFor="projectVoltage"
                                    >
                                        Project Voltage
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) =>
                                        removeItem(e, 'projectVoltage')
                                    }
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="projectVoltageValues"
                                    placeholder="Project Voltages"
                                    type="text"
                                    name="projectVoltageValues"
                                    value={itemDetails.projectVoltage || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="socketType"
                                        placeholder="Socket Types"
                                        type="text"
                                        name="socketType"
                                        value={
                                            listValue.name == 'socketType'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="socketType"
                                    >
                                        Socket Type
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) => removeItem(e, 'socketType')}
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="socketTypeValues"
                                    placeholder="Socket Types"
                                    type="text"
                                    name="socketTypeValues"
                                    value={itemDetails.socketType || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="mounting"
                                        placeholder="Mounting"
                                        type="text"
                                        name="mounting"
                                        value={
                                            listValue.name == 'mounting'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="mounting"
                                    >
                                        Mounting
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Value
                                </button>
                                <button
                                    tabIndex={-1}
                                    onClick={(e) => removeItem(e, 'mounting')}
                                    className="delete-material-button"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="mountingValues"
                                    placeholder="Mountings"
                                    type="text"
                                    name="mountingValues"
                                    value={itemDetails.mounting || ''}
                                    readOnly
                                    
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck6" />
                        <label className="tab-label" htmlFor="chck6">
                            Design Styles & Use Packages
                        </label>
                        <div className="tab-content">
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="designStyle"
                                        placeholder="Design Styles"
                                        type="text"
                                        name="designStyle"
                                        value={
                                            listValue.name == 'designStyle'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="designStyle"
                                    >
                                        Design Styles
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Add Value
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="designStyleValues"
                                    placeholder="Design Styles"
                                    type="text"
                                    name="designStyleValues"
                                    value={itemDetails.designStyle || ''}
                                    readOnly
                                    
                                />
                            </div>
                            <div className="add__materials">
                                <div className="list__group field">
                                    <input
                                        tabIndex={-1}
                                        className="form__field"
                                        id="usePackages"
                                        placeholder="Use Packages"
                                        type="text"
                                        name="usePackages"
                                        value={
                                            listValue.name == 'usePackages'
                                                ? listValue.value
                                                : ''
                                        }
                                        onChange={(e) => handleArrayValue(e)}
                                    />
                                    <label
                                        className="form__label"
                                        htmlFor="usePackages"
                                    >
                                        Use Packages
                                    </label>
                                </div>
                                <button
                                    tabIndex={-1}
                                    className="new-material-button"
                                    onClick={(e) => listValSubmit(e)}
                                >
                                    <FaPlus />
                                    Add Value
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="material__list"
                                    id="usePackagesValues"
                                    placeholder="Use Packages"
                                    type="text"
                                    name="usePackagesValues"
                                    value={itemDetails.usePackages || ''}
                                    readOnly
                                    
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck7" />
                        <label className="tab-label" htmlFor="chck7">
                            Images & Attachments
                        </label>
                        <div className="tab-content">
                            <div className="add__materials">
                                <label
                                    className="images__label"
                                    htmlFor="images"
                                >
                                    Images
                                </label>
                                <button
                                    tabIndex={-1}
                                    className="add__btn"
                                    onClick={(e) => listFileNames(e, 'images')}
                                >
                                    <FaPlus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="list-input tabIndex={-1}"
                                    id="images"
                                    placeholder="Upload Images"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    multiple
                                    name="images"
                                    key={imageName.name || ''}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                            <div className="file-row">
                                {imageName.map((url: any, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className="file-contain"
                                        >
                                            <button
                                                className="add__btn img_lst"
                                                onClick={(e) =>
                                                    deleteFiles(
                                                        e,
                                                        url,
                                                        'images'
                                                    )
                                                }
                                            >
                                                <FaRegWindowClose />
                                            </button>
                                            <img
                                                src={String(url.url)}
                                                alt=""
                                                className="imgAttachment"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <br />
                            <div className="add__materials">
                                <label className="images__label" htmlFor="pdf">
                                    PDF
                                </label>
                                <button
                                    tabIndex={-1}
                                    className="add__btn"
                                    onClick={(e) => listFileNames(e, 'pdf')}
                                >
                                    <FaPlus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="list-input tabIndex={-1}"
                                    id="pdf"
                                    placeholder="Upload PDF's"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    name="pdf"
                                    key={viewablePDF.name || ''}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                            <div className="file-row">
                                {viewablePDF.map((url: any, dex: number) => {
                                    return (
                                        <Document
                                            key={dex}
                                            file={url.url}
                                            onLoadSuccess={(e) =>
                                                onDocumentLoadSuccess(
                                                    e,
                                                    'pdf',
                                                    url.name
                                                )
                                            }
                                            onLoadError={console.error}
                                            className="pdf-document2"
                                        >
                                            {Array.from(
                                                new Array(
                                                    numPdfPages[url.name]
                                                ),
                                                (el, index) => (
                                                    <div
                                                        key={index}
                                                        className="pdf-contain"
                                                    >
                                                        {index == 0 && (
                                                            <button
                                                                className="add__btn pdf_lst"
                                                                onClick={(e) =>
                                                                    deleteFiles(
                                                                        e,
                                                                        url,
                                                                        'pdf'
                                                                    )
                                                                }
                                                            >
                                                                <FaRegWindowClose />
                                                            </button>
                                                        )}
                                                        <Page
                                                            key={`page_${
                                                                index + 1
                                                            }`}
                                                            className="pdf-page2"
                                                            renderAnnotationLayer={
                                                                false
                                                            }
                                                            renderTextLayer={
                                                                false
                                                            }
                                                            pageNumber={
                                                                index + 1
                                                            }
                                                            // scale={1.0}
                                                            width={320}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </Document>
                                    );
                                })}
                            </div>
                            <br />
                            <div className="add__materials">
                                <label className="images__label" htmlFor="pdf">
                                    SPECS
                                </label>
                                <button
                                    tabIndex={-1}
                                    className="add__btn"
                                    onClick={(e) => listFileNames(e, 'specs')}
                                >
                                    <FaPlus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="list-input tabIndex={-1}"
                                    id="specs"
                                    placeholder="Upload Spec File(s)"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    name="specs"
                                    key={viewableSpecs || ''}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                            <div className="file-row">
                                {viewableSpecs.map((url: any, dex: number) => {
                                    return (
                                        <Document
                                            key={dex}
                                            file={url.url}
                                            onLoadSuccess={(e) =>
                                                onDocumentLoadSuccess(
                                                    e,
                                                    'specs',
                                                    url.name
                                                )
                                            }
                                            onLoadError={console.error}
                                            className="pdf-document2"
                                        >
                                            {Array.from(
                                                new Array(
                                                    numSpecPages[url.name]
                                                ),
                                                (el, index) => (
                                                    <div
                                                        key={index}
                                                        className="pdf-contain"
                                                    >
                                                        {index == 0 && (
                                                            <button
                                                                className="add__btn pdf_lst"
                                                                onClick={(e) =>
                                                                    deleteFiles(
                                                                        e,
                                                                        url,
                                                                        'specs'
                                                                    )
                                                                }
                                                            >
                                                                <FaRegWindowClose />
                                                            </button>
                                                        )}
                                                        <Page
                                                            key={`page_${
                                                                index + 1
                                                            }`}
                                                            className="pdf-page2"
                                                            renderAnnotationLayer={
                                                                false
                                                            }
                                                            renderTextLayer={
                                                                false
                                                            }
                                                            pageNumber={
                                                                index + 1
                                                            }
                                                            // scale={1.0}
                                                            width={320}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </Document>
                                    );
                                })}
                            </div>
                            <br />
                            <div className="add__materials">
                                <label
                                    className="images__label"
                                    htmlFor="drawingFiles"
                                >
                                    Drawing Files
                                </label>
                                <button
                                    tabIndex={-1}
                                    className="add__btn"
                                    onClick={(e) =>
                                        listFileNames(e, 'drawingFiles')
                                    }
                                >
                                    <FaPlus />
                                </button>
                                <input
                                    tabIndex={-1}
                                    className="list-input tabIndex={-1}"
                                    id="drawingFiles"
                                    placeholder="Upload Drawing Files"
                                    type="file"
                                    multiple
                                    accept="application/pdf"
                                    name="drawingFiles"
                                    key={drawingFilesNames || ''}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                            <div className="file-row">
                                {drawingFilesNames.map(
                                    (url: any, dex: number) => {
                                        return (
                                            <Document
                                                key={dex}
                                                file={url.url}
                                                onLoadSuccess={(e) =>
                                                    onDocumentLoadSuccess(
                                                        e,
                                                        'drawingFiles',
                                                        url.name
                                                    )
                                                }
                                                onLoadError={console.error}
                                                className="pdf-document2"
                                            >
                                                {Array.from(
                                                    new Array(
                                                        numDrawPages[url.name]
                                                    ),
                                                    (el, index) => (
                                                        <div
                                                            key={index}
                                                            className="pdf-contain"
                                                        >
                                                            {index == 0 && (
                                                                <button
                                                                    className="add__btn pdf_lst"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteFiles(
                                                                            e,
                                                                            url,
                                                                            'drawingFiles'
                                                                        )
                                                                    }
                                                                >
                                                                    <FaRegWindowClose />
                                                                </button>
                                                            )}
                                                            <Page
                                                                key={`page_${
                                                                    index + 1
                                                                }`}
                                                                className="pdf-page2"
                                                                renderAnnotationLayer={
                                                                    false
                                                                }
                                                                renderTextLayer={
                                                                    false
                                                                }
                                                                pageNumber={
                                                                    index + 1
                                                                }
                                                                // scale={1.0}
                                                                width={320}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </Document>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <input tabIndex={-1} type="checkbox" id="chck8" />
                        <label className="tab-label" htmlFor="chck8">
                            Admin Options
                        </label>
                        <div className="tab-content">
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="costAdmin"
                                    placeholder="Cost"
                                    type="number"
                                    name="costAdmin"
                                    value={itemDetails.costAdmin || ''}
                                    onChange={(e) => handleFormInput(e)}
                                />
                                <label
                                    className="form__label"
                                    htmlFor="costAdmin"
                                >
                                    Cost
                                </label>
                            </div>
                            <div className="form__group field">
                                <input
                                    tabIndex={-1}
                                    className="form__field"
                                    id="partnerCodeAdmin"
                                    placeholder="Partner Code"
                                    type="text"
                                    name="partnerCodeAdmin"
                                    value={itemDetails.partnerCodeAdmin || ''}
                                    onChange={(e) => handleFormInput(e)}
                                />
                                <label
                                    className="form__label"
                                    htmlFor="partnerCodeAdmin"
                                >
                                    Partner Code
                                </label>
                            </div>
                        </div>
                    </div>

                    <button id="inventory-btn" >
                        {editingItem ? 'Edit' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Inventory;
