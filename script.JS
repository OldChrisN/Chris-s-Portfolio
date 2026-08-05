const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

// 1. Gather all images that are NOT inside a link
const images = Array.from(document.querySelectorAll('img')).filter(img => !img.closest('a'))
let currentIndex = 0

// Function to update the lightbox image, arrows, and close button
function showImage(index) {
    currentIndex = index
    const img = document.createElement('img')
    img.src = images[currentIndex].src
    
    // Clear out old content
    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild)
    }
    
    // Re-append the image
    lightbox.appendChild(img)

    // Create and append the "X" Close Button
    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = '&times;'
    closeBtn.className = 'lightbox-arrow close-btn'
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        lightbox.classList.remove('active')
    })
    lightbox.appendChild(closeBtn)

    // Create and append Left Arrow
    const prevBtn = document.createElement('button')
    prevBtn.innerHTML = '&#10094;'
    prevBtn.className = 'lightbox-arrow prev-btn'
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        const newIndex = (currentIndex - 1 + images.length) % images.length
        showImage(newIndex)
    })
    lightbox.appendChild(prevBtn)

    // Create and append Right Arrow
    const nextBtn = document.createElement('button')
    nextBtn.innerHTML = '&#10095;'
    nextBtn.className = 'lightbox-arrow next-btn'
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        const newIndex = (currentIndex + 1) % images.length
        showImage(newIndex)
    })
    lightbox.appendChild(nextBtn)
}

// 2. Listen for clicks on valid images to open lightbox
images.forEach((image, index) => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active')
        showImage(index)
    })
})

// 3. Close when clicking the dark background
lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})