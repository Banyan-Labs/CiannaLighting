import React, { useRef, FormEvent, useState } from 'react';
import uuid from 'react-uuid';

import SelectDropdown from 'components/commons/FormControls/SelectDropdown';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useParams } from 'app/utils';
import { CatalogLightItem, LightItemType } from 'typescript/CatalogItem';
import {
    getLightOptionsDropValuesFromItem,
    getDefaultDropValueFromLightEntity,
} from 'helpers/getLightOptionsDropValues';
import { buildObjectFromFormControls } from 'helpers/buildObjectFromFormControls';
import {
    createLight,
    getRoomLights,
    theEditLight,
} from 'redux/actions/lightActions';
import {
    getProject,
    setTheRoom,
    getAllProjectRoomsAction,
    getAttachments,
} from 'redux/actions/projectActions';

import './lightOptionsForm.style.scss';

type Props = {
    catalogLightItem: CatalogLightItem;
    editLightItem: LightItemType | null;
    setCatalogItem: (val: any) => void;
    setEditLight: (val: any) => void;
    lightSpecs: string[];
};

function LightOptionsForm({
    catalogLightItem,
    editLightItem,
    setCatalogItem,
    setEditLight,
}: Props) {
    const dispatch = useAppDispatch();
    const { room, proposal } = useAppSelector(
        ({ project }) => project
    );
    const [count, setCount] = useState<number>(
        editLightItem ? editLightItem?.quantity : 1
    );
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const userId = useParams('_id');
    const formRef = useRef<HTMLFormElement>(null);

    const subtractCount = (subtract: boolean) =>
        setCount((prevState) => {
            if (subtract) {
                return prevState > 1 ? prevState - 1 : 1;
            } else {
                return prevState + 1;
            }
        });

    const dispatchSubmit = async (
        editLight: LightItemType | null,
        catalogLight: CatalogLightItem,
        rfpPassData: any,
    ) => {
        try {
            if (!editLight) {
                await dispatch(
                    createLight({ ...catalogLight, ...rfpPassData })
                );
            } else {
                dispatch(
                    theEditLight(
                        { ...catalogLight, ...rfpPassData },
                        editLight._id
                    )
                );
            }

            await dispatch(getProject({ _id: String(storedProjId) }));
            await dispatch(getAttachments(String(storedProjId)));
            dispatch(setTheRoom(String(storedRoomId)));
            dispatch(getAllProjectRoomsAction(String(storedProjId)));
            await dispatch(getRoomLights(String(storedRoomId)));
            setCatalogItem(null);
            setEditLight(null);
        } catch (error: any) {
            throw new Error(error?.message);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (formRef.current) {
            const formEleData = buildObjectFromFormControls(
                formRef.current.elements
            );
            const additionalData = {
                item_ID: editLightItem
                    ? editLightItem?.item_ID
                    : catalogLightItem.item_ID,
                roomName: room?.name as string,
                roomId: String(storedRoomId),
                projectId: String(storedProjId),
                clientId: String(userId),
            };
            const lightInfoData: unknown = {
                ...formEleData,
                ...additionalData,
                quantity: count,
            };

            const propCheck = proposal
                .filter((item: any) => (item.sub ? '' : item))
                .find((item: any) => item.itemID == additionalData.item_ID);
            const propID = propCheck ? propCheck._id : '';
            const rfpPass = {
                propID: propID,
                description: catalogLightItem.itemDescription,
                lampType: catalogLightItem.lampType,
                lampColor: catalogLightItem.lampColor,
                wattsPer: catalogLightItem.wattsPerLamp,
                price: catalogLightItem.price,
                totalWatts: catalogLightItem.powerInWatts,
                numberOfLamps: catalogLightItem.numberOfLamps,
                totalLumens: catalogLightItem.lumens,
            };

            try {
                await dispatchSubmit(
                    editLightItem,
                    { ...(lightInfoData as CatalogLightItem) },
                    rfpPass
                );
            } catch (error: any) {
                throw new Error(error?.message);
            }
        }
    };
    
    const InputElements = getLightOptionsDropValuesFromItem(
        catalogLightItem
    ).map((selectField) => {
        return (
            <SelectDropdown
                key={uuid()}
                itemKey={selectField.key}
                label={selectField.label}
                dropdownValues={selectField.values}
                defaultValue={
                    editLightItem !== null
                        ? getDefaultDropValueFromLightEntity(
                            editLightItem,
                            selectField.key
                        )
                        : selectField.values[0]
                }
            />
        );
    });

    return (
        <form
            className="light-options-form"
            ref={formRef}
            onSubmit={handleSubmit}
        >
            {InputElements}
            <div className="quantity-input">
                <button
                    type="button"
                    className="quantity-input__value-button"
                    onClick={() => subtractCount(false)}
                >
                    +
                </button>
                <span className="quantity-input__value">{count}</span>
                <button
                    type="button"
                    className="quantity-input__value-button"
                    onClick={() => subtractCount(true)}
                >
                    -
                </button>
                <button type="submit" className="quantity-input__submit-value">
                    {editLightItem ? 'Update Room' : 'Add to Room'}
                </button>
            </div>
        </form>
    );
}

export default LightOptionsForm;
