import { useSearchParams } from 'react-router-dom';

const useParams = (query: string) => {
    const [searchParams] = useSearchParams();

    return searchParams.getAll(query);
};

export default useParams;
