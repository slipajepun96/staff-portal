import BackButton from '@/Components/BackButton';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminMenu({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center space-x-2">
                    <BackButton route={route('dashboard')} />
                    <h2 className="my-2 text-xl font-semibold leading-tight text-gray-100">
                        Admin
                    </h2>
                </div>
            }
        >
            <Head title="Admin" />

            <div className="">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="">Tetapan Pengguna & Sistem</div>
                    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        <Link href={route('admin.users.index')} className="">
                            <Card className="hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>Pengguna</CardTitle>
                                    {/* <CardDescription>Card Description</CardDescription> */}
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link href={route('admin.entity.index')} className="">
                            <Card className="hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>Entiti</CardTitle>
                                    {/* <CardDescription>Card Description</CardDescription> */}
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link href={route('admin.location.index')} className="">
                            <Card className="hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>Lokasi & Geofencing</CardTitle>
                                    {/* <CardDescription>Card Description</CardDescription> */}
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link href={route('profile.edit')} className="">
                            <Card className="hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>Pengguna</CardTitle>
                                    {/* <CardDescription>Card Description</CardDescription> */}
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
