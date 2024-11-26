import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import React, {FormEventHandler} from 'react';
import {Button, PinInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export default function TwoFactorChallenge() {
    const {data, setData, post, reset} = useForm({
        code: '',
    });

    const [loading, {open, close}] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        post('/two-factor-challenge', {
            onFinish: () => {

            },
            onError: () => {

            },
        });
        close();
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            <form onSubmit={submit} className="flex flex-col items-center w-full">
                <h1 className="font-bold text-lg mb-4">Confirmation PIN</h1>
                <PinInput
                    oneTimeCode
                    length={6}
                    value={data.code}
                    onChange={(value: string) => setData('code', value)}
                />

                <div className="mt-4 w-full">
                    <Button
                        type="submit"
                        fullWidth
                        variant="filled"
                        color="rgba(0, 0, 0, 1)"
                        loading={loading}
                        loaderProps={{type: 'dots'}}
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
