import BackButton from '@/Components/BackButton';
// eslint-disable-next-line prettier/prettier
import { Card, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function OutstationIndex({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center space-x-2">
                    <BackButton route={route('dashboard')} />
                    <h2 className="my-2 text-xl font-semibold leading-tight text-gray-100">
                        Kerja Luar
                    </h2>
                </div>
            }
        >
            <Head title="Kerja Luar" />

            <div className="p-2 px-3 text-white lg:px-8">
                <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <Link href={route('outstation.add')} className="">
                        <Card className="h-20 hover:shadow-md">
                            <CardHeader>
                                <CardTitle>Tambah Log Kerja Luar</CardTitle>
                                {/* <CardDescription>Card Description</CardDescription> */}
                            </CardHeader>
                            {/* <CardContent>Hahaha</CardContent> */}
                            {/* <CardFooter className="justify-end">
                                                        <PrimaryButtonWithArrow
                                                            className="ms-4"
                                                            // disabled={processing}
                                                        >
                                                            Log Masuk
                                                        </PrimaryButtonWithArrow>
                                                    </CardFooter> */}
                        </Card>
                    </Link>

                    {/* <Link href={route('attendance.index')} className="">
                        <Card className="h-20 hover:shadow-md">
                            <CardHeader>
                                <CardTitle>Log Kerja Luar</CardTitle>
                            </CardHeader>
                        </Card>
                    </Link> */}
                </div>
                <hr className='my-2' />
                <p className="text-xl font-bold text-gray-800">
                    Log Kerja Luar
                </p>


            </div>
        </AuthenticatedLayout>
    );
}
