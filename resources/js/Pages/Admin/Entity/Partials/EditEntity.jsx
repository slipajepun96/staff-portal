// import { Inertia } from '@inertiajs/inertia'; 
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

export default function EditEntity({ entity, refreshEntities }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: entity.id,
        entity_name: entity.entity_name,
        // entity_abbv: entity.entity_abbv,
        entity_type: entity.entity_type,
        entity_address: entity.entity_address,
        entity_phone: entity.entity_phone,
        entity_email: entity.entity_email,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.entity.edit'), {
            onSuccess: () => {
                reset(
                    'id',
                    'entity_name',
                    'entity_abbv',
                    'entity_type',
                    'entity_address',
                    'entity_phone',
                    'entity_email',
                );

                // Close the dialog
                setIsDialogOpen(false);

                refreshEntities();
            },
        });
    };

    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            console.log(entity_name);
            reset(
                'id',
                'entity_name',
                'entity_abbv',
                'entity_type',
                'entity_address',
                'entity_phone',
                'entity_email',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                    </svg>
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Entiti</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                            <div>
                                <TextInput
                                    id="id"
                                    name="id"
                                    value={data.id}
                                    className="mt-1 block w-full"
                                    autoComplete="entity_name"
                                    isFocused={true}
                                    required
                                />
                                <InputLabel
                                    htmlFor="entity_name"
                                    value="Nama Entiti"
                                />
                                <TextInput
                                    id="entity_name"
                                    name="entity_name"
                                    value={data.entity_name}
                                    className="mt-1 block w-full"
                                    autoComplete="entity_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('entity_name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.entity_name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="entity_type"
                                    value="Jenis Entiti"
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setData('entity_type', value)
                                    }
                                    value={data.entity_type}
                                >
                                    <SelectTrigger className="h-[40px] w-full">
                                        <SelectValue placeholder="Sila Pilih Jenis Entiti" />
                                    </SelectTrigger>
                                    <SelectContent
                                        id="entity_type"
                                        name="entity_type"
                                    >
                                        <SelectItem value="HQ">
                                            Ibu Pejabat
                                        </SelectItem>
                                        <SelectItem value="HQU">
                                            Unit Ibu Pejabat
                                        </SelectItem>
                                        <SelectItem value="Estate">
                                            Ladang
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="entity_address"
                                    value="Alamat Entiti"
                                />
                                <TextInput
                                    id="entity_address"
                                    name="entity_address"
                                    value={entity.entity_address}
                                    className="mt-1 block w-full"
                                    autoComplete="entity_address"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            'entity_address',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.entity_address}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="entity_phone"
                                    value="No. Telefon Pejabat Entiti"
                                />
                                <TextInput
                                    id="entity_phone"
                                    name="entity_phone"
                                    value={entity.entity_phone}
                                    className="mt-1 block w-full"
                                    autoComplete="entity_phone"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('entity_phone', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.entity_phone}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="entity_email"
                                    value="E-Mel Entiti"
                                />
                                <TextInput
                                    id="entity_email"
                                    name="entity_email"
                                    value={entity.entity_email}
                                    className="mt-1 block w-full"
                                    autoComplete="entity_email"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('entity_email', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.entity_email}
                                    className="mt-2"
                                />
                            </div>
                            {/* <PrimaryButton
                                type="submit"
                                size="sm"
                                className="px-3 py-3"
                            >
                                <span className="sr-only">Simpan</span>
                            </PrimaryButton> */}
                        </div>
                        <PrimaryButton disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
                {/* <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
