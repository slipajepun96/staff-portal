import { router } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddLocation from './Partials/AddLocation';
import RemoveLocation from './Partials/RemoveLocation';

// import {
//     ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//   } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import DangerButton from '@/Components/DangerButton';

function refreshLocations() {
    router.reload({ only: ['geofences'] }); // Reload only the `entities` prop
}

export default function LocationIndex({ success, geofences }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center space-x-2">
                    <BackButton route={route('admin.menu')} />
                    <h2 className="my-2 text-xl font-semibold leading-tight text-gray-100">
                        Lokasi & Geofencing
                    </h2>
                </div>
            }
        >
            <Head title="Lokasi & Geofencing" />

            <div className="">
                <div className="mx-auto max-w-7xl space-y-3 sm:px-6 lg:px-3">
                    {success && (
                        <div className="alert alert-success rounded-lg bg-green-300 px-3 py-2">
                            {success}
                        </div>
                    )}
                    <AddLocation geofences={geofences} />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <Table>
                            <TableHeader>
                                <TableRow className="font-bold">
                                    <TableHead className="w-[50px]">
                                        #
                                    </TableHead>
                                    <TableHead>Lokasi & Geofencing</TableHead>
                                    <TableHead className="text-right">
                                        Tindakan
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            {console.log(geofences)}
                            <TableBody>
                                {geofences.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            Tiada Lokasi & Geofencing Ditemui
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    geofences.map((location, index) => (
                                        <TableRow key={location.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="font-bold">
                                                    {location.location_name}
                                                </div>
                                                {location.location_latitude},
                                                {location.location_longitude}
                                                <br />
                                                Alamat :{' '}
                                                {location.location_address}
                                                <br />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <RemoveLocation
                                                    refreshLocations={
                                                        refreshLocations
                                                    }
                                                    locationId={location.id}
                                                    className="max-w-xl"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
