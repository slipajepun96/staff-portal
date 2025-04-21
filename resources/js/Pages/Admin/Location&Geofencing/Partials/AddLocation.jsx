// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useForm } from '@inertiajs/react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

export default function AddLocation({ geofences = [] }) {
    const [position, setPosition] = useState([2.727893, 103.468221]); // Default to Rompin
    const { data, setData, post, processing, errors, reset } = useForm({
        location_name: '',
        location_address: '',
        location_latitude: position[0],
        location_longitude: position[1],
        location_radius: 100,
    });

    // Synchronize position state with latitude and longitude fields
    useEffect(() => {
        setPosition([parseFloat(data.location_latitude), parseFloat(data.location_longitude)]);
    }, [data.location_latitude, data.location_longitude]);


    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked:', e.latlng);
        // Update the marker position
        setPosition([lat, lng]);

        // Update the form state with the new latitude and longitude
        setData('location_latitude', lat);
        setData('location_longitude', lng);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        post(route('admin.entity.add'), {
            onSuccess: () => {
                reset(
                    'location_name',
                    'location_address',
                    'location_latitude',
                    'location_longitude',
                    'location_radius',
                );
                setPosition([3.139, 101.6869]);
                // Close the dialog
                setIsDialogOpen(false);
                refreshEntities();
            },
        });
    };
    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            reset(
                'location_name',
                'location_address',
                'location_latitude',
                'location_longitude',
                'location_radius',
            );
            setPosition([3.139, 101.6869]);
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Tambah Lokasi & Geofencing
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Tambah Lokasi & Geofencing</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
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
                                    value="Radius Lokasi"
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
                                <MapContainer
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
                                </MapContainer>
                            </div>
                        </div>
                        <PrimaryButton disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
