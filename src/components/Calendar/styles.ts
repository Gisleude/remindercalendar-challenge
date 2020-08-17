import styled from 'styled-components';

import { darken } from 'polished';

export const Reminder = styled.button`
  color: #111;
  display: flex;
  font-size: 15px;
  align-items: center;
  border: 0px;
  border-radius: 4px;
  height: 24px;
  width: 100%;
  background: #77d97e;
  transition: 0.5s;
  padding-left: 4px;
  margin-top: 25px;
  color: #222;

  & + & {
    margin-top: 2px;
  }

  &:hover {
    background: ${darken(0.2, '#77d97e')};
  }

  .reminder-hour {
    margin-right: 10px;
    padding-right: 5px;
    border-right: 1px solid #444;
  }

  .reminder-desc {
    padding-right: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  img {
    float: right;
    width: 27px;
  }
`;

export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  color: #bbb;

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fefefe;
    align-items: center;
    margin: auto;
    margin-top: 10%;
    padding: 20px;
    background-color: #182842;
    border: 1px solid #888;
    border-radius: 10px;
    width: 20%;
    text-align: center;
    justify-content: center;

    input {
      border: 0px;
      border-radius: 8px;
    }

    textarea {
      border: 0px;
      border-radius: 8px;
      resize: none;
    }
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  p {
    font-size: 20px;

    margin: 10px 0px;
  }

  input,
  textarea {
    width: 100%;
    padding: 5px;
  }
`;

export const SaveButton = styled.button`
  margin-top: 20px;
  border-radius: 8px;
  width: 100px;
  padding: 10px;
  background: #11a616;
  color: #fff;
  font-size: 20px;
  border: 0px;
  transition: 0.5s;

  &:hover {
    background: ${darken(0.2, '#11a616')};
  }
`;

export const CancelButton = styled.button`
  margin-top: 20px;
  border-radius: 8px;
  width: 100px;
  padding: 10px;
  background: #f22c2c;
  color: #fff;
  font-size: 20px;
  border: 0px;
  transition: 0.5s;

  &:hover {
    background: ${darken(0.2, '#f22c2c')};
  }
`;

export const AddReminderButton = styled.button`
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  border: 0px;
  background: transparent;
`;

export const Row = styled.div`
  .cell {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff9900;
  }
`;
