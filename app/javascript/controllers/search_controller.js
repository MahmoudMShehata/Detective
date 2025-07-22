import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"];

  connect() {
    this.timer = null;
    this.lastSubmitted = "";
  }

  trackTyping(event) {
    const query = this.inputTarget.value.trim();

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      if (query.length < 3 || query === this.lastSubmitted) return;

      this.lastSubmitted = query;

      this.sendQuery(query);
    }, 500);
  }

  trackClick(event) {
    const query = this.inputTarget.value.trim();

    if (query.length === 0 || query === this.lastSubmitted) return;

    this.lastSubmitted = query;

    this.sendQuery(query);
  }

  sendQuery(query) {
    fetch("/search_queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
      },
      body: JSON.stringify({ query: query })
    });
  }
}
