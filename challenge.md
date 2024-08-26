# Technical Exercise: Rate-Limited Notification Service

**Hi Thiago!**

It was great to catch up, I'm sending you our technical exercise. 

Please find below the technical exercise; take your time to go through it carefully and make sure you understand all the requirements. 

Please share the repository link containing the application source code when finished, and let us know to schedule the meeting to review the app. Thanks for your participation and effort in this exercise. We're excited to see your work!

Best,  
Dani

---

## [Backend] Rate-Limited Notification Service

We have a Notification system that sends out email notifications of various types (status update, daily news, project invitations, etc). We need to protect recipients from getting too many emails, either due to system errors or due to abuse, so let’s limit the number of emails sent to them by implementing a rate-limited version of `NotificationService`.  
The system must reject requests that are over the limit.

### Sample Notification Types and Rate Limit Rules

- **Status**: Not more than 2 per minute for each recipient.
- **News**: Not more than 1 per day for each recipient.
- **Marketing**: Not more than 3 per hour for each recipient.

*Note*: These are just samples; the system might have several rate limit rules!

### Notes

- Your solution will be evaluated on code quality, clarity, and development best practices.
- Take into account that this is the initial assessment of the work quality that you can produce in a productive environment, so show your best face.
- Feel free to use the programming language, frameworks, technologies, etc., that you feel more comfortable with.
- Below you'll find a code snippet that can serve as a guidance of one of the implementation alternatives in Java. Feel free to use it if you find it useful or ignore it otherwise; it is not required to use it at all nor translate this code to your programming language.

Please share with us the link of the repository containing the application source code when finished and let us know to schedule the meeting to review the app.  
Feel free to ping me with any questions you might have about this technical assessment.

---

### Code Snippet Sample (Java)

```java
/*
 * Click `Run` to execute the snippet below!
 */
import java.io.*;
import java.util.*;

class Solution {
    public static void main(String[] args) {
        NotificationServiceImpl service = new NotificationServiceImpl(new Gateway());
        service.send("news", "user", "news 1");
        service.send("news", "user", "news 2");
        service.send("news", "user", "news 3");
        service.send("news", "another user", "news 1");
        service.send("update", "user", "update 1");
    }
}

interface NotificationService {
    void send(String type, String userId, String message);
}

class NotificationServiceImpl implements NotificationService {
    private Gateway gateway;

    public NotificationServiceImpl(Gateway gateway) {
        this.gateway = gateway;
    }

    // TASK: IMPLEMENT this
    @Override
    public void send(String type, String userId, String message) {
        throw new RuntimeException("not implemented - fix this");
    }
}

class Gateway {
    /* already implemented */
    void send(String userId, String message) {
        System.out.println("sending message to user " + userId);
    }
}