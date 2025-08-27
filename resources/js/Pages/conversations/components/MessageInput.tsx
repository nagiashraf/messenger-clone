import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "./Form";

type MessageInputProps = {
  id: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: any;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput = ({
  id,
  register,
  errors,
  required,
  placeholder,
  type,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type || 'text'}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
