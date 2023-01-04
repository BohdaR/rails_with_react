import axios from "axios";
import style from "../../stylesheets/booking.module.css";

export const get = async (url, config) => {
  return await axios.get(url, config);
}

export const post = async (url, body, config) => {
  return await axios.post(url, body, config);
}

export const put = async (url, body, config) => {
  return await axios.put(url, body, config);
}

export const deleteRequest = async (url, config) => {
  return await axios.delete(url, config);
}

export const bookPlace = async (token, start_at, end_at, placeId) => {

  await post(`${process.env.HOST}/reservations`, {
    authenticity_token: token,
    reservation: {
      start_at: start_at,
      end_at: end_at,
      place_id: placeId
    }
  })
}
