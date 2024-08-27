import { expect, it, describe, vi } from "vitest";
import { NotificationGateway } from "./notification.gateway";

describe("notification gateway", () => {
  const sut: NotificationGateway = new NotificationGateway();

  it("should sends a notification", async () => {
    const userID = "user123";
    const message = "Hello, World!";
    const consoleLogSpy = vi.spyOn(console, "log");

    await sut.send(userID, message);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Sending message to user ${userID}: ${message}`
    );
  });
});
