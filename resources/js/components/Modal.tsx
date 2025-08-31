import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild>
          <div className="data-closed:opacity-0 data-enter:ease-out data-enter:duration-300 data-leave:ease-in data-leave:duration-200">
            <div className="fixed inset-0 bg-gray-500 opacity-40 transition-opacity" />
          </div>
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild>
              <div className="data-closed:opacity-0 data-closed:translate-y-4 sm:data-closed:scale-95 data-enter:ease-out data-enter:duration-300 sm:data-enter:data-closed:translate-y-4 data-leave:ease-in data-leave:duration-200">
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block z-10">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
                  {children}
                </DialogPanel>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
