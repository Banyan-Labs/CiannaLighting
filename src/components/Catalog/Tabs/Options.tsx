import React, { FC } from 'react';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const Options: FC<catalogPros> = ({
    catalogItem,
    setCatalogItem,
}) => {
    const Item = catalogItem
    return (
        <div className='col-12 d-flex row options-main-container m-0'>
            <div className='col-12 d-flex options-top-container '>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    exterior Finish:
                </h4>
                {Item.exteriorFinish.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Interior Finish:
                </h4>
                {Item.interiorFinish.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Environment:
                </h4>
                {Item.environment.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Safety Cert:
                </h4>
                {Item?.safetyCert.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
                </div>
                <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Socket Type:
                </h4>
                {Item?.socketType.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
                </div>
                <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Mounting:
                </h4>
                {Item?.mounting.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
                </div>
                <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Project Voltage:
                </h4>
                {Item?.projectVoltage.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            </div>
            <div className='col-12 d-flex options-bottom-container'>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Lens Material:
                </h4>
                {Item?.lensMaterial.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Glass Options:
                </h4>
                {Item?.glassOptions.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Acrylic Options:
                </h4>
                {Item?.acrylicOptions.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Crystal Type:
                </h4>
                {Item?.crystalType.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Pin Type:
                </h4>
                {Item?.crystalPinType.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
            </div>
            <div className="d-flex row align-content-start m-0">
                <h4 className='m-0'>
                    Pin Color:
                </h4>
                {Item?.crystalPinColor.map(
                    (
                        ef: string,
                        index = ef.indexOf(ef)
                    ) => {
                        return (
                            <span key={index}>
                                {ef}
                            </span>
                        );
                    }
                )}
                </div>
                </div>
        </div>
    );
};

export default Options;





