export default async function handler(req, res) {
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API 키가 설정되지 않았습니다." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "응답 오류" });
  } catch (error) {
    res.status(500).json({ error: "오류 발생: " + error.message });
  }
}