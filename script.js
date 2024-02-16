document.addEventListener('DOMContentLoaded', function () {
    const review1Stars = document.querySelectorAll('#review1-rating .star');
    const review2Stars = document.querySelectorAll('#review2-rating .star');
    const reviewStars = document.querySelectorAll('#review3-rating .star');

    function handleStarClick(stars) {
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Remove 'checked' class from all stars
                stars.forEach((s, i) => {
                    s.classList.remove('checked');
                    // If the clicked star or any star before it, add 'checked' class
                    if (i <= index) {
                        s.classList.add('checked');
                    }
                });
            });
            // Add hover effect
            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });
            // Remove hover effect
            star.addEventListener('mouseout', () => {
                stars.forEach((s, i) => {
                    s.classList.remove('hover');
                });
            });
        });
    }

    // Function to open the edit popup
    function openEditPopup() {
        var editPopup = document.getElementById('editPopup');
        editPopup.style.display = 'block';
    }
    

// Function to close the edit popup
function closeEditPopup() {
    var editPopup = document.getElementById('editPopup');
    editPopup.style.display = 'none';
}

// Function to save changes from the edit popup
function saveChanges() {
    var newUsername = document.getElementById('newUsername').value;
    var newRealname = document.getElementById('newRealname').value;
    var newBio = document.getElementById('newBio').value;

    // Update profile information here (e.g., send data to server)
    
    // Close the popup after saving changes
    closeEditPopup();
}


    // Handle star clicks for each review section
    handleStarClick(review1Stars);
    handleStarClick(review2Stars);
    handleStarClick(review3Stars);

    

});
