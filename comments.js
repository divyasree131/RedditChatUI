class App {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.db = [
      { id: 1, text: "root text 1", parentId: null },
      { id: 2, text: "root text 2", parentId: null },
      { id: 3, text: "reply to root text 1", parentId: 1 },
      { id: 4, text: "reply to 1st", parentId: 1 },
      { id: 4, text: "cool", parentId: 3 },
    ];
    this.render();
  }

  getReplies(id) {
    return this.db.filter((e) => e.parentId === id);
  }
  getParents() {
    return this.db.filter((e) => e.parentId === null);
  }
  constructTree(data) {
    //1 create a comment
    //2 render its replies
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList.add("message-container");
    for (const comment of data) {
      const p = document.createElement("p");
      p.classList.add("message");
      p.innerText = comment.text;

      const isReply = comment.parentId;
      if (isReply) {
        const span = document.createElement("span");
        span.classList.add("arrow");
        div.appendChild(span);
      }
      div.appendChild(p);
      const button = document.createElement("button");
      button.innerText = "Reply";
      button.addEventListener("click", () => {
        const replytext = prompt(`enter reply to ${comment.text}`);
        const entry = {
          id: Date.now(),
          text: replytext,
          parentId: comment.id,
        };
        this.db.push(entry);
        this.render();
      });
      div.appendChild(button);
      const replies = this.getReplies(comment.id);
      const subtree = this.constructTree(replies);

      div.appendChild(subtree);
    }
    fragment.appendChild(div);
    return fragment;
  }

  render() {
    this.root.innerHTML = "";
    const tree = this.constructTree(this.getParents());
    this.root.appendChild(tree);
  }
}

new App("#root");
