export function WebNotif(title, message) {
    if (!window.Notification) {
        console.log("Browser does not support notifications.");
    } else {
        // check if permission is already granted
        if (Notification.permission === "granted") {
            // show notification here
            new Notification(title, {
                body: message,
                // icon: "https://bit.ly/2DYqRrh",
            });
        } else {
            // request permission from user
            Notification.requestPermission()
                .then(function (p) {
                    if (p === "granted") {
                        // show notification here
                        new Notification(title, {
                            body: message,
                            // icon: "https://bit.ly/2DYqRrh",
                        });
                    } else {
                        console.log("User blocked notifications.");
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }
}
