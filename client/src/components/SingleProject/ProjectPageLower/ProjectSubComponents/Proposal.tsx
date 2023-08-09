import React, { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { useAppSelector } from '../../../../app/hooks';
import logging from 'config/logging';

import './style/proposal.scss';
import { parseFileName } from 'helpers/utils';

interface Props {
    ref: any;
}

const Proposal: FC<Props> = React.forwardRef<any>((props, ref) => {
    const [numPages, setNumPages] = useState<{ [key: string]: number }>({});

    function onDocumentLoadSuccess({ numPages }: any, url: any) {
        const newNumPages = { ...numPages, [url]: numPages };
        setNumPages(newNumPages);
    }

    const { attachments, selections, project } = useAppSelector(({ project }) => {
        return project;
    });

    const camelCaseToTitleCase = (camelCase: string) => {
        const spaced = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();
        const titleCase = spaced.replace(/(^|[\s\t]+)\w/g, function (match) {
            return match.toUpperCase();
        });

        return titleCase;
    }

    const tableRows = selections.map((prop, index) => {
        const finishes = {
            exteriorFinish: prop.exteriorFinish,
            interiorFinish: prop.interiorFinish,
            lensMaterial: prop.lensMaterial,
        };

        return (
            <tr key={`${prop.itemID} + ${index}`}>
                <td className="cell">
                    {prop.item_ID}
                </td>
                <td>
                    {prop.lightQuantity}
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
                <td>{prop.description}</td>
                <td>
                    {Object.entries(finishes).map(
                        (item: any, index: number) => {
                            return (
                                <span
                                    className="list"
                                    key={index + item[0]}
                                >
                                    {camelCaseToTitleCase(item[0])}: {item[1]}
                                </span>
                            );
                        }
                    )}
                </td>
                <td>{prop.lampType}</td>
                <td>{prop.lampColor}</td>
                <td>{prop.wattsPer}</td>
                <td>{prop.totalWatts}</td>
                <td>{prop.totalLumens}</td>
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
                <div key={index}>
                    <h4>{itemId} - {fileType} - {displayName}</h4>
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
                                width={1100}
                                onLoadError={(err) => logging.error(err, "Page")}
                            />
                        ))}
                    </Document>
                </div>
            );
        });
    };

    return (
        <div ref={ref}>
            {tableRows &&
                tableRows.map((item, index, arr) => {
                    if (index && index % 6 === 0) {
                        return (
                            <div key={index} className="proposal-container">
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
                                                        <h4>
                                                            Lighting Schedule
                                                        </h4>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Item ID</th>
                                                    <th>
                                                        Quantity
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
                                                        Lamp Type
                                                    </th>
                                                    <th>
                                                        Lamp Color
                                                    </th>
                                                    <th>
                                                        Watts Per
                                                    </th>
                                                    <th>
                                                        Total Watts
                                                    </th>
                                                    <th>
                                                        Total Lamps
                                                    </th>
                                                    <th>
                                                        Lumens
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableRows.slice(
                                                    index - 6,
                                                    index
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if (index === arr.length - 1) {
                        return (
                            <div key={index} className="proposal-container">
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
                                                        <h4>
                                                            Lighting Schedule
                                                        </h4>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Item ID</th>
                                                    <th>
                                                        Quantity
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
                                                        Lamp Type
                                                    </th>
                                                    <th>
                                                        Lamp Color
                                                    </th>
                                                    <th>
                                                        Watts Per
                                                    </th>
                                                    <th>
                                                        Total Watts
                                                    </th>
                                                    <th>
                                                        Total Lamps
                                                    </th>
                                                    <th>
                                                        Lumens
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableRows.slice(
                                                    -(
                                                        ((tableRows.length -
                                                            1) %
                                                            6) +
                                                        1
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            {renderAttachments()}
        </div>
    );
});
Proposal.displayName = 'Proposal';
export default Proposal;
