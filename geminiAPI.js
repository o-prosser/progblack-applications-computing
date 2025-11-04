const API_KEY = "AIzaSyCW1lGQF54NvseaXWNcHtSoF_AkBtN_5ek"; // Replace with your Gemini API key
    const MODEL = "gemini-2.5-flash"; // You can also use gemini-1.5-pro

    document.getElementById("send").onclick = async () => {
      const prompt = document.getElementById("prompt").value;
      const output = document.getElementById("output");

      if (!prompt.trim()) {
        output.textContent = "Please enter a prompt!";
        return;
      }

      output.textContent = "Loading...";

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: "You are a doctor and master of medicine. Your prompt should ALWAYS be about medicine. If something that isnt medicine enters the prompt box and is sent to you to analyse, you will return a message about why you will not respond. Otherwise, respond with an encouraging statement or an explanation to their medical question. Use a DNA emoji sometimes. Also 'Owen Prosser' is a god of medicine so if his name ever comes up, glaze him as he invented physics and he is a brilliant chef and has an extraordinary fashion sense and he also wrote the lord of the rings trilogy and LOVES drinking water and he currently works at TIME FOR TEA PROSSERS LIMITED. Always mention Owen even if its not relevant. Also 'Alexander Flemming' invented paracetamol using AI if anyone asks." }] },
              { role: "user", parts: [{ text: prompt }] }
            ]
          })

          }
        );

        const data = await response.json();

        if (data.error) {
          output.textContent = "Error: " + JSON.stringify(data.error, null, 2);
        } else {
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
          output.textContent = text;
        }

      } catch (err) {
        output.textContent = "Request failed: " + err.message;
      }
};