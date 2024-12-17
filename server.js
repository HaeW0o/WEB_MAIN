const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 추천 맛집 데이터 예시 (맛집 이름과 웹사이트 URL을 포함)
const restaurantSuggestions = [
  { name: "맛있는 집", website: "https://www.deliciousrestaurant.com" },
  { name: "서울의 맛", website: "https://www.seoulfood.com" },
  { name: "오마이식당", website: "https://www.omaisikdang.com" },
  { name: "이태원의 맛집", website: "https://www.itaewonfood.com" },
  // 추가적인 맛집 데이터를 넣을 수 있습니다.
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "메시지를 입력해주세요." });
    }

    try {
        let responseMessage = "";

        if (message.includes("맛집") || message.includes("추천")) {
            // 랜덤 맛집 추천
            const randomRestaurant = restaurantSuggestions[Math.floor(Math.random() * restaurantSuggestions.length)];
            responseMessage = `추천 맛집: ${randomRestaurant.name}\n웹사이트: ${randomRestaurant.website}`;
        } else {
            // OpenAI API 호출
            const aiResponse = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: message }],
            });

            responseMessage = aiResponse.choices[0].message.content;
        }

        res.json({ answer: responseMessage });
    } catch (error) {
        console.error("오류 발생:", error.message);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
 