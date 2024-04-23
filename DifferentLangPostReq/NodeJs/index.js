const axios = require("axios");

const url = "https://dev.29kreativ.com/recruitment/levels/";

const code = "8fc95a69adbc08a22bb90e19e66b389d";

const formData = new FormData();
formData.append("name", "Tushar");
formData.append("code", code);

const headers = {
  Authorization: `Bearer ${code}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios
  .post(url, formData, { headers })
  .then((response) => {
    console.log("Response code:", response.status);
    console.log("Response body:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
