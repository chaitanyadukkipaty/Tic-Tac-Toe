import axios from "axios";
import { baseUrl } from "../../config.json";

export async function placeBid({ payload }) {
  const { data } = await axios.post(`${baseUrl}/bid`, payload);
  return { data };
}

export async function placeMove({ payload }) {
  const { data } = await axios.post(`${baseUrl}/symbolPlaced`, payload);
  return { data };
}

export async function getPlayers({ payload }) {
  const { data } = await axios.post(`${baseUrl}/getPlayers`, payload);
  const {players} = data;
  return { players };
}