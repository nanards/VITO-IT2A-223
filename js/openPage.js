function openPage() {
    var input = document.getElementById("search").value;

    if (input === "bullet heaven") {
        location.replace("/Game1.html");
    }

    else if (input === "ripoff limbo") {
        location.replace("/Game2.html");
    }

    else if (input === "breaker ball") {
        location.replace("/Game3.html");
    }

    else {
        location.replace("/Blank.html");
    }
}