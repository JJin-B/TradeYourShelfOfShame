import axios, { AxiosResponse } from "axios";
import XMLParser from "react-xml-parser";

interface BggItem {
  attributes: { id: string };
  children: [
    { name: "name"; attributes: { value: string } },
    { name: "yearpublished"; attributes: { value: string } }?
  ];
}

interface BggResponse {
  children: BggItem[];
}

const fetchBggData = async (query: string): Promise<BggResponse | null> => {
  const apiUrl = `https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`;

  try {
    const response: AxiosResponse<string> = await axios.get(apiUrl);
    const xmlData = response.data;
    const jsonData = await new XMLParser().parseFromString(xmlData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data from BGG API:", error);
    return null;
  }
};

export default fetchBggData;
