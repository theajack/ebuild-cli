import {MouseEvent, ReactNode} from 'react';

const Link = ({active, children, onClick}: {
    active: boolean;
    children: ReactNode;
    onClick: (e: MouseEvent) => void;
}) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
);


export default Link;