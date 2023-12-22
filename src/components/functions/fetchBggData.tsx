import axios, { AxiosResponse } from 'axios';
import XMLParser from 'react-xml-parser';

interface BggItem {
  name: { type: string; value: string };
  yearpublished: { value: string };
}

interface BggResponse {
  items: { item: BggItem[] };
}

const fetchBggData = async (query: string): Promise<BggResponse | null> => {
  const apiUrl = `https://boardgamegeek.com/xmlapi2/search?query=${query}`;

  try {
    const response: AxiosResponse<string> = await axios.get(apiUrl);
    const xmlData = response.data;
    const jsonData = new XMLParser().parseFromString(xmlData)
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error('Error fetching data from BGG API:', error);
    return null;
  }
};

export default fetchBggData;
