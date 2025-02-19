import { Card, Empty } from "antd";
import {Chat, ContactList} from "react-jwchat";
import ChatList from "./components/ChatList/ChatList"
import ChatDetail from "./components/ChatDetail/ChatDetail";
export default () => (
  <Card style={{ minHeight: "500px" }}>
    <div style={{ display: "flex" }}>
      <ChatList></ChatList>
      <ChatDetail></ChatDetail>
    </div>
  </Card>
);
