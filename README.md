## Laravel + Inertia + React + Mantine UI

Welcome to my boring Breeze starter template. The template was made for me to always have a template with auth and
templating already done.
The project was created with the laravel new command for the Breeze template with React as the frontend stack.

### What does it solve?

Nothing really, just a starter template to have everything ready to go for when I need to develop something.

### What did I change/introduce?

I added Laravel fortify but only using it for the two-factor authentication. Registration and other auth
functionality remains the same,
I however introduced action classes and moved the logic from the controllers to there. I also introduced request classes
and moved the validation rules there.

### What is the stack?

- [Laravel](https://laravel.com).
- [Inertia](https://inertiajs.com/)
- [React](https://react.dev/)
- [Mantine UI](https://mantine.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Used Packages.

- [Laravel Fortify](https://laravel.com/docs/11.x/fortify)

## Installation

To run the starter app locally, make the required changes to your **.env** file and run the following commands.

- ```composer install```
- ```php artisan key:generate```
- ```php artisan migrate```
- ```npm install```
- ```npm run dev```
- ```php artisan serve```
