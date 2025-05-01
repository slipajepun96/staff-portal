import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import AttendanceCard from '@/Pages/Partials/AttendanceCard';
// import PrimaryButtonWithArrow from '@/Components/PrimaryButtonWithArrow';

const settings = {
    width: 80,
    height: 80,
    value: 60,
};

const annual_leave = {
    width: 80,
    height: 80,
    value: 40,
};

export default function Dashboard() {
    const { auth } = usePage().props; // Access the shared props
    const userName = auth.user.name; // Get the user's name

    return (
        <AuthenticatedLayout className="">
            <Head title="Utama" />

            <div>
                <div className="h-40 bg-blue-950 p-2 px-3 text-white lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <p className="my-4 text-md font-bold md:text-xl">
                            Selamat Pagi!
                        </p>
                        <div className="my-2 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                            <Card className="hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="font-bold">
                                        Baki Cuti Anda
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-row justify-between">
                                    <div className="flex flex-col items-center">
                                        <Gauge
                                            {...annual_leave}
                                            cornerRadius="10%"
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueText}`]:
                                                    {
                                                        fontSize: 20,
                                                        fill: '#ffffff',
                                                    },
                                                [`& .${gaugeClasses.valueArc}`]:
                                                    {
                                                        fill: '#59b90f',
                                                    },
                                                [`& .${gaugeClasses.referenceArc}`]:
                                                    {
                                                        fill: theme.palette.text
                                                            .disabled,
                                                    },
                                            })}
                                        />
                                        Cuti Tahunan
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Gauge
                                            {...settings}
                                            cornerRadius="10%"
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueText}`]:
                                                    {
                                                        fontSize: 20,
                                                    },
                                                [`& .${gaugeClasses.valueArc}`]:
                                                    {
                                                        fill: '#59b90f',
                                                    },
                                                [`& .${gaugeClasses.referenceArc}`]:
                                                    {
                                                        fill: theme.palette.text
                                                            .disabled,
                                                    },
                                            })}
                                        />
                                        Cuti Sakit
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Gauge
                                            {...settings}
                                            cornerRadius="10%"
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueText}`]:
                                                    {
                                                        fontSize: 20,
                                                    },
                                                [`& .${gaugeClasses.valueArc}`]:
                                                    {
                                                        fill: '#59b90f',
                                                    },
                                                [`& .${gaugeClasses.referenceArc}`]:
                                                    {
                                                        fill: theme.palette.text
                                                            .disabled,
                                                    },
                                            })}
                                        />
                                        Cuti Bersalin
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <AttendanceCard />
                        <p className="text-sm font-bold uppercase text-gray-800 mt-3">
                            Urusan Anda
                        </p>
                        <div className="mb-[30px] grid w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            <Link href={route('outstation.index')} className="">
                                <Card className="h-20 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>Kerja Luar</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>

                            <Link
                                href={route('attendance.index')}
                                className="md:hidden"
                            >
                                <Card className="h-20 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>Kedatangan</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>

                            {/* <Link href={route('profile.edit')} className="">
                                <Card className="h-20 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>Cuti</CardTitle>
                                        <CardDescription>
                                            akan datang
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                            <Link href={route('profile.edit')} className="">
                                <Card className="h-20 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>Tuntutan</CardTitle>
                                        <CardDescription>
                                            akan datang
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                            <Link href={route('profile.edit')} className="">
                                <Card className="h-20 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>Kenderaan</CardTitle>
                                        <CardDescription>
                                            akan datang
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
