const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UPDATE_USER_PASSWORD = `${BASE_URL}update-password`;
export const CHANGE_USER_PASSWORD = `${BASE_URL}create-password`;
export const GET_USER = `${BASE_URL}user`;
export const GET_ITEMS = `${BASE_URL}dashboard`;
export const CREATE_USER = `${BASE_URL}user/create`;
export const GET_MACHINE = `${BASE_URL}machine`;
export const POST_MACHINE = `${BASE_URL}machine`;
export const POST_SCAN = `${BASE_URL}scan`;
export const PUT_MACHINE = `${BASE_URL}machine`;
export const GET_CREDIT_COUNT = `${BASE_URL}credit/count`;
export const POST_DEDUCT_COUNT = `${BASE_URL}credit/deduct`;
export const GET_MACHINE_USER = `${BASE_URL}machine/list?limit=10&&page=1`;


