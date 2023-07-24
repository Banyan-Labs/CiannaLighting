import { useSearchParams } from 'react-router-dom';

export const useParams = (query: string) => {
    const [searchParams] = useSearchParams();

    return searchParams.getAll(query);
};

export const getStatusClass = (givenStatus: string) => {
    const statusWithoutSpecialCharsOrSpace = givenStatus
        .replace(/\s/g, '')
        .replace(/[^\w\s]/gi, '');

    return statusWithoutSpecialCharsOrSpace ? `statusColor${statusWithoutSpecialCharsOrSpace}` : 'statusColorTemplateNew';
}
