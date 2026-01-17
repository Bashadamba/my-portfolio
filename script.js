document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference, if any, on page load
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('Is dark mode saved preference:', isDarkMode);

    // Set initial mode
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save user preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        console.log('Dark mode is now:', isDarkMode);

        // Update button text
        darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });

    // Journal Modal Functionality
    const journalLink = document.getElementById('journalLink');
    const journalModal = document.getElementById('journalModal');
    const journalClose = document.querySelector('.journal-close');

    if (journalLink && journalModal) {
        journalLink.addEventListener('click', (e) => {
            e.preventDefault();
            journalModal.style.display = 'block';
            setTimeout(() => {
                journalModal.classList.add('show');
            }, 10);
        });

        journalClose.addEventListener('click', () => {
            closeJournalModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === journalModal) {
                closeJournalModal();
            }
        });
    }

    function closeJournalModal() {
        journalModal.classList.remove('show');
        setTimeout(() => {
            journalModal.style.display = 'none';
        }, 300);
    }
});
