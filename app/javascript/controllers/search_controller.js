import { Controller } from "@hotwired/stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = ["input", "topSearches"];

  connect() {
    this.loadTopSearches();

    this.subscription = consumer.subscriptions.create("TopSearchesChannel", {
      received: (data) => {
        this.animateUpdate(data.queries);
      }
    });

    this.inputTarget.addEventListener("focus", () => this.loadRecentQueries());
    this.inputTarget.addEventListener("input", () => this.loadRecentQueries());
  }

  disconnect() {
    if (this.subscription) {
      consumer.subscriptions.remove(this.subscription);
    }
  }

  submitSearch() {
    const query = this.inputTarget.value.trim();
    if (query.length < 3) return;

    this.sendQuery(query);
  }

  sendQuery(query) {
    fetch("/search_queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
      },
      body: JSON.stringify({ query })
    });
  }

  loadTopSearches() {
    fetch("/search_queries/top")
      .then(response => response.json())
      .then(data => {
        this.animateUpdate(data);
      });
  }

  animateUpdate(data) {
    const newList = document.createElement("ul");
    newList.style.listStyle = "none";
    newList.style.paddingLeft = "0";

    data.forEach((item) => {
      const li = document.createElement("li");
      li.dataset.query = item.query;
      li.textContent = `${item.query} (${item.count})`;
      li.style.padding = "8px";
      li.style.marginBottom = "4px";
      li.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      newList.appendChild(li);
    });

    const oldList = this.topSearchesTarget;
    oldList.replaceChildren(...newList.children);
  }

  loadRecentQueries() {
    fetch("/search_queries/recent")
      .then(response => response.json())
      .then(data => {
        const dropdown = document.getElementById("dropdown");
        dropdown.innerHTML = "";

        if (data.length === 0) {
          dropdown.style.display = "none";
          return;
        }

        data.forEach((query) => {
          const li = document.createElement("li");
          li.textContent = query;
          li.addEventListener("click", () => {
            this.inputTarget.value = query;
            dropdown.style.display = "none";
          });
          dropdown.appendChild(li);
        });

        dropdown.style.display = "block";
      });
  }
}
