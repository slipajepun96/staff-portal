import { Link } from '@inertiajs/react';

export default function BottomNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex flex-col items-center justify-center px-1 px-5 pb-2 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none' +
                (active
                    ? 'text-white'
                    : 'text-gray-200 hover:text-gray-100 focus:text-gray-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
