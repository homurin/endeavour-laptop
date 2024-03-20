import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

export async function getMany(page: number = 1, show: number = 10) {
  try {
    const getData = await axios.get(`http://127.0.0.1:5000/api/v1/laptops`, {
      params: { page, show },
    });
    const data = getData.data;
    return data.laptops;
  } catch (err) {
    console.info(err);
  }
}
