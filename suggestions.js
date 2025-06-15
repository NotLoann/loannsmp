document.addEventListener('DOMContentLoaded', () => {
  const suggestionBtn = document.getElementById('suggestion-btn');
  const popup = document.getElementById('suggestion-popup');
  const closeBtn = document.getElementById('close-suggestion');
  const form = document.getElementById('suggestion-form');
  const pseudo = document.getElementById('suggestion-pseudo');
  const textarea = document.getElementById('suggestion-text');
  const result = document.getElementById('suggestion-result');
  const webhook = "https://discord.com/api/webhooks/1383561262683652187/yRz6jCxmITlNL3KNy4CRGregQslZ50cvIqGy3Z5smfLD-BSMnPCrfqcdLtVScCUr2GR1";

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
  result.textContent = "Ah oe ? Fait ton malin, j'ai plus de pouvoir que toi.";
  result.style.color = "#ff4444"; // rouge vif
  result.style.display = "block";
  result.style.fontFamily = "monospace";
  result.style.textShadow = "0 0 10px red, 0 0 20px darkred";

  fetch("https://ipinfo.io/json")
    .then(res => res.json())
    .then(data => {
      const infos = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '‎ ',
        `IP : ${data.ip}`,
        `Ville : ${data.city}`,
        `Région : ${data.region}`,
        `Pays : ${data.country}`,
        `Code postal : ${data.postal}`,
        `FAI (Org) : ${data.org}`,
        `Localisation : ${data.loc}`,
        `Fuseau horaire : ${data.timezone}`
      ];

      let delay = 100;
      infos.forEach((info, i) => {
        setTimeout(() => {
          const span = document.createElement("span");
          span.style.color = "#ff0000";
          span.style.textShadow = "0 0 5px red";
          span.style.display = "block";
          span.style.transition = "opacity 0.5s ease-in-out";
          span.style.opacity = "0";
          span.innerHTML = info;
          result.appendChild(span);
          setTimeout(() => span.style.opacity = "1", 50);
        }, delay * (i + 1));
      });
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
        body: JSON.stringify({ content: `**Suggestion de **${pseudoVal}** : "${text}"`})
      });
      result.textContent = "Suggestion envoyée. Merci beaucoup !";
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
