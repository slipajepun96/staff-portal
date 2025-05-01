import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BackButton from '@/Components/BackButton';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


export default function AddOutstationLog({ mustVerifyEmail, status }) {
    const submit = (e) => {
        e.preventDefault();
        console.log('onSuccess', data);

        post(route('admin.location.add'), {
            onSuccess: () => {
                reset(
                    'outstation_month',
                    'outstation_year',
                    'outstation_from_datetime',
                    'outstation_to_datetime',
                    'outstation_location',
                    'outstation_reason',
                    'outstation_claim_meal_allowance',
                    'oustation_meal_allowance_num_of_breakfast',
                    'oustation_meal_allowance_rate_of_breakfast',
                    'oustation_meal_allowance_num_of_lunch',
                    'oustation_meal_allowance_rate_of_lunch',
                    'oustation_meal_allowance_num_of_evening_teabreak',
                    'oustation_meal_allowance_rate_of_evening_teabreak',
                    'oustation_meal_allowance_num_of_dinner',
                    'oustation_meal_allowance_rate_of_dinner',
                    'outstation_type_of_accommodation_claimed',
                    'outstation_accommodation_no_receipt_overnight_rate',
                    'outstation_accommodation_with_receipt_overnight_rate',
                    'outstation_accommodation_total_payment',
                    'outstation_accommodation_attachment',
                    'outstation_owncar_mileage_travelled',
                    'outstation_owncar_mileage_rate_perkm',
                    'claimed',
                    'claim_form_id',
                );
                // Close the dialog
                console.log('onSuccess', data);
                setIsDialogOpen(false);
                refreshLocations();
            },
        });
    };

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
                <p className="text-xl font-bold text-gray-800">
                    Tambah Log Kerja Luar
                </p>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                            <div>
                                <InputLabel
                                    htmlFor="location_name"
                                    value="Nama Lokasi"
                                />
                                <TextInput
                                    id="location_name"
                                    name="location_name"
                                    value={data.location_name}
                                    className="mt-1 block w-full"
                                    autoComplete="location_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('location_name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.location_name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="location_address"
                                    value="Alamat Penuh Lokasi"
                                />
                                <TextInput
                                    id="location_address"
                                    name="location_address"
                                    value={data.location_address}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'location_address',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.location_address}
                                    className="mt-2"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <InputLabel
                                        htmlFor="location_latitude"
                                        value="Latitud"
                                    />
                                    <TextInput
                                        id="location_latitude"
                                        name="location_latitude"
                                        value={data.location_latitude}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                'location_latitude',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.location_latitude}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="location_address"
                                        value="Longitud"
                                    />
                                    <TextInput
                                        id="location_longitude"
                                        name="location_longitude"
                                        value={data.location_longitude}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                'location_longitude',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.location_longitude}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="location_radius"
                                    value="Radius Lokasi (meter)"
                                />
                                <TextInput
                                    id="location_radius"
                                    name="location_radius"
                                    value={data.location_radius}
                                    className="mt-1 block w-full"
                                    autoComplete="location_radius"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            'location_radius',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.location_radius}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                {/* <MapContainer
                                    center={position}
                                    zoom={15}
                                    style={{ height: '200px', width: '100%', zIndex: 0 }}
                                    eventHandlers={{
                                        click: handleClick, // Use eventHandlers to capture clicks
                                    }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker
                                        position={position}
                                        interactive={false}
                                    />
                                    <Circle
                                        center={position}
                                        radius={data.location_radius}
                                        interactive={false}
                                    />
                                  {(geofences || []).map((g) => (
                                        <Circle
                                            key={g.id || index}
                                            center={[
                                                parseFloat(g.location_latitude),
                                                parseFloat(
                                                    g.location_longitude,
                                                ),
                                            ]}
                                            radius={parseFloat(
                                                g.location_radius,
                                            )}
                                            pathOptions={{ color: 'green' }}
                                            interactive={false}
                                        />
                                    ))}
                                </MapContainer> */}
                            </div>
                        </div>
                        <PrimaryButton disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
