import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation } from "@/types";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { format } from "date-fns";
import { IoClose, IoTrash } from "react-icons/io5";

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation
}

const ProfileDrawer = ({
  isOpen,
  onClose,
  data
}: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data);

  const joinedDate = format(new Date(otherUser.created_at), 'PP');

  const title = data.name || otherUser.name;

  const statusText = data.is_group
    ? `${data.users!.length} members`
    : 'Active';

  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-50" onClose={onClose}>
        <TransitionChild>
          <div className="transition duration-500 ease-out data-closed:opacity-0">
            <div className="fixed inset-0 bg-black opacity-40" />
          </div>
        </TransitionChild>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild>
                <div className="transition duration-500 ease-in-out data-enter:data-closed:translate-x-full data-leave:data-closed:translate-x-full">
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>
                            {title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div onClick={() => { }} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full py-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {
                                !data.is_group && (
                                  <>
                                    <div>
                                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Email
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {otherUser.email}
                                      </dd>
                                    </div>
                                    <hr />
                                    <div>
                                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                        Joined
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        <time dateTime={joinedDate}>
                                          {joinedDate}
                                        </time>
                                      </dd>
                                    </div>
                                  </>
                                )
                              }
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileDrawer;
