
class WebSocketService {


  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(cardId) {
    const path = `ws://127.0.0.1:8000/ws/comment/${cardId}/`;
    console.log(path);
    this.socketRef = new WebSocket(path);
    console.log("hi here in down")
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketNewMessage(
      JSON.stringify({
        command: "getComments",
      })
    );
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "comment") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "newComment") {
      this.callbacks[command](parsedData.comment);
    }
    if (command === "deleteComment") {
      this.callbacks[command](parsedData.commentId);
    }
  }

  fetchMessages(cardId) {
    this.sendMessage({
      command: "getComments",
      cardId: cardId
    });
  }

  newChatMessage(comment) {
    this.sendMessage({
      command: "newComment",
      commentBy: comment.commented_by ,
      commentDesc: comment.comment_desc ,
      chatId: comment.comment_mapped_to
    });
  }
  deleteMessage(commentId) {
    this.sendMessage({
      command: "deleteComment",
      commentId: commentId,
    });
  }
  addCallbacks(messagesCallback, newMessageCallback,deleteMessageCallback) {
    this.callbacks["comment"] = messagesCallback;
    this.callbacks["newComment"] = newMessageCallback;
    this.callbacks["deleteComment"] =deleteMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;