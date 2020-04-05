import { randomId } from "../utils/utils";

export const setRecordStore = val => {
  window.localStorage.setItem("recordScore", val);
};

export const getRecordScore = () => {
  return window.localStorage.getItem("recordScore");
};

export const setLastScore = val => {
  window.localStorage.setItem("lastScore", val);
};

export const getLastScore = () => {
  return window.localStorage.getItem("lastScore");
};

export const setIsMuted = val => {
  window.localStorage.setItem("isMuted", val);
};

export const getIsMuted = () => {
  return (
    window.localStorage.getItem("isMuted") === "true" ||
    window.localStorage.getItem("isMuted") == undefined
  );
};

export const setUsername = value => {
  window.localStorage.setItem("usernameId", randomId());
  window.localStorage.setItem("username", value);
};

export const getUsername = () => {
  return window.localStorage.getItem("username");
};

export const getUsernameId = () => {
  return window.localStorage.getItem("usernameId");
};
