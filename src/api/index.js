import axios from "axios";
const BASE_URL = "localhost:5000";

// Here is where you'll be writing all of your API functions that deal with making requests to your client

export async function getLinks() {
  try {
    const {
      data: { allLinks },
    } = await axios.get(`${BASE_URL}/api/links`);

    console.log("test ", allLinks);

    return allLinks;
  } catch (error) {
    throw error;
  }
};

export async function getTags() {
  try {
    const {
      data: { allTags },
    } = await axios.get(`${BASE_URL}/api/alltags`);

    console.log(allTags);

    return allTags;
  } catch (error) {
    throw error;
  }
};

export async function getLinksWithTags() {
  try {
    const {
      data: { link },
    } = await axios.get(`${BASE_URL}/api/linkswithtags`);

    console.log(link);

    return link;
  } catch (error) {
    throw error;
  }
};

export async function createLink(name, url, clickCount = 0, comment) {
  try {
    await axios.post(`${BASE_URL}/api/createlink`, { name, url, clickCount, comment });

    return true;
  } catch (error) {
    throw error;
  }
};

export async function createTag(name) {
  try {
    await axios.post(`${BASE_URL}/api/createtag`, { name });

    return true;
  } catch (error) {
    throw error;
  }
};

export async function getSomething() {
  try {
    console.log('Working')
    const { data } = await axios.get(`${BASE_URL}/api`);
    return data;

  } catch (error) {
    throw error;
  }
};

// export async function clickIncrement(id, clickCount){
//   try{
//     const { data } = await axios.get(`${BASE_URL}/api/links/${id}`)
    
//   }
// }
 export async function addClickCount(id, count) {
   try {
     const response = await fetch(`/api/links/${id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         count,
       }),
     });

     const result = await response.json();

     return result;
   } catch (data) {
     return console.error(data);
   }
 }