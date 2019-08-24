// Action types
export const GET_BLOG = 'GET_BLOG';

// Events
export const GET_EVENTS_ALL = 'GET_EVENTS_ALL'; //Used for both public and logged in data
export const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT';

// Auth
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const GET_MY_USER_DATA = 'GET_MY_USER_DATA';

// Fav Events
export const SET_MY_FAV_EVENTS = 'GET_MY_FAV_EVENTS';
export const ADD_FAV_EVENT = 'ADD_FAV_EVENT';
export const REMOVE_FAV_EVENT = 'REMOVE_FAV_EVENT';

// My Events and Booking
export const SET_MY_EVENTS = 'GET_MY_EVENTS';
export const BOOK_ME_INTO_GAME = 'BOOK_ME_INTO_GAME';
export const REMOVE_ME_FROM_GAME = 'REMOVE_ME_FROM_GAME';
export const SET_MY_AVAILABLE_GAME_SLOTS = 'SET_MY_AVAILABLE_GAME_SLOTS';