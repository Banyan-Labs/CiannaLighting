import { useSearchParams } from 'react-router-dom';
import { SystemStatus } from './constants';

export const useParams = (query: string) => {
    const [searchParams] = useSearchParams();

    return searchParams.getAll(query);
};

export const findClosestSystemStatus = (givenStatus: string) => {
    const stausWithoutSpecialCharsOrSpace = givenStatus
        .replace(/\s/g, '')
        .replace(/[^\w\s]/gi, '');

    const closestStatus = SystemStatus.find(
        (status) => stausWithoutSpecialCharsOrSpace.includes(status)
    );

    return closestStatus ? closestStatus : 'Default';
}
