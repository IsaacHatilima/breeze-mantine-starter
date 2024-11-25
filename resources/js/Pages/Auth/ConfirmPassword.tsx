import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {Button, PasswordInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export default function ConfirmPassword() {
    const {data, setData, post, processing, errors, reset} = useForm({
        password: '',
    });

    const [loading, {open, close}] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        post(route('password.confirm'), {
            onFinish: () => {
                reset('password')
                close();
            },
        });
    };


    return (
        <GuestLayout>
            <Head title="Confirm Password"/>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <PasswordInput
                    mt="xl"
                    label="Password"
                    placeholder="Password"
                    error={errors.password}
                    withAsterisk
                    inputWrapperOrder={['label', 'input', 'error']}
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        type="submit"
                        fullWidth
                        variant="filled"
                        color="rgba(0, 0, 0, 1)"
                        loading={loading}
                        loaderProps={{type: 'dots'}}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
