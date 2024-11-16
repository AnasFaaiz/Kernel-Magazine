
function goToPage() {
    // Specify the URL of the new HTML page
    window.location.href = "pages/Flipbook-view.html";
}
function goToWeb() {
    // Specify the URL of the new HTML page
    window.location.href = "../magazine-new-design.html";
}

const sortButton = document.getElementById('sortButton');

let sortBy = 'latest'; // initial sort order

sortButton.addEventListener('click', function() {
    if (sortBy === 'latest') {
        sortButton.textContent = 'Oldest';
        sortBy = 'oldest';
    } else {
        sortButton.textContent = 'Latest';
        sortBy = 'latest';
    }
});
