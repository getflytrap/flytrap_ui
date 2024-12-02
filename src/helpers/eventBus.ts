import mitt from "mitt";
import { WebSocketDataType } from "../types";

export type Events = {
  newIssueNotification: WebSocketDataType;
};

export const eventBus = mitt<Events>();
