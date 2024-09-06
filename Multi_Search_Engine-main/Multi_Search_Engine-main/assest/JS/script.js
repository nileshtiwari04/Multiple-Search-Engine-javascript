
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
