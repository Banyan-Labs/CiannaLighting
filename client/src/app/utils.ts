import { useSearchParams } from 'react-router-dom';

const useParams = (query: string) => {
    const [searchParams] = useSearchParams();
    // console.log(searchParams.query);
    return searchParams.getAll(query);
};

export default useParams;
