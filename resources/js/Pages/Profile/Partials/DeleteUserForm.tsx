import Modal from '@/Components/Modal';
import {useForm} from '@inertiajs/react';
import {FormEventHandler, useRef, useState} from 'react';
import {Button, PasswordInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export default function DeleteUserForm({
                                           className = '',
                                       }: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [loading, {open, close}] = useDisclosure();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
            },
            onError: () => {
                passwordInput.current?.focus()
            },
            onFinish: () => {
                reset()
            },
        });
        close();
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button variant="filled" color="red" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <PasswordInput
                        mt="md"
                        label="Password"
                        placeholder="Password"
                        ref={passwordInput}
                        error={errors.password}
                        withAsterisk
                        inputWrapperOrder={['label', 'input', 'error']}
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <div className="mt-6 flex justify-end">
                        <Button variant="filled" color="gray" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button type="submit" variant="filled" color="red" className="ms-3" disabled={processing}>
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
