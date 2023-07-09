import { useSearchParams } from 'react-router-dom';
import { SystemStatus } from './constants';

export const useParams = (query: string) => {
    const [searchParams] = useSearchParams();

    return searchParams.getAll(query);
};

export const findClosestSystemStatus = (status: string) => {
    const stausWithoutSpecialCharsOrSpace = status
        .replace(/\s/g, '')
        .replace(/[^\w\s]/gi, '');

    const closestStatus = SystemStatus.find(
        (status) => stausWithoutSpecialCharsOrSpace.includes(status)
    );

    return closestStatus ? closestStatus : 'Default';
}
