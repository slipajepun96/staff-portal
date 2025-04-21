import BackButton from '@/Components/BackButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserIndex({ verified_users, unverified_users }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center space-x-2">
                    <BackButton route={route('admin.menu')} />
                    <h2 className="my-2 text-xl font-semibold leading-tight text-gray-100">
                        Pengguna
                    </h2>
                </div>
            }
        >
            <Head title="Pengguna" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <Tabs defaultValue="verified" className="w-full">
                            <TabsList>
                                <TabsTrigger value="verified">
                                    Pengguna Disahkan
                                </TabsTrigger>
                                <TabsTrigger value="unknown">
                                    Pengguna Belum Disahkan
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="verified">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="font-bold">
                                            <TableHead className="w-[50px]">
                                                #
                                            </TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>E-Mel</TableHead>
                                            <TableHead>Bahagian</TableHead>
                                            <TableHead className="text-right">
                                                Tindakan
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {verified_users.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center"
                                                >
                                                    Tiada Pengguna Yang Disahkan
                                                    Ditemui
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            verified_users.map(
                                                (user, index) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            Ibu Pejabat
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <button className="text-blue-500 hover:underline">
                                                                Edit
                                                            </button>
                                                            <button className="ml-4 text-red-500 hover:underline">
                                                                Padam
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="unknown">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="font-bold">
                                            <TableHead className="w-[50px]">
                                                #
                                            </TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>E-Mel</TableHead>
                                            <TableHead>Bahagian</TableHead>
                                            <TableHead className="text-right">
                                                Tindakan
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {unverified_users.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center"
                                                >
                                                    Tiada Pengguna Yang Belum
                                                    Disahkan Ditemui
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            unverified_users.map(
                                                (user, index) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            Ibu Pejabat
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <button
                                                                className="font-base m-1 rounded-md bg-green-600 px-2 py-1 text-gray-50 hover:bg-green-700 hover:text-white"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Adakah anda pasti?',
                                                                        )
                                                                    ) {
                                                                        router.post(
                                                                            route(
                                                                                'admin.users.verify',
                                                                                {
                                                                                    id: user.id,
                                                                                },
                                                                            ),
                                                                            {},
                                                                            {
                                                                                onSuccess:
                                                                                    () => {
                                                                                        alert(
                                                                                            'Pengguna telah disahkan',
                                                                                        );
                                                                                    },
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Sah Pengguna
                                                            </button>
                                                            <button className="font-base m-1 rounded-md bg-red-600 px-2 py-1 text-gray-50 hover:bg-red-700 hover:text-white">
                                                                Buang
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                        {/* <Table>
                            <TableHeader>
                                <TableRow className="font-bold">
                                    <TableHead className="w-[50px]">
                                        #
                                    </TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>E-Mel</TableHead>
                                    <TableHead>Bahagian</TableHead>
                                    <TableHead className="text-right">
                                        Tindakan
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>Ibu Pejabat</TableCell>
                                        <TableCell className="text-right">
                                            <button className="text-blue-500 hover:underline">
                                                Edit
                                            </button>
                                            <button className="ml-4 text-red-500 hover:underline">
                                                Padam
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
