import consumer from "./consumer"

consumer.subscriptions.create("TopSearchesChannel", {
  received(data) {
    const topSearchesContainer = document.querySelector("[data-search-target='topSearches']");

    if (topSearchesContainer && Array.isArray(data.queries)) {
      topSearchesContainer.innerHTML = "";

      data.queries.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.query} (${item.count})`;
        li.style.padding = "8px";
        li.style.marginBottom = "4px";
        li.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        topSearchesContainer.appendChild(li);
      });
    }
  }
});
