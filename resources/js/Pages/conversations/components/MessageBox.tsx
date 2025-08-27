import Avatar from "@/components/Avatar";
import { Message, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import clsx from "clsx";
import { format } from "date-fns";

type MessageBoxProps = {
  data: Message;
  isLast?: boolean;
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
  const user = usePage<PageProps>().props.auth.user;

  const isOwn = data.sender?.email === user.email;

  const seenBy = (data.seen_by || [])
    .filter((user) => user.email !== data.sender?.email)
    .map((user) => user.name)
    .join(', ');

    const container = clsx(
      'flex gap-3 p-4',
      isOwn && 'justify-end'
    );

    const avatar = clsx(isOwn && 'order-2');

    const body = clsx(
      'flex flex-col gap-2',
      isOwn && 'items-end',
    );

    const message = clsx(
      'text-sm w-fit overflow-hidden',
      isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
      data.image_url ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
    );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender!} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender?.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.created_at), 'p')}
          </div>
        </div>
        <div className={message}>
          <div>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
