import { useSearchParams } from 'react-router-dom';

const useParams = (query: string) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return searchParams.get(query);
};

export default useParams;
