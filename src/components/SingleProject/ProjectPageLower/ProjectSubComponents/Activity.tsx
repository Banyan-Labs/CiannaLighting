import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

const Activity: FC = () => {
    const {project} = useAppSelector(({project})=> project)
    console.log("Project: ", project)
    return (
    <div>
        <div>{project?.activity?.createUpdate}</div>
        <div><ul>{project?.activity?.rooms.map((room: string, index: number)=>{
        return <li key={index}>{room}</li>
        })}
        </ul>
        </div>
        <div>
        <ul>{project?.activity?.archiveRestore.map((statusChange: string, index: number)=>{
        return <li key={index}>{statusChange}</li>
        })}
        </ul>
        </div>
    </div>
    );
};

export default Activity;
