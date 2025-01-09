let reviews = {
    programming: [],
    design: [],
    analytics: [],
    mathematics: [],
    english: [],
    german: []
};

const reviewForm = document.getElementById('reviewForm');
const buttons = document.querySelectorAll('.filter-button');
const starButtons = document.querySelectorAll('.star-button');
const reviewsList = document.getElementById('reviews-list');

// Отправка отзыва
reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value.trim();
    const specialty = document.getElementById('specialty').value;

    const newReview = {
        name,
        rating: Number(rating),
        comment,
        specialty,
    };

    reviews[specialty].push(newReview);
    displayReviews();
    reviewForm.reset();
});

// Отображение отзывов
function displayReviews() {
    const selectedCategory = getSelectedCategory();
    const selectedRating = getSelectedRating();

    reviewsList.innerHTML = '';

    for (let category in reviews) {
        if (selectedCategory === 'all' || selectedCategory === category) {
            reviews[category].forEach(function (review) {
                if (selectedRating === 'all' || review.rating === Number(selectedRating)) {
                    const reviewElement = document.createElement('li');
                    reviewElement.classList.add('review-item');

                    reviewElement.innerHTML = `
                        <strong>${review.name}</strong> - 
                        <span class="star-rating">${'★'.repeat(review.rating)}</span>
                        <p>${review.comment}</p>
                    `;
                    reviewsList.appendChild(reviewElement);
                }
            });
        }
    }
}

// Фильтрация по категории
buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayReviews();
    });
});

// Фильтрация по рейтингу
starButtons.forEach(button => {
    button.addEventListener('click', function () {
        starButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayReviews();
    });
});

function getSelectedCategory() {
    return document.querySelector('.filter-button.active').getAttribute('data-category');
}

function getSelectedRating() {
    return document.querySelector('.star-button.active').getAttribute('data-rating');
}

displayReviews();  // Изначальная отрисовка
