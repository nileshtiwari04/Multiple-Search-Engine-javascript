
// Btns Animation script
document.addEventListener("DOMContentLoaded", function() {
    const animatebuttons = document.querySelectorAll(".btn-animation");

    animatebuttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            button.classList.add("animate");
            setTimeout(() => {
                button.classList.remove("animate");
            }, 600);
        });
    });
});

// Generic search function
// Function to perform a search based on the selected engine
function performSearch(query, engine) {
    let url;
    switch (engine) {
        case 'google':
            url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
            break;
        case 'wikipedia':
            url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${encodeURIComponent(query)}`;
            break;
        case 'duckduckgo':
            url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
            break;
        case 'bing':
            url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'yahoo':
            url = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
            break;
        default:
            alert('Invalid search engine');
            return;
    }
    // Open the search results in a new tab/window
    window.open(url, '_blank');
}

// Event listeners for new buttons
document.querySelector('.duckduckgo-search-btn').addEventListener('click', function() {
    const query = document.querySelector('input[type="search"]').value;
    performSearch(query, 'duckduckgo');
});

document.querySelector('.bing-search-btn').addEventListener('click', function() {
    const query = document.querySelector('input[type="search"]').value;
    performSearch(query, 'bing');
});

document.querySelector('.yahoo-search-btn').addEventListener('click', function() {
    const query = document.querySelector('input[type="search"]').value;
    performSearch(query, 'yahoo');
});

// Event listeners for new buttons
document.querySelector('.duckduckgo-search-btn').addEventListener('click', function() {
    const query = document.querySelector('input[type="search"]').value;
    performSearch(query, 'duckduckgo');
});


// -----------------  Dark mode -----------------------
//theme button

const themeBtn = document.querySelector('.theam');

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeBtn.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
});

// ---------------------------------------------
//  voice to text 


function startSpeechRecognition() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US'; // language English (United States)

    // start speech
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        
        document.querySelector('input[type="search"]').value = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
}


document.querySelector('input[type="search"]').addEventListener('click', function(event) {
    const micIconClicked = event.clientX > this.offsetWidth - 30;

    if (micIconClicked) {
        startSpeechRecognition();
    }
});
