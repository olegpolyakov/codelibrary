import { useCallback, useState } from 'react';

export function useBoolean(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    return [
        value,
        useCallback(newValue => {
            return setValue(oldValue => typeof newValue === 'boolean' ? newValue : !oldValue);
        }, [])
    ];
}