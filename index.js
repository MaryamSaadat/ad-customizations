const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const OpenAI = require("openai");
const apiKey= process.env.GPT_API_KEY;

app.get("/", (req, res) => {
    res.send("Welcome to my Node.js backend!");
  });

app.get("/speech", (req, res) => {
    const apiBody = {
    model: "tts-1",
    input: req.query.textToConvert,
    voice: "alloy",
  };
    const options = {
                url:"https://api.openai.com/v1/audio/speech",
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + apiKey,
                },
                responseType: "arraybuffer",
                data: JSON.stringify(apiBody)
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        // console.log("My response:", response.data)
    }).catch((error) => {
        console.log(error)
    })

});


app.listen(8000, () => console.log(`Server is running on port ${PORT}`));



// const PORT = 8000;
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();

// app.use(cors());

// const OpenAI = require("openai");
// const openai = new OpenAI({
//   apiKey: process.env.GPT_API_KEY,
// });

// app.get("/", (req, res) => {
//   res.json("hi");
// });

// app.get("/speech", async (req, res) => {
//   console.log("Speech synthesis initializing.", req);
//   try {
//     console.log("Speech synthesis initializing.");
//     const mp3 = await openai.audio.speech
//       .create({
//         model: "tts-1",
//         voice: "onyx",
//         input: "my text is this",
//       })
//       .then((data) => {
//         console.log("Speech synthesis complete.",data);
//       });
//   } catch (error) {
//     console.log("Speech synthesis failed.");
//     console.error(error);
//   }
// });

// app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
