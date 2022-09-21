import React, { FC, FormEvent, useState } from 'react';

export const NewRoomModal: FC = () => {
    console.log('here');

    return (
        <>
            <h1>New Room</h1>
            <label>Name</label>
            <input type="text" />
            <label>Description</label>
            <textarea />
        </>
    );
};
