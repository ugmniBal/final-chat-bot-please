const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage("user", userInput);
  input.value = "";

  appendMessage("bot", "GPT 응답 중...");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await res.json();
  chatBox.lastChild.textContent = data.reply || "GPT 응답 오류";
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}