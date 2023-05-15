
const newsCardArray = Array.from(document.getElementsByClassName('newsCard'))
const articleTitle = document.getElementById('article-title');
const articleDate = document.getElementById('article-date');
const articleDescription = document.getElementById('article-description');

newsCardArray.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();

        const elements = Array.from(event.currentTarget.querySelectorAll('.newsTitle, .newsDate, .newsArticle'));
        const contents = elements.map(element => element.innerHTML);

        articleTitle.innerHTML = contents[0]
        articleDate.innerHTML = contents[1]
        articleDescription.innerHTML = contents[2]

        document.getElementById('news-list').style.display = 'none';
        document.getElementById('pagination').style.display = 'none';
        document.getElementById('article-page').style.display = 'block';

        contents = []
    });
})

const backHome = document.getElementById('backHome');
backHome.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('news-list').style.display = 'block';
    document.getElementById('pagination').style.display = 'block';
    document.getElementById('article-page').style.display = 'none';
})

let currentPage = 1;
const newsPerPage = 10;
const newsList = document.getElementById('news-list');
const pagination = document.getElementById('pagination');

function updateEntries() {
    const newsCardArray = Array.from(newsList.getElementsByClassName("newsCard"));
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    newsCardArray.forEach((entry, index) => {
        if (index >= startIndex && index < endIndex) {
            // entry.getElementsByClassName('newsDesc')[0].textContent = truncateText(entry.getElementsByClassName('newsArticle')[0].textContent, 10)
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
}

function updatePagination() {
    const newsCardArray = Array.from(newsList.getElementsByClassName("newsCard"));
    const totalPages = Math.ceil(newsCardArray.length / newsPerPage);
    pagination.innerHTML = '';

    if (totalPages != 1) {
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', () => {
                currentPage = i;
                updateEntries();
                updatePagination();
            });
    
            if (i === currentPage) {
                link.classList.add('active');
            }
    
            pagination.appendChild(link);
        }
    }
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

updateEntries();
updatePagination();