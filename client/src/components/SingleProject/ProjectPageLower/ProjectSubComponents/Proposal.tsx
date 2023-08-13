import React, { FC, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { useAppSelector } from '../../../../app/hooks';
import logging from 'config/logging';

import './style/proposal.scss';
import { parseFileName } from 'helpers/utils';
import { camelCaseToTitleCase } from 'app/utils';
import { useReactToPrint } from 'react-to-print';

const Proposal: FC = React.forwardRef<any>(() => {
    const [numPages, setNumPages] = useState<{ [key: string]: number }>({});

    function onDocumentLoadSuccess({ numPages }: any, url: any) {
        const newNumPages = { ...numPages, [url]: numPages };
        setNumPages(newNumPages);
    }

    const { attachments, selections, project } = useAppSelector(({ project }) => {
        return project;
    });

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef?.current,
    });

    const tableRows = selections.map((prop, index) => {
        const finishes = {
            material: prop.material,
            exteriorFinish: prop.exteriorFinish,
            interiorFinish: prop.interiorFinish,
            finishTreatment: prop.finishTreatment,
        };
        const materialOptions = {
            lensMaterial: prop.lensMaterial,
            treatment: prop.treatment,
            crystalType: prop.crystalType,
            crystalPinColor: prop.crystalPinColor,
            crystalBulbCover: prop.crystalBulbCover,
        };

        return (
            <tr key={`${prop.itemID} + ${index}`}>
                <td>
                    <span>
                        {prop.item_ID}
                    </span>
                </td>
                <td>
                    <span>
                        {prop.lightQuantity}
                    </span>
                </td>
                <td>
                    {prop.rooms.map((room: any, index: number) => {
                        return (
                            <span
                                className="list py-1"
                                key={index + room}
                            >
                                {room}
                            </span>
                        );
                    })}
                </td>
                <td className="text-left">
                    {
                        prop.description.split('\n').map((p: string, index: number) => (
                            <p className="m-0" key={index + p}>{p}</p>
                        ))
                    }
                </td>
                <td className="text-left">
                    {Object.entries(finishes).map(
                        (item: any, index: number) => {
                            return (
                                <span
                                    className="list"
                                    key={index + item[0]}
                                >
                                    <span>{camelCaseToTitleCase(item[0])}:</span> <span>{item[1] || 'N/A'}</span>
                                </span>
                            );
                        }
                    )}
                </td>
                <td className="text-left">
                    {Object.entries(materialOptions).map(
                        (item: any, index: number) => {
                            return (
                                <div
                                    className="list"
                                    key={index + item[0]}
                                >
                                    <span>{camelCaseToTitleCase(item[0])}:</span> <span>{item[1] || 'N/A'}</span>
                                </div>
                            );
                        }
                    )}
                </td>
                <td>
                    <span>
                        {prop.lampColor || 'N/A'}
                    </span>
                </td>
                <td>
                    <span>
                        {prop.lumens || 'N/A'}
                    </span>
                </td>
                <td>
                    <span>
                        {prop.projectVoltage || 'N/A'}
                    </span>
                </td>
                <td>
                    <span>
                        {prop.socketQuantity || 'N/A'}
                    </span>
                </td>
                <td>
                    <span>
                        {prop.socketType || 'N/A'}
                    </span>
                </td>
            </tr>
        );
    });

    const renderAttachments = () => {
        return attachments.map((url, index) => {
            const fileName = url?.split('/uploads/')[1];
            const { itemId, fieldName, originalName } = parseFileName(fileName);
            let fileType = camelCaseToTitleCase(fieldName);
            fileType = fileType?.slice(0, fileType?.length - 1);
            let displayName = '';

            if (originalName) {
                displayName = decodeURI(originalName)?.replace(/%2B/g, ' ');
            }

            return (
                <div key={index} className="proposal-attachments mt-5">
                    <p className="m-0"><span className="text-italic">{itemId}</span> - <span className="text-italic">{fileType}</span></p>
                    <h4 className="m-0">{displayName}</h4>
                    <Document
                        file={url}
                        onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf, url)}
                        onLoadError={(err) => logging.error(err, "Document")}
                        className="pdf-document"
                    >
                        {Array.from(new Array(numPages[url]), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                className="pdf-page"
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                pageNumber={index + 1}
                                scale={1.0}
                                onLoadError={(err) => logging.error(err, "Page")}
                            />
                        ))}
                    </Document>
                </div>
            );
        });
    };

    return (
        <div className="d-flex flex-column">
            <div ref={componentRef}>
                <div className="proposal-container">
                    <div className="header-section">
                        <h1>
                            {project?.name?.toUpperCase()}
                        </h1>
                        <h1>
                            {project?.region?.toUpperCase()}
                        </h1>
                    </div>
                    <div className="table-contain">
                        <div className="table-border">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={13}>
                                            <h4 className="my-2">
                                                Lighting Schedule
                                            </h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>
                                            Qty.
                                        </th>
                                        <th>
                                            Rooms
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Finishes
                                        </th>
                                        <th>
                                            Materials
                                        </th>
                                        <th>
                                            Lamp<br />Color
                                        </th>
                                        <th>
                                            Lumens
                                        </th>
                                        <th>
                                            Project<br />Voltage
                                        </th>
                                        <th>
                                            Socket<br />Quantity
                                        </th>
                                        <th>
                                            Socket<br />Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {renderAttachments()}
            </div>
            <button className="print_btn my-5" onClick={handlePrint}>
                Print
            </button>
        </div>
    );
});
Proposal.displayName = 'Proposal';
export default Proposal;
