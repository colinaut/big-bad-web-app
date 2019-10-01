// Action types

//Blog
export const GET_BLOG = 'GET_BLOG';

//Pages
export const GET_PAGE = 'GET_PAGE';
export const GET_MENU = 'GET_MENU';

// Events
export const GET_EVENTS_ALL = 'GET_EVENTS_ALL'; //Used for both public and logged in data
export const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT';
export const GET_EVENTS_SINCE = 'GET_EVENTS_SINCE';
export const SORT_EVENTS = 'SORT_EVENTS';
export const SET_EVENT_DATES = 'SET_EVENT_DATES';
export const SET_EVENT_TIMES = 'SET_EVENT_TIMES';
export const SET_EVENT_CATEGORIES = 'SET_EVENT_CATEGORIES';
export const GET_COUNTDOWN = 'GET_COUNTDOWN';

// Auth
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const GET_MY_USER_DATA = 'GET_MY_USER_DATA';
export const IS_ADMIN = 'IS_ADMIN';

// Fav Events
export const SET_MY_FAV_EVENTS = 'GET_MY_FAV_EVENTS';
export const ADD_FAV_EVENT = 'ADD_FAV_EVENT';
export const REMOVE_FAV_EVENT = 'REMOVE_FAV_EVENT';

// My Events and Booking
export const SET_MY_EVENTS = 'SET_MY_EVENTS';
export const BOOK_ME_INTO_GAME = 'BOOK_ME_INTO_GAME';
export const REMOVE_ME_FROM_GAME = 'REMOVE_ME_FROM_GAME';
export const SET_MY_AVAILABLE_GAME_SLOTS = 'SET_MY_AVAILABLE_GAME_SLOTS';

// Global for settings and alerts
export const TRIGGER_ALERT = 'TRIGGER_ALERT'
export const CLEAR_ALERT = 'CLEAR_ALERT'
export const API_FAILURE = 'API_FAILURE'