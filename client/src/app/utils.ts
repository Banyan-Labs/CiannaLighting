import { useSearchParams } from 'react-router-dom';

const useParams = (query: string) => {
    const [searchParams] = useSearchParams();
    // console.log("projIdParams: ",searchParams.get(query));
    return searchParams.getAll(query);
};

export default useParams;
