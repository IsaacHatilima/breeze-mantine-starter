import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Register() {
    const { data, setData, post, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, { open, close }] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onError: () => close()
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <TextInput
                    inputWrapperOrder={['label', 'input', 'error']}
                    mt="md"
                    type="text"
                    label="First Name"
                    placeholder="Jack"
                    error={errors.firstname}
                    withAsterisk
                    name="firstname"
                    autoComplete="firstname"
                    value={data.firstname}
                    onChange={(e) => setData('firstname', e.target.value)}
                    autoFocus={true}
                />

                <TextInput
                    inputWrapperOrder={['label', 'input', 'error']}
                    mt="md"
                    type="text"
                    label="Last Name"
                    placeholder="Doe"
                    error={errors.lastname}
                    withAsterisk
                    name="lastname"
                    autoComplete="lastname"
                    value={data.lastname}
                    onChange={(e) => setData('lastname', e.target.value)}
                />

                <TextInput
                    mt="md"
                    type="email"
                    label="Email"
                    placeholder="example@mail.com"
                    error={errors.email}
                    withAsterisk
                    inputWrapperOrder={['label', 'input', 'error']}
                    name="email"
                    autoComplete="username"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <PasswordInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
                    error={errors.password}
                    withAsterisk
                    inputWrapperOrder={['label', 'input', 'error']}
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <PasswordInput
                    mt="md"
                    label="Password Confirmation"
                    placeholder="Password Confirmation"
                    error={errors.password_confirmation}
                    withAsterisk
                    inputWrapperOrder={['label', 'input', 'error']}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <div className="my-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="filled"
                    color="rgba(0, 0, 0, 1)"
                    loading={loading}
                    loaderProps={{ type: 'dots' }}
                >
                    Register
                </Button>
            </form>
        </GuestLayout>
    );
}
