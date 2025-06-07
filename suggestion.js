document.addEventListener('DOMContentLoaded', () => {
  const suggestionBtn = document.getElementById('suggestion-btn');
  const popup = document.getElementById('suggestion-popup');
  const closeBtn = document.getElementById('close-suggestion');
  const form = document.getElementById('suggestion-form');
  const pseudo = document.getElementById('suggestion-pseudo');
  const textarea = document.getElementById('suggestion-text');
  const result = document.getElementById('suggestion-result');
  const webhook = "https://discord.com/api/webhooks/1380538765008830535/oz5a9sTM2hnCv_cCXM7iH8lIG_HPeYVGuWw5x4rvg58ORTFWlTWAcSyAFmeP1MR3lcP6";

  // Ouvre le popup
  suggestionBtn.onclick = () => {
    popup.classList.add('open');
    pseudo.value = "";
    textarea.value = "";
    result.style.display = "none";
    pseudo.focus();
  };

  // Ferme le popup
  closeBtn.onclick = () => {
    popup.classList.remove('open');
    form.reset();
  };

  // Envoi de la suggestion
  form.onsubmit = async (e) => {
    e.preventDefault();
    const pseudoVal = pseudo.value.trim();
    const text = textarea.value.trim();
    if (pseudoVal.length < 2 || text.length < 3) {
      result.textContent = "Merci de remplir tous les champs correctement !";
      result.style.color = "#e53935";
      result.style.display = "block";
      return;
    }
    if (/@everyone|@here/i.test(text)) {
      result.textContent = "J'ai pensé à tout fdp :DD";
      result.style.color = "#e53935";
      result.style.display = "block";
      // Récupère l'IP et l'affiche en dessous
      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(data => {
          result.innerHTML += `<br><span style="color:#ffe0a3;">Pour la peine, voici ton ip : ${data.ip} (oui)</span>`;
        });
      return;
    }
    result.textContent = "Envoi...";
    result.style.color = "#ffe0a3";
    result.style.display = "block";
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `💡 **Suggestion de ${pseudoVal}** \n\n- "${text}"`})
      });
      result.textContent = "Suggestion envoyée. Merci ! 🙏";
      result.style.color = "#ffe0a3";
      setTimeout(() => {
        popup.classList.remove('open');
        form.reset();
        result.style.display = "none";
      }, 1200);
    } catch {
      result.textContent = "Erreur lors de l'envoi.";
      result.style.color = "#e53935";
    }
  };
});