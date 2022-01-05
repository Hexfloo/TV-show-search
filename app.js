const url = axios.defaults.baseURL = "https://api.tvmaze.com/search/shows";

const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    clearRecent();
    let searchInput = form.elements[0].value;
    let myQuery = await axios.get(url, { params: { q: searchInput } });
    console.log(myQuery) //for testing
    postImg(myQuery.data);
    form.elements[0].value = "";
})

function postImg(showsArray) {
    for (let shw of showsArray) {
        if (shw.show.image != null) {
            let newImgContainer = document.createElement("a");
            let newImg = document.createElement("img");
            newImgContainer.append(newImg);
            newImg.src = shw.show.image.medium;
            newImg.classList.add("p-0");
            newImg.classList.add("rounded-3");
            newImg.classList.add("m-1");
            newImgContainer.href = shw.show.url;
            newImgContainer.target = "_blank";
            document.body.append(newImgContainer);
        };
    };
}

function clearRecent() {
    //clear all appended images from the body when new search is submitted:
    let recentImgs = document.querySelectorAll("img");
    for (img of recentImgs) {
        img.remove();
    };
}
