import { useEffect } from 'react';
import type { RefObject } from 'react';
type Callback = (event: MouseEvent) => void;

export const useClickOutside = (
    refs: RefObject<HTMLElement>[],
    callback: Callback
): void => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isOutside = refs.every(
                (ref) => ref.current && !ref.current.contains(event.target as Node)
            );

            if (isOutside) {
                callback(event);
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [callback, refs]);
};
