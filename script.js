//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById("output");
    const btn = document.getElementById("download-images-button");

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" },
    ];

    // Function to download an image and return a promise
    function downloadImage(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
            img.src = image.url;
        });
    }

    // Event listener for the button click
    btn.addEventListener('click', () => {
        // Create an array of promises
        const downloadPromises = images.map(img => downloadImage(img));

        // Add a row indicating loading state
        output.innerHTML = '<p>Loading...</p>';

        // Use Promise.all to download all images in parallel
        Promise.all(downloadPromises)
            .then(images => {
                // Clear previous content
                output.innerHTML = '';

                // Append each image to the output div
                images.forEach(img => {
                    output.appendChild(img);
                });
            })
            .catch(error => {
                console.error(error);
                // Optionally, you can display an error message in the output div
                output.innerHTML = `<p>${error}</p>`;
            });
    });
});