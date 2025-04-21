import { router } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EntityAdd from './Partials/EntityAdd';
import EditEntity from './Partials/EditEntity';
import DeleteEntity from './Partials/DeleteEntity';


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

function refreshEntities() {
    router.reload({ only: ['entities'] }); // Reload only the `entities` prop
}

export default function EntityIndex({ entities, success }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center space-x-2">
                    <BackButton route={route('admin.menu')} />
                    <h2 className="my-2 text-xl font-semibold leading-tight text-gray-100">
                        Entiti
                    </h2>
                </div>
            }
        >
            <Head title="Entiti" />

            <div className="">
                <div className="mx-auto max-w-7xl space-y-3 sm:px-6 lg:px-3">
                    {success && (
                        <div className="alert alert-success rounded-lg bg-green-300 px-3 py-2">
                            {success}
                        </div>
                    )}
                    <EntityAdd
                        refreshEntities={refreshEntities}
                        className="max-w-xl"
                    />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                        <Table>
                            <TableHeader>
                                <TableRow className="font-bold">
                                    <TableHead className="w-[50px]">
                                        #
                                    </TableHead>
                                    <TableHead>Nama Entiti</TableHead>
                                    <TableHead>Jenis Entiti</TableHead>
                                    <TableHead className="text-right">
                                        Tindakan
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entities.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            Tiada Entiti Ditemui
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    entities.map((entity, index) => (
                                        <TableRow key={entity.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="font-bold">
                                                    {entity.entity_abbv} -{' '}
                                                    {entity.entity_name}
                                                </div>
                                                Alamat : {entity.entity_address} <br />
                                                No. Telefon : {entity.entity_phone} <br />
                                            </TableCell>
                                            <TableCell>
                                                {entity.entity_type}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <EditEntity
                                                    refreshEntities={
                                                        refreshEntities
                                                    }
                                                    entity={entity}
                                                    className="max-w-xl"
                                                />
                                                <DeleteEntity
                                                    refreshEntities={
                                                        refreshEntities
                                                    }
                                                    entityId={entity.id}
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
