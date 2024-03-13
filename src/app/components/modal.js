import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const closeIcon = (
  <svg
    data-slot="icon"
    fill="none"
    stroke-width="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ color: 'white', width: 40, height: 40 }}
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
  </svg>
);

export default function ModalUI({
  showModal,
  onCloseModal,
  isCloseOverlay,
  isCenter,
  title,
  children,
}) {
  return (
    <div>
      <Modal
        open={showModal}
        onClose={onCloseModal}
        center={isCenter}
        closeOnOverlayClick={isCloseOverlay}
        classNames={{
          modal: 'modalStyle',
        }}
        closeIcon={closeIcon}
      >
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
}
