import axios from "axios";
import { load } from "cheerio";

export const formatResponse = (userID, json) => {
  const username = json.author.identifier.value;
  const imageList = json.author.image;
  const result = {
    id: userID,
    username: username,
    image: imageList,
  };
  return result;
};

export const fetchuserJson = async (userID) => {
  const instauserUrl = `https://www.instagram.com/${userID}`;
  const response = await axios.get(instauserUrl);
  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");
  if (jsonElement.length === 0) {
    throw Error(`This user does not exist or is private`);
  }
  const jsonText = jsonElement.text();
  const json = JSON.parse(jsonText);
  return json;
};
