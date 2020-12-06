async function loadContent() {
    dataJSON = undefined;
    didntWorkErrorMessage = `<div class="container"><h1 style="font-size:70px;">Uh oh!</h1><br>The contents of this page can't be loaded. This is either because <kbd>content.json</kbd> isn't a valid JSON file, or you're trying to run this site locally. For this site to run, you need to be running it on a web server.<br><br>If you own this page, try running <kbd>content.json</kbd> through a JSON linter, such as <a href="https://jsonlint.com/">this one</a>.<br><br>If you're just visiting this page, you may want to get into contact with the owner to tell them that their page is broken. You can email them <a href="mailto:infiniteaquarius1@gmail.com?subject=infiniteaquarius.me%20is%20down!">here</a>, and make sure to provide a screenshot of this page.</div>`
    await $.getJSON("content.json", function(json) {
        dataJSON = json;
    }).catch((e) => {
        console.log(e)
        document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
        return document.getElementsByTagName("body")[0].innerHTML = didntWorkErrorMessage
    })
    if (dataJSON == undefined) return document.getElementsByTagName("body")[0].innerHTML = didntWorkErrorMessage
    toReplace = document.getElementsByClassName("jsonReplace");

    for (i = 0; i < toReplace.length; i++) {
        try {
            jsonPath = toReplace[i].id.split("-")
            nextThing = dataJSON;
            for (x = 0; x < jsonPath.length; x++) {
                nextThing = nextThing[jsonPath[x]];
            }

            if (nextThing == undefined) {
                console.error(`Could not find data at ${jsonPath.join("/")} in contents.json`)
                toReplace[i].innerHTML = `No data found at ${jsonPath.join("/")}`
                continue;
            }
        } catch {
            console.error(`Could not find data at ${jsonPath.join("/")}.`)
            toReplace[i].innerHTML = `No data found at ${jsonPath.join("/")}`
            continue;
        }

        try {
            if (toReplace[i].nodeName.toLowerCase() == "img") {
                if (nextThing != "") {
                    toReplace[i].src = nextThing;
                }
            } else if (jsonPath[jsonPath.length - 1] == "bg" && jsonPath[jsonPath.length - 1] != "") {
                toReplace[i].style.backgroundColor = nextThing;
            } else if (toReplace[i].nodeName.toLowerCase() == "a") {
                if (nextThing != "") {
                    toReplace[i].href = nextThing
                }
            } else {
                toReplace[i].innerHTML = nextThing;
            }
        } catch {
            console.error(`Could not change the content of ${toReplace[i]}`)
            continue;
        }
    }

    // load news
    newsEntries = dataJSON.news;
    cantGetNewsError = `<div class="centreText">Infinite Aquarius news can't be loaded at the moment.</div>`
    if (newsEntries == undefined || newsEntries.length == 0) {
        for (x = 0; x < document.getElementsByClassName("rwNews").length; x++) {
            document.getElementsByClassName("rwNews")[x].innerHTML = cantGetNewsError;
        }
        return;
    }
    newsCardHTML = []

    for (i = 0; i < newsEntries.length; i++) {
        newsCardHTML.push(generateNewsCard(newsEntries[i], false))
    }
    for (i = 0; i < newsEntries.length; i++) {
        newsCardHTML.push(generateNewsCard(newsEntries[i], true))
    }

    for (x = 0; x < document.getElementsByClassName("rwNews").length; x++) {
        document.getElementsByClassName("rwNews")[x].innerHTML = `<h1 class="d-block d-sm-none centreText" style="margin-bottom: 10px;">News</h1><h1 class="d-none d-sm-block sectionTitle centreText" style="margin-bottom: 10px;">News</h1><div class="card-deck">` + newsCardHTML.join("\n") + "</div>";
    }
}

function generateNewsCard(entry, phone) {
    restriction = "d-none d-sm-block";
    if (phone) restriction = "d-block d-sm-none";
    modalStuff = `data-toggle="modal" data-target="#modal-${entry.title.split(" ").join("-")}"`
    if (phone) modalStuff = ""
    readMore = " Click to read more."
    if (phone) readMore = ""
    mobileExtra = ""
    if (phone) mobileExtra = "-mobile"
    output = `
<div class="card ${restriction}" ${modalStuff}>
    <img src="${entry.image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title${mobileExtra}">${entry.title}</h5>
        <p class="card-text${mobileExtra}">${entry.smallText}${readMore}</p>
    </div>
</div>
`
    imageExtra = ""
    noMargin = ""
    if (entry.hasExpandedImage) {
        imageExtra += `<img class="w-100" src="${entry.expandedImage}">`
        if (entry.hasCaption) {
            imageExtra += `<p style="margin-bottom: 0;">${entry.caption}</p>`
        }
    } else {
        noMargin = `style="margin-bottom: 0px;"`
    }
    size = ""
    if (entry.size != "" && entry.size != undefined) {
        size =  `modal-${entry.size}`
    }
    output += `
<div class="modal fade" id="modal-${entry.title.split(" ").join("-")}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ${size}" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${entry.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p ${noMargin}>${entry.fullText}</p>
                ${imageExtra}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `
    return output;
}