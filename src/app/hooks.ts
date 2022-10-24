import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>(); // maybe lets rename these to something like just dispatch?
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
