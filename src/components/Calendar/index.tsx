import React, { useState } from 'react';

import { sortBy } from 'lodash';

import { FiPlusCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  format,
  parse,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isEqual,
} from 'date-fns';

import './styles.css';

import { Form } from '@unform/web';
import { ColorResult } from 'react-color';
import ColorPicker from '../ColorPicker';

import {
  Reminder,
  Modal,
  SaveButton,
  CancelButton,
  AddReminderButton,
} from './styles';
import Input from '../Input';
import Textarea from '../Textarea';

import getResponseFromAPI from '../../services/api';

interface IFormProps {
  date: string;
  time: string;
  city: string;
  description: string;
  color: string;
  weather: string;
}

interface ModalProps {
  id: string;
}

const Calendar: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [state, setState] = useState({
    currentMonth: new Date(),
    selectedDate: new Date(),
  });

  const [reminder, setReminder] = useState([] as IFormProps[]);

  const [editReminder, setEditReminder] = useState({
    date: '',
    time: '',
    city: '',
    description: '',
    color: '',
    weather: '',
  });

  function renderHeader() {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            <FiArrowLeft size={25} />
          </div>
        </div>
        <div className="col col-center">
          <span>{format(state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">
            <FiArrowRight size={25} />
          </div>
        </div>
      </div>
    );
  }

  function renderDays() {
    const dateFormat = 'EEEE';
    const days = [];
    const startDate = startOfWeek(state.currentMonth);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }
    return <div className="days row">{days}</div>;
  }

  function renderCells() {
    const { currentMonth, selectedDate } = state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let formattedId = '';
    const reminderSorted = sortBy(reminder, item => {
      return item.time;
    });

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = format(day, dateFormat);
        formattedId = format(day, 'yyyy-MM-dd');
        days.push(
          <div
            id={`${formattedId} `}
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={String(day)}
          >
            {' '}
            {reminderSorted.map(item => {
              if (
                isEqual(
                  parse(formattedId, 'yyyy-MM-dd', new Date()),
                  parse(item.date, 'yyyy-MM-dd', new Date()),
                )
              ) {
                const reminderStyle = {
                  backgroundColor: item.color,
                };
                return (
                  <Reminder
                    id={`${item.date} ${item.time}`}
                    onClick={() => openModal(`${item.date} ${item.time}`)}
                    style={reminderStyle}
                  >
                    <b className="reminder-hour">{item.time}</b>
                    <p className="reminder-desc">{item.description}</p>
                    <img src={item.weather} alt="" />
                  </Reminder>
                );
              }
              return undefined;
            })}
            <span className="number">{formattedDate}</span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={String(day)}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  function handleUpdateReminder(dataToUpdate: IFormProps) {
    const newReminder = reminder.filter(
      item =>
        item.date !== dataToUpdate.date || item.time !== dataToUpdate.time,
    );

    setReminder([...newReminder, dataToUpdate]);

    renderCells();
  }

  async function openModal(data?: string) {
    const modal = document.getElementById('modal');

    const dateInput = document.getElementById('date') as HTMLInputElement;
    const timeInput = document.getElementById('time') as HTMLInputElement;
    const cityInput = document.getElementById('city') as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'description',
    ) as HTMLInputElement;

    if (data) {
      const [updateDate, updateTime] = data.split(' ');

      const reminderToUpdate = reminder.find(
        item => item.time === updateTime && item.date === updateDate,
      );

      if (reminderToUpdate) {
        setIsUpdate(true);

        if (dateInput) {
          dateInput.value = reminderToUpdate.date;
        }
        if (timeInput) {
          timeInput.value = reminderToUpdate.time;
        }
        if (cityInput) {
          cityInput.value = reminderToUpdate.city;
        }
        if (descriptionInput) {
          descriptionInput.value = reminderToUpdate.description;
        }

        const newReminder = reminder.filter(
          item =>
            item.date !== reminderToUpdate.date ||
            item.time !== reminderToUpdate.time,
        );

        setReminder([...newReminder]);

        renderCells();
      }
    } else {
      setIsUpdate(false);
      if (dateInput) {
        dateInput.value = '';
      }
      if (timeInput) {
        timeInput.value = '';
      }
      if (cityInput) {
        cityInput.value = '';
      }
      if (descriptionInput) {
        descriptionInput.value = '';
      }
    }
    if (modal) {
      modal.style.display = 'block';
    }
  }

  function handleAddReminder() {
    setState({
      ...state,
    });

    openModal();
  }

  function nextMonth() {
    setState({
      ...state,
      currentMonth: addMonths(state.currentMonth, 1),
    });
  }

  function prevMonth() {
    setState({
      ...state,
      currentMonth: subMonths(state.currentMonth, 1),
    });
  }

  function closeModal() {
    const modal = document.getElementById('modal');

    if (modal) {
      modal.style.display = 'none';
    }

    setEditReminder({
      city: '',
      color: '',
      date: '',
      description: '',
      time: '',
      weather: '',
    });
  }

  function handleCreateReminder(data: IFormProps) {
    setReminder([...reminder, data]);

    renderCells();
  }

  async function handleSubmit(data: IFormProps) {
    if (data) {
      const response = await getResponseFromAPI(data.city, data.date);

      const weather = response.data.forecast.forecastday[0].day.condition
        .icon as string;

      const dataAlreadyExists = reminder.find(
        item => item.date === data.date && item.time === data.time,
      );

      data.weather = weather;

      setEditReminder({
        ...editReminder,
        color: data.color,
        city: data.city,
        date: data.date,
        description: data.description,
        time: data.time,
        weather,
      });

      if (dataAlreadyExists) {
        handleUpdateReminder(data);
      } else {
        handleCreateReminder(data);
      }

      closeModal();
    }
  }

  function handleChangeComplete(color: ColorResult) {
    const colorField = document.getElementById('color');
    if (colorField) {
      colorField.setAttribute('value', color.hex);
    }
  }

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <Modal id="modal">
        <div id="modal-content" className="modal-content">
          <Form onSubmit={handleSubmit}>
            <p>Date</p>
            <Input id="date" name="date" type="date" required />
            <p>Time</p>
            <Input id="time" name="time" type="time" required />
            <p>City</p>
            <Input id="city" name="city" type="text" required />
            <p>Reminder</p>
            <Textarea
              id="description"
              name="description"
              maxLength={30}
              rows={4}
            />
            <p>Label color</p>
            <ColorPicker
              name="color-picker"
              className="color-picker"
              color={editReminder.color}
              onChangeComplete={handleChangeComplete}
            />
            <Input id="color" name="color" type="text" hidden />

            <SaveButton type="submit">Save</SaveButton>
          </Form>
          <CancelButton onClick={closeModal}>
            {isUpdate ? 'Delete' : 'Cancel'}
          </CancelButton>
        </div>
      </Modal>

      <AddReminderButton onClick={handleAddReminder}>
        <FiPlusCircle size={60} color="#ddd" />
      </AddReminderButton>
    </div>
  );
};

export default Calendar;
