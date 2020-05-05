import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

export function useStore(mapState = state => state, mapDispatch = () => {}) {
    const dispatch = useDispatch();

    return [
        useSelector(mapState, shallowEqual),
        useMemo(() => bindActionCreators(mapDispatch, dispatch), [mapDispatch, dispatch])
    ];
}

export function useActions(mapDispatch) {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(mapDispatch, dispatch), [mapDispatch, dispatch]);
}

export { useSelector };