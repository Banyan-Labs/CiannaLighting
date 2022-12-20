import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import './style/proposal.scss';
import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
interface Props {
    ref: any;
}

const Proposal: FC<Props> = React.forwardRef<any>((props, ref) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }
    const { rfp, proposal, attachments } = useAppSelector(
        ({ project }) => project
    );
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
    const ltrs = Array(52)
        .fill('')
        .map((_, index) =>
            index <= 25
                ? String.fromCharCode(index + 65)
                : String.fromCharCode(index + 71)
        );
    const tableRows = () => {
        return finalDisplay
            .map((item, indexTop) => {
                return item.map((prop, index) => {
                    return (
                        <tr key={indexTop + '/' + index}>
                            <td
                                className={
                                    index == 0 ? 'cell f-c bold' : 'cell f-c'
                                }
                            >
                                {item.length > 1
                                    ? `${prop.itemID} - ${ltrs[index]}`
                                    : prop.itemID}
                            </td>
                            <td className={index == 0 ? 'cell bold' : 'cell'}>
                                {prop.lightQuantity}
                            </td>
                            <td className="cell">
                                <ol>
                                    {prop.rooms.map(
                                        (room: any, index: number) => {
                                            return (
                                                <li
                                                    className="list"
                                                    key={index + room.name}
                                                >
                                                    {room.name +
                                                        ' ( ' +
                                                        (room.lightNumber ||
                                                            room.roomLights) +
                                                        ' )'}
                                                </li>
                                            );
                                        }
                                    )}
                                </ol>
                            </td>
                            <td className="cell">{prop.description}</td>
                            <td className="cell">
                                <ul>
                                    {Object.entries(prop.finishes).map(
                                        (item: any, index: number) => {
                                            return (
                                                <li
                                                    className="list"
                                                    key={index + item[0]}
                                                >
                                                    {item[0]}: {item[1]}
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </td>
                            <td className="cell">{prop.lampType}</td>
                            <td className="cell">{prop.lampColor}</td>
                            <td className="cell">{prop.wattsPer}</td>
                            <td className="cell">{prop.totalWatts}</td>
                            <td className="cell">
                                {prop.numberOfLamps * prop.lightQuantity}
                            </td>
                            <td className="cell">{prop.totalLumens}</td>
                            <td className="cell">{prop.price}</td>
                            <td className="cell l-c">
                                {prop.price * prop.lightQuantity}
                            </td>
                        </tr>
                    );
                });
            })
            .flat();
    };
    const renderAttachments = () => {
        return attachments.map((url, index) => {
            console.log('URL: ', url);
            return (
                <Document
                    key={index}
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={console.error}
                    className="pdf-document"
                >
                    {/* <Page
            className="pdf-page"
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            // scale={1.0}
            width={1400}
          /> */}
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            className="pdf-page"
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            pageNumber={index + 1}
                            scale={1.0}
                            width={1400}
                        />
                    ))}
                </Document>
            );
        });
    };
    return (
        <div ref={ref}>
            <div className="proposal-container">
                <div className="header-section">
                    <h1>{header ? header[0].toUpperCase() : '...loading'}</h1>
                    <h1>{header ? header[1].toUpperCase() : '....'}</h1>
                </div>
                <div className="table-contain">
                    <div className="table-border">
                        <div className="table-labels">
                            <div className="mini-header">
                                <h3>Lighting Schedule</h3>
                            </div>
                            <div className="head-labels">
                                <h4 className="label-details">
                                    Information Details
                                </h4>
                                <h4 className="label-lamps">Lamps</h4>
                                <h4 className="label-price">Pricing</h4>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="cell f-c five">ID</th>
                                    <th className="cell q-c five">
                                        Preliminary Quantity
                                    </th>
                                    <th className="cell fifteen">Rooms</th>
                                    <th className="cell five">Description</th>
                                    <th className="cell twenty">Finishes</th>
                                    <th className="cell six">Lamp Type</th>
                                    <th className="cell six">Lamp Color</th>
                                    <th className="cell six">Watts Per</th>
                                    <th className="cell six">Total Watts</th>
                                    <th className="cell six">Total Lamps</th>
                                    <th className="cell six">Lumens</th>
                                    <th className="cell five">Price Per</th>
                                    <th className="cell five l-c">Total</th>
                                </tr>
                            </thead>
                            <tbody>{tableRows()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            {renderAttachments()}
        </div>
    );
});
Proposal.displayName = 'Proposal';
export default Proposal;

{
    /* <Document>
<Page wrap>
  <Text render={({ pageNumber, totalPages }) => (
    `${pageNumber} / ${totalPages}`
  )} fixed />

  <View render={({ pageNumber }) => (
    pageNumber % 2 === 0 && (
      <View style={{ background: 'red' }}>
        <Text>I'm only visible in odd pages!</Text>
      </View>
    )
  )} />
</Page>
</Document> */
}
