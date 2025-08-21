import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthSocialButton from "@/components/app/AuthSocialButton";
import { BsGoogle } from "react-icons/bs";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = () =>
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN');

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

      if (variant === 'REGISTER') {
      router.post('/register', data, {
        onError: () => {
          toast.error('Something went wrong');
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    } else {
      router.post('/login', data, {
        onSuccess: () => {
          toast.success('Logged in!');
        },
        onError: () => {
          toast.error('Something went wrong');
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              required
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN'
              ? 'Create an account'
              : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
