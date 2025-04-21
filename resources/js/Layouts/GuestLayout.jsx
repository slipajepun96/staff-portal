import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            {/* <div className="hidden md:block lg:w-3/4"> */}
            <div className="lg:w-3/4">
                <img
                    src="/img/IMG_6841_100.webp"
                    alt="Image"
                    className="w-full object-cover md:h-full"
                />
            </div>
            <div className="mt-2 flex w-full flex-col px-4 md:mt-0 md:h-full md:items-start md:items-center md:justify-center md:place-self-center md:text-left lg:w-1/4">
                <div className="w-full">
                    <Link href="/">
                        <ApplicationLogo className="h-20 fill-current text-gray-500" />
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
