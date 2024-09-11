const blogPosts = {
    post1: {
        title: "My Game of Thrones Rewatch : Thoughts",
        content: `I just finished my rewatch, and my opinion hasn't changed—it was a disappointing final season. There were some excellent moments, but it ultimately failed to deliver what it should have.

        My biggest issue with the plot is how rushed it felt. Daenerys' descent into madness could have been a brilliant way to end the show if they had just taken the time to develop it properly.

        Bran as the Lord of the Seven Kingdoms? That was the worst possible decision. I'm not sure if George R.R. Martin approved that particular plot point, but I hated it. Bran went from not wanting to be the Lord of Winterfell and even denying that he was still Brandon Stark to becoming the ruler of the Seven Kingdoms? That's just absurd.

        Jon killing Daenerys and getting away with it... I didn't like how that played out either. It would have made more sense if there had been a standoff between the Unsullied and the Northmen, rather than them just letting him go because he was being sent to the Wall. The Unsullied aren't Westerosi; their entire arc was about following Daenerys, not caring about the Iron Throne. So it made no sense that they would simply leave Jon because "he's going to the Wall."

        I hated Tyrion's final arc as well.

        And what happened to Jon's heritage as a Targaryen and Stark? I could understand if he wasn't the prince who was promised, and if that was meant to be Daenerys. But why did Arya have to be the one to kill the Night King? It would have been perfect if Jon or even Daenerys had faced off with the Night King. I didn't like Arya's role there, and I wasn't satisfied with how Arya and Sansa were portrayed in those last two seasons. I get that they were acting for their family, but it didn't resonate with me.

        As for the upcoming Jon Snow spinoff, I'm not sure what to expect. If it's going to focus on him and the wildlings in the North (which seems likely), I'm not sure what could make it interesting enough for me to watch. And I'm a huge Jon Snow/Daenerys fan, so that's saying something.

        Oh, and that scene with Drogon burning the Iron Throne? Let's be serious.

        Despite all this, I'm still a huge fan of this world and its story. I just hope George R.R. Martin finishes the books—I really do.`,
        date: "August 15, 2024",
        author: "Basha Damba"
    },
    
    post2: {
        title: "Blog Post Title 2",
        content: "This is the full content of blog post 2. You can add your actual blog post content here.",
        date: "2023 — 2024",
        author: "Basha Damba"
    }
};

function showPost(postId) {
    const postModal = document.getElementById("postModal");
    const postContent = document.getElementById("postContent");
    const post = blogPosts[postId];
    
    if (post) {
        postContent.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <div class="post-meta">
                <span class="author-icon"><i class="fas fa-user"></i></span>
                <span class="author">${post.author}</span>
                <span class="date">${post.date}</span>
            </div>
            <p>${post.content}</p>
        `;
        postModal.style.display = "block";
        setTimeout(() => {
            postModal.classList.add("show");
        }, 10);
    }
}

// Close the modal when the user clicks on the close button
const closeModalButton = document.querySelector(".close");
closeModalButton.onclick = function() {
    closeModal();
};

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const postModal = document.getElementById("postModal");
    if (event.target === postModal) {
        closeModal();
    }
};

function closeModal() {
    const postModal = document.getElementById("postModal");
    postModal.classList.remove("show");
    setTimeout(() => {
        postModal.style.display = "none";
    }, 300);
}