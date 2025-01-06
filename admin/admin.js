document.addEventListener('DOMContentLoaded', function() {
    const blogPostForm = document.getElementById('blogPostForm');
    const previewButton = document.getElementById('previewButton');
    const previewSection = document.querySelector('.preview-section');
    const closePreviewButton = document.getElementById('closePreview');
    const publishedPostsSection = document.getElementById('publishedPosts');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark mode initialization
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Preview functionality
    previewButton.addEventListener('click', function() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
        
        const previewContent = `
            <h1>${title}</h1>
            ${tags.length > 0 ? `
            <div class="preview-tags">
                ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ` : ''}
            <div class="preview-content">${content}</div>
        `;
        
        document.getElementById('preview').innerHTML = previewContent;
        previewSection.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closePreviewButton.addEventListener('click', function() {
        previewSection.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Load existing posts
    loadPosts();

    // Handle form submission
    blogPostForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const post = {
            id: Date.now(),
            title: document.getElementById('title').value,
            excerpt: document.getElementById('excerpt').value,
            content: document.getElementById('content').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
            readTime: document.getElementById('readTime').value,
            date: new Date().toISOString(),
        };

        savePost(post);
        blogPostForm.reset();
        document.getElementById('preview').innerHTML = '';
        loadPosts();
    });

    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        posts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        
        publishedPostsSection.innerHTML = posts.map(post => `
            <div class="post-item">
                <div class="post-item-content">
                    <h3>${post.title}</h3>
                    <div class="post-meta">
                        <span class="date">
                            <i class="far fa-calendar-alt"></i>
                            ${new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span class="read-time">
                            <i class="far fa-clock"></i>
                            ${post.readTime} min read
                        </span>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="post-actions">
                    <button onclick="editPost(${post.id})" class="edit-button">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="deletePost(${post.id})" class="delete-button">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }
});

function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('excerpt').value = post.excerpt;
        document.getElementById('content').value = post.content;
        document.getElementById('tags').value = post.tags.join(', ');
        document.getElementById('readTime').value = post.readTime;
        document.getElementById('title').focus();
    }
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        document.getElementById('publishedPosts').innerHTML = '';
        loadPosts();
    }
}
