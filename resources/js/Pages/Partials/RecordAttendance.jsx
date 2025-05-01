// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
// import {
//     Dialog,
//     DialogContent,
//     // DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useForm } from '@inertiajs/react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

export default function RecordAttendance({ refreshEntities }) {
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }), // Format: HH:MM
            );
            setCurrentDate(
                now.toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }), // Format: Month Day, Year
            );
        };

        updateTime(); // Set the initial time and date
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        test: '',
    });

    // const { data, setData, post, processing, errors, reset } = useForm({
    //     test: '',
    //     entity_abbv: '',
    //     entity_type: '',
    //     entity_address: '',
    //     entity_phone: '',
    //     entity_email: '',
    // });

    const submit = (e) => {
        e.preventDefault();

        // post(route('admin.entity.add'), {
        //     onSuccess: () => {
        //         reset(
        //             'entity_name',
        //             'entity_abbv',
        //             'entity_type',
        //             'entity_address',
        //             'entity_phone',
        //             'entity_email',
        //         );

        //         // Close the dialog
        //         setIsDialogOpen(false);

        //         refreshEntities();
        //     },
        // });
    };
    // const handleDialogClose = (isOpen) => {
    //     setIsDialogOpen(isOpen);

    //     if (!isOpen) {
    //         console.log(entity_name);
    //         reset(
    //             'entity_name',
    //             'entity_abbv',
    //             'entity_type',
    //             'entity_address',
    //             'entity_phone',
    //             'entity_email',
    //         );
    //     }
    // };
    return (
        <Drawer>
            <DrawerTrigger>
                <PrimaryButton>Log Masuk Waktu Kerja</PrimaryButton>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Rekodkan Masa</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <div className="m-2">
                    <form onSubmit={submit}>
                        <div>
                            <div className="grid grid-cols-2 gap-2 my-2">
                                <div>
                                    <InputLabel htmlFor="test" value="Tarikh" />
                                    {currentDate}
                                </div>
                                <div>
                                    <InputLabel htmlFor="test" value="Masa" />
                                    {currentTime}
                                </div>
                            </div>
                            <TextInput
                                id="test"
                                name="test"
                                value={currentTime}
                                className="mt-1 block w-full hidden"
                                isFocused={false}
                                onChange={(e) => setData('test', e.target.value)}
                                hidden
                            />
                            <InputError message={errors.test} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="test" value="Lokasi" />
                            <TextInput
                                id="test"
                                name="test"
                                value={data.test}
                                className="mt-1 block w-full"
                                isFocused={false}
                                onChange={(e) => setData('test', e.target.value)}
                                required
                            />
                            <InputError message={errors.test} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="test" value="Catatan" />
                            <TextInput
                                id="test"
                                name="test"
                                value={data.test}
                                className="mt-1 block w-full"
                                isFocused={false}
                                onChange={(e) => setData('test', e.target.value)}
                                required
                            />
                            <InputError message={errors.test} className="mt-2" />
                        </div>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <PrimaryButton disabled={processing} className=''>Jam Masuk</PrimaryButton>
                            <PrimaryButton disabled={processing} className=''>Keluar Rehat</PrimaryButton>
                            <PrimaryButton disabled={processing} className=''>Masuk Rehat</PrimaryButton>
                            <PrimaryButton disabled={processing} className=''>Jam Keluar</PrimaryButton>
                        </div>

                    </form>
                </div>

                <DrawerFooter>

                    {/* <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        
        // <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        //     <DialogTrigger asChild>
        //         <PrimaryButton variant="outline">Tambah Entiti</PrimaryButton>
        //     </DialogTrigger>
        //     <DialogContent className="max-w-xl">
        //         <DialogHeader>
        //             <DialogTitle>Tambah Entiti</DialogTitle>
        //             {/* <DialogDescription>
        //                 Anyone who has this link will be able to view this.
        //             </DialogDescription> */}
        //         </DialogHeader>
        //         <form onSubmit={submit}>
        //             <div className="items-center space-y-2">
        //                 <div className="grid flex-1 gap-2">
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_name"
        //                             value="Nama Entiti"
        //                         />
        //                         <TextInput
        //                             id="entity_name"
        //                             name="entity_name"
        //                             value={data.entity_name}
        //                             className="mt-1 block w-full"
        //                             autoComplete="entity_name"
        //                             isFocused={true}
        //                             onChange={(e) =>
        //                                 setData('entity_name', e.target.value)
        //                             }
        //                             required
        //                         />
        //                         <InputError
        //                             message={errors.entity_name}
        //                             className="mt-2"
        //                         />
        //                     </div>
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_abbv"
        //                             value="Singkatan Nama"
        //                         />
        //                         <TextInput
        //                             id="entity_abbv"
        //                             name="entity_abbv"
        //                             value={data.entity_abbv}
        //                             className="mt-1 block w-full"
        //                             isFocused={false}
        //                             onChange={(e) =>
        //                                 setData('entity_abbv', e.target.value)
        //                             }
        //                             required
        //                         />
        //                         <InputError
        //                             message={errors.entity_abbv}
        //                             className="mt-2"
        //                         />
        //                     </div>
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_type"
        //                             value="Jenis Entiti"
        //                         />
        //                         <Select
        //                             onValueChange={(value) =>
        //                                 setData('entity_type', value)
        //                             }
        //                         >
        //                             <SelectTrigger className="h-[40px] w-full">
        //                                 <SelectValue placeholder="Sila Pilih Jenis Entiti" />
        //                             </SelectTrigger>
        //                             <SelectContent
        //                                 id="entity_type"
        //                                 name="entity_type"
        //                             >
        //                                 <SelectItem value="HQ">
        //                                     Ibu Pejabat
        //                                 </SelectItem>
        //                                 <SelectItem value="HQU">
        //                                     Unit Ibu Pejabat
        //                                 </SelectItem>
        //                                 <SelectItem value="Estate">
        //                                     Ladang
        //                                 </SelectItem>
        //                             </SelectContent>
        //                         </Select>
        //                     </div>
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_address"
        //                             value="Alamat Entiti"
        //                         />
        //                         <TextInput
        //                             id="entity_address"
        //                             name="entity_address"
        //                             value={data.entity_address}
        //                             className="mt-1 block w-full"
        //                             autoComplete="entity_address"
        //                             isFocused={true}
        //                             onChange={(e) =>
        //                                 setData(
        //                                     'entity_address',
        //                                     e.target.value,
        //                                 )
        //                             }
        //                             required
        //                         />
        //                         <InputError
        //                             message={errors.entity_address}
        //                             className="mt-2"
        //                         />
        //                     </div>
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_phone"
        //                             value="No. Telefon Pejabat Entiti"
        //                         />
        //                         <TextInput
        //                             id="entity_phone"
        //                             name="entity_phone"
        //                             value={data.name}
        //                             className="mt-1 block w-full"
        //                             autoComplete="entity_phone"
        //                             isFocused={true}
        //                             onChange={(e) =>
        //                                 setData('entity_phone', e.target.value)
        //                             }
        //                             required
        //                         />
        //                         <InputError
        //                             message={errors.entity_phone}
        //                             className="mt-2"
        //                         />
        //                     </div>
        //                     <div>
        //                         <InputLabel
        //                             htmlFor="entity_email"
        //                             value="E-Mel Entiti"
        //                         />
        //                         <TextInput
        //                             id="entity_email"
        //                             name="entity_email"
        //                             value={data.name}
        //                             className="mt-1 block w-full"
        //                             autoComplete="entity_email"
        //                             isFocused={true}
        //                             onChange={(e) =>
        //                                 setData('entity_email', e.target.value)
        //                             }
        //                             required
        //                         />
        //                         <InputError
        //                             message={errors.entity_email}
        //                             className="mt-2"
        //                         />
        //                     </div>
        //                     {/* <PrimaryButton
        //                         type="submit"
        //                         size="sm"
        //                         className="px-3 py-3"
        //                     >
        //                         <span className="sr-only">Simpan</span>
        //                     </PrimaryButton> */}
        //                 </div>
        //                 <PrimaryButton disabled={processing}>
        //                     Simpan
        //                 </PrimaryButton>
        //             </div>
        //         </form>
        //         {/* <DialogFooter className="sm:justify-start">
        //             <DialogClose asChild>
        //                 <Button type="button" variant="secondary">
        //                     Close
        //                 </Button>
        //             </DialogClose>
        //         </DialogFooter> */}
        //     </DialogContent>
        // </Dialog>
    );
}
