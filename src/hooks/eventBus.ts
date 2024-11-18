// eventBus.ts
import mitt from "mitt";

interface WebSocketDataType {
  project_uuid: string;
  project_name: string;
  issue_data: object;
}

export type Events = {
  newIssueNotification: WebSocketDataType;
};

export const eventBus = mitt<Events>();
