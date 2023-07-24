import React, { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { useAppSelector } from '../../../../app/hooks';
import logging from 'config/logging';

import './style/proposal.scss';

interface Props {
    ref: any;
}

const Proposal: FC<Props> = React.forwardRef<any>((props, ref) => {
    const [numPages, setNumPages] = useState<{ [key: string]: number }>({});

    function onDocumentLoadSuccess({ numPages }: any, url: any) {
        const newNumPages = { ...numPages, [url]: numPages };
        setNumPages(newNumPages);
    }

    const { rfp, proposal, attachments } = useAppSelector(({ project }) => {
        return project;
    });

    const header = rfp?.header.split(', ');

    const base = proposal.filter((item) => item.sub.length == 0);

    const children = proposal.filter((item) => item.sub.length > 0);

    const displayChildren = Object.fromEntries(
        base.map((item) => [
            item._id,
            children.filter((child) => child.sub === item._id),
        ])
    );

    const finalDisplay = base.map((item) =>
        [item, displayChildren[item._id]].flat()
    );

    const camelCaseToTitleCase = (camelCase: string) => {
        // Insert spaces before capital letters, then convert the entire string to lowercase
        const spaced = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();

        // Convert the first character of each word to uppercase
        const titleCase = spaced.replace(/(^|[\s\t]+)\w/g, function (match) {
            return match.toUpperCase();
        });

        return titleCase;
    }

    const ltrs = Array(52)
        .fill('')
        .map((_, index) =>
            index <= 25
                ? String.fromCharCode(index + 65)
                : String.fromCharCode(index + 71)
        );

    const tableRows = finalDisplay
        .map((item, indexTop) => {
            return item.map((prop, index) => {
                return (
                    <tr key={indexTop + '/' + index}>
                        <td className={index == 0 ? 'bold' : 'cell'}>
                            {item.length > 1
                                ? `${prop.itemID} - ${ltrs[index]}`
                                : prop.itemID}
                        </td>
                        <td className={index == 0 ? 'bold' : ''}>
                            {prop.lightQuantity}
                        </td>
                        <td>
                            {prop.rooms.map((room: any, index: number) => {
                                return (
                                    <span
                                        className="list"
                                        key={index + room.name}
                                    >
                                        {index + 1 + ') '}
                                        {room.name +
                                            ' ( ' +
                                            (room.lightNumber ||
                                                room.roomLights) +
                                            ' )'}
                                    </span>
                                );
                            })}
                        </td>
                        <td>{prop.description}</td>
                        <td>
                            {Object.entries(prop.finishes).map(
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
                        <td>{prop.numberOfLamps * prop.lightQuantity}</td>
                        <td>{prop.totalLumens}</td>
                        <td>{prop.price}</td>
                        <td>{(prop.price * prop.lightQuantity).toFixed(2)}</td>
                    </tr>
                );
            });
        })
        .flat();

    const renderAttachments = () => {
        return attachments.map((url, index) => {
            const fileName = url?.split('/')[url.split('/').length - 1];
            const splitName = fileName?.split('-');
            const associatedItemID = splitName[0];
            let fileType = splitName[1];
            fileType = fileType?.slice(0, -1);
            let displayName = splitName?.splice(2).join('');

            if (displayName) {
                displayName = decodeURI(displayName)?.replace(/%2B/g, ' ');
            }

            return (
                <div key={index}>
                    <h4>{associatedItemID} - {camelCaseToTitleCase(fileType)} - {displayName}</h4>
                    <Document
                        key={index}
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
                                        {header
                                            ? header[0].toUpperCase()
                                            : '...loading'}
                                    </h1>
                                    <h1>
                                        {header
                                            ? header[1].toUpperCase()
                                            : '....'}
                                    </h1>
                                </div>
                                <div className="table-contain">
                                    <div className="table-border">
                                        <table>
                                            <thead>
                                                <tr className="mini-header">
                                                    <th colSpan={13}>
                                                        <h4>
                                                            Lighting Schedule
                                                        </h4>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={5}>
                                                        Information Details
                                                    </th>
                                                    <th colSpan={6}>Lamps</th>
                                                    <th colSpan={2}>Pricing</th>
                                                </tr>
                                                <tr>
                                                    <th className="five">ID</th>
                                                    <th className="five">
                                                        Preliminary Quantity
                                                    </th>
                                                    <th className="fifteen">
                                                        Rooms
                                                    </th>
                                                    <th className="five">
                                                        Description
                                                    </th>
                                                    <th className="twenty">
                                                        Finishes
                                                    </th>
                                                    <th className="six">
                                                        Lamp Type
                                                    </th>
                                                    <th className="six">
                                                        Lamp Color
                                                    </th>
                                                    <th className="six">
                                                        Watts Per
                                                    </th>
                                                    <th className="six">
                                                        Total Watts
                                                    </th>
                                                    <th className="six">
                                                        Total Lamps
                                                    </th>
                                                    <th className="six">
                                                        Lumens
                                                    </th>
                                                    <th className="five">
                                                        Price Per
                                                    </th>
                                                    <th className="five l-c">
                                                        Total
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
                                        {header
                                            ? header[0].toUpperCase()
                                            : '...loading'}
                                    </h1>
                                    <h1>
                                        {header
                                            ? header[1].toUpperCase()
                                            : '....'}
                                    </h1>
                                </div>
                                <div className="table-contain">
                                    <div className="table-border">
                                        <table>
                                            <thead>
                                                <tr className="mini-header">
                                                    <th colSpan={13}>
                                                        <h4>
                                                            Lighting Schedule
                                                        </h4>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={5}>
                                                        Information Details
                                                    </th>
                                                    <th colSpan={6}>Lamps</th>
                                                    <th colSpan={2}>Pricing</th>
                                                </tr>
                                                <tr>
                                                    <th className="five">ID</th>
                                                    <th className="five">
                                                        Preliminary Quantity
                                                    </th>
                                                    <th className="fifteen">
                                                        Rooms
                                                    </th>
                                                    <th className="five">
                                                        Description
                                                    </th>
                                                    <th className="twenty">
                                                        Finishes
                                                    </th>
                                                    <th className="six">
                                                        Lamp Type
                                                    </th>
                                                    <th className="six">
                                                        Lamp Color
                                                    </th>
                                                    <th className="six">
                                                        Watts Per
                                                    </th>
                                                    <th className="six">
                                                        Total Watts
                                                    </th>
                                                    <th className="six">
                                                        Total Lamps
                                                    </th>
                                                    <th className="six">
                                                        Lumens
                                                    </th>
                                                    <th className="five">
                                                        Price Per
                                                    </th>
                                                    <th className="five l-c">
                                                        Total
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
