'use client';
import React, { useState, useEffect } from 'react';
import Class from './task.module.scss';
import ModalUI from '@/app/components/modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Suspense } from 'react';
import { BASE_URL } from '@/app/utils/constant';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
let moment = require('moment');

const taskData = {
  taskName: 'Timesheet fill up',
  taskDescription: 'Today need to fillup the task',
  taskDate: new Date(),
};

const taskSchema = yup.object({
  taskName: yup.string().required('Task name is required'),
  taskDescription: yup.string().required('Description  is required'),
  taskDate: yup.string().required('Date is required'),
  // taskStatus: yup.boolean(),
});

export default function Task() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(true);

  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskDate, setTaskDate] = useState(new Date());

  const onOpenModal = () => setShowTaskModal(true);

  //RESET FORM
  const resetFormHandler = () => {
    reset({
      taskName: '',
      taskDescription: '',
      taskDate: new Date(),
    });
  };

  // CLOSE TASK MODAL
  const onCloseTaskModal = () => {
    setShowTaskModal(false);
    setTaskDate(new Date());
    resetFormHandler();
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful, touchedFields, isSubmitting, submitCount },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      taskName: '',
      taskDescription: '',
      taskDate: new Date(),
    },
  });

  const onSubmitTask = async (values) => {
    console.log('form hook', values);
    const payload = {
      ...values,
      taskDate: moment(new Date(values.taskDate)).format('MM/DD/YYYY'),
    };

    try {
      const addTask = await fetch(`${BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (addTask.status === 500) {
        setError('Task not saved, please check');
      }
      if (addTask.status === 200) {
        setError('');
        setShowSuccessModal(true);
      }
    } catch (error) {
      setError('Error!!!, please try again');
    }
    onCloseTaskModal();
    console.log('form hook##', payload);
  };

  // EDIT TASK
  const onEditTaskHandler = () => {
    setShowTaskModal(true);
    reset(taskData);
  };

  const modalProp = {
    showModal: showTaskModal,
    onCloseModal: onCloseTaskModal,
    isCloseOverlay: false,
    isCenter: false,
    title: 'Add task',
  };

  const modalSuccessProp = {
    showModal: showSuccessModal,
    onCloseModal: () => onCloseSuccessModal(),
    isCloseOverlay: false,
    isCenter: false,
    title: 'Success',
  };

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({});
  //   }
  // });

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={Class.task_outer}>
      <div className="mb-10 flex items-center">
        {/* {moment(taskDate).format('MM/DD/YYYY')} */}
        {console.log('tasks', tasks)}
        <h2>Add your task</h2>
        <button
          type="button"
          class="py-2.5 ml-5 px-5 me-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-full  text-center text-black  dark:focus:ring-yellow-900"
          onClick={onOpenModal}
        >
          Click here
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className={`${Class.task}`}>
          <h2 className="mb-2 text-xl">Update Password</h2>
          <p className="mb-4">Review online accounts and update password for better security</p>
          <p className="mb-4 text-sm">
            <strong>12/12/24</strong>
          </p>
          <div className="flex justify-between">
            <div className="rounded-full bg-white px-4  py-2 text-center text-[#090909] text-sm">
              Completed
            </div>
            <div className="flex justify-between">
              <Link href="#">
                <svg
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width={30}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  ></path>
                </svg>
              </Link>

              <Link href="#" onClick={() => onEditTaskHandler()}>
                <svg
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="ml-5"
                  width={30}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className={`${Class.task}`}>
          <h2 className="mb-2 text-xl">Update Password</h2>
          <p className="mb-4">Review online accounts and update password for better security</p>
          <p className="mb-4 text-sm">
            <strong>12/12/24</strong>
          </p>
          <div className="flex justify-between">
            <div className="rounded-full bg-white px-4  py-2 text-center text-[#090909] text-sm">
              Completed
            </div>
            <div className="flex justify-between">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width={50}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className={`${Class.task}`}>
          <h2 className="mb-2 text-xl">Update Password</h2>
          <p className="mb-4">Review online accounts and update password for better security</p>
          <p className="mb-4 text-sm">
            <strong>12/12/24</strong>
          </p>
          <div className="flex justify-between">
            <div className="rounded-full bg-white px-4  py-2 text-center text-[#090909] text-sm">
              Completed
            </div>
            <div className="flex justify-between">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width={50}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className={`${Class.task}`}>
          <h2 className="mb-2 text-xl">Update Password</h2>
          <p className="mb-4">Review online accounts and update password for better security</p>
          <p className="mb-4 text-sm">
            <strong>12/12/24</strong>
          </p>
          <div className="flex justify-between">
            <div className="rounded-full bg-white px-4  py-2 text-center text-[#090909] text-sm">
              Completed
            </div>
            <div className="flex justify-between">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width={50}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className={`${Class.task}`}>
          <h2 className="mb-2 text-xl">Update Password</h2>
          <p className="mb-4">Review online accounts and update password for better security</p>
          <p className="mb-4 text-sm">
            <strong>12/12/24</strong>
          </p>
          <div className="flex justify-between">
            <div className="rounded-full bg-white px-4  py-2 text-center text-[#090909] text-sm">
              Completed
            </div>
            <div className="flex justify-between">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width={50}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ModalUI {...modalProp}>
        <form className={Class.task_form} onSubmit={handleSubmit(onSubmitTask)}>
          <div className="p-4 md:p-5 space-y-4 text-white">
            <div className="flex mb-2 ">
              <div className="w-40 ">
                <label>Task Name:</label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter task name"
                  {...register('taskName')}
                  className="py-2 px-4 rounded-md text-sm text-black"
                />
                {errors?.taskName && (
                  <p className="text-xs mt-1 bottom-[-20px] right-0 text-amber-300 pb-1">
                    {errors.taskName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mb-2 ">
              <div className="w-40 ">
                <label>Task Description:</label>
              </div>
              <div className="relative">
                <textarea
                  type="text"
                  placeholder="Enter description"
                  {...register('taskDescription')}
                  className="py-2 px-4 rounded-md text-sm text-black"
                />
                {errors?.taskDescription && (
                  <p className="text-xs  bottom-[-20px] right-0 text-amber-300 pb-1">
                    {errors.taskDescription?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mb-2 ">
              <div className="w-40 ">
                <label>Date:</label>
              </div>
              <div className="relative">
                <DatePicker
                  selected={taskDate}
                  {...register('taskDate')}
                  onChange={(date) => {
                    setTaskDate(new Date(date));
                    setValue('taskDate', moment(new Date(date)).format('MM/DD/YYYY'));
                  }}
                  className="py-2 px-4 rounded-md text-sm text-black"
                />

                {errors?.taskDate && (
                  <p className="text-xs  bottom-[-20px] right-0 text-amber-300 pb-1">
                    {errors.taskDate?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex   py-4 md:py-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={onCloseTaskModal}
            >
              Return
            </button>
            <button
              type="submit"
              className="ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </ModalUI>

      <ModalUI {...modalSuccessProp}>
        <div className="text-center">
          <div className="p-10">
            <h1 className="text-white mb-10">Task has been added successfully</h1>
          </div>
          <div className="flex py-4 md:py-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={onCloseSuccessModal}
            >
              Return
            </button>
          </div>
        </div>
      </ModalUI>
    </div>
  );
}
