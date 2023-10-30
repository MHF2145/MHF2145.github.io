document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    if (query) {
        // Define an array of possible file paths
        const filePaths = [
            `pokemons/sinnoh/${query}.html`,
            `pokemons/kanto/${query}.html`,
            `pokemons/johto/${query}.html`,
            `pokemons/hoenn/${query}.html`,
        ];

        // Initialize a variable to track if the file was found
        let fileFound = false;

        // Function to attempt fetching a file
        const tryFetchFile = (filePath) => {
            return fetch(filePath)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("File not found");
                    }
                    return response.text();
                })
                .then((htmlContent) => {
                    const resultContainer = document.getElementById("search-result");
                    resultContainer.innerHTML = htmlContent;
                    fileFound = true; // Mark as found if successful
                })
                .catch((error) => {});
        };

        // Try fetching files from each path until one is found
        Promise.all(filePaths.map(tryFetchFile)).then(() => {
            if (!fileFound) {
                handleNoQuery();
            }
        });
    } else {
        handleNoQuery();
    }
});

function handleNoQuery() {
    const resultContainer = document.getElementById("search-result");
    resultContainer.textContent = "Please enter a search query.";
}
