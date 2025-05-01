import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import RecordAttendance from '@/Pages/Partials/RecordAttendance';

export default function AttendanceCard() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const { flash } = usePage().props;

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            console.log('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Latitude:', position);
                router.post(
                    '/attendance/location-check',
                    { latitude, longitude },
                    {
                        // onSuccess: (page) => {
                        //     console.log('page'.flash);
                        //     const response = flash.response;
                        //     console.log('page'.response);

                        //     if (response?.status === 'inside') {
                        //         setStatus(
                        //             `Anda berada di dalam kawasan geofencing: ${response.location.name}`,
                        //         );
                        //         console.log('inside');
                        //     } else {
                        //         setStatus(
                        //             'Anda berada di luar kawasan geofencing.',
                        //         );
                        //         console.log('outside');
                        //     }
                        //     setStatus('Location checked.');
                        // },
                        onError: (error) => {
                            setError('Failed to check location.');
                        },
                    },
                );
            },
            (error) => {
                setError('Unable to retrieve your location.');
            },
        );
    }, []);
    // const [position, setPosition] = useState([2.727893, 103.468221]); // Default to Rompin

    return (
        <Card className="hover:shadow-md md:hidden">
            <CardHeader>
            <div className="">
                    {status && <div className="text-green-600 flex flex-row"><span class="flex w-2 h-2 me-3 bg-green-500 rounded-full"></span>{status}</div>}
                    {error && <div className="text-red-600 flex flex-row align-center"><span class="flex w-2 h-2 me-3 bg-red-500 rounded-full"></span>{error}</div>}
                </div>
                <CardTitle className="">
                    <div className="text-sm font-medium">Anda berada di</div>
                    <div className="font-extrabold">diluar kawasan geofencing</div>
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                <div className="aligns-center flex flex-row gap-2 w-full">
                    <RecordAttendance />
                    {/* <div><PrimaryButton>Log Masuk Waktu Kerja</PrimaryButton></div> */}
                    <div><PrimaryButton>Log Kerja Luar</PrimaryButton></div>
                </div>



                {/* <PrimaryButton>Log Masuk Kehadiran</PrimaryButton> */}
                {/* <div className="flex flex-col items-center">Cuti Tahunan</div>
                <div className="flex flex-col items-center">Cuti Sakit</div>
                <div className="flex flex-col items-center">Cuti Bersalin</div> */}
            </CardContent>
        </Card>
    );
}
