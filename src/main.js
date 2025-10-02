import './style.css'

async function getData() {
    const url = "https://aero-mock-api.vercel.app/"
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error(error.message)
    }
}

function resetAccordion() {
    const items = document.querySelectorAll('.accordion-item')
    items.forEach(item => {
        item.classList.remove('active')
        item.querySelector('button').ariaExpanded = false
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('main')
    
    getData().then(data => {
        app.classList.remove('loading')
        app.querySelector('.overline-title').textContent = data.subtitle
        app.querySelector('.overline-headline').textContent = data.title

        data.items.forEach((item, index) => {
            const itemSection = document.createElement('section')
            itemSection.classList.add('accordion-item')
            if (index === 0) {
                itemSection.classList.add('active')
                app.querySelector('.image-container').innerHTML = `<img src="${item.image}" alt="${item.title}">`
            }
            itemSection.innerHTML = `
                <h3 class="accordion-title">
                    <button type="button"
                        aria-expanded="${index === 0 ? 'true' : 'false'}"
                        class="accordion-trigger instrument-serif-regular"
                        aria-controls="panel-${index}"
                        id="button-${index}">
                            ${item.title}
                            <svg class="accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" fill="transparent"/>
                                <path class="vertical-line" d="M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 12H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    </button>
                </h3>
                <div class="accordion-content" id="panel-${index}" role="region" aria-labelledby="button-${index}">
                    <img src="${item.image}" alt="${item.title}">
                    <p>${item.description}</p>
                </div>
            `
            app.querySelector('#accordion-content').appendChild(itemSection)

            // Accordion functionality
            itemSection.querySelector('button').addEventListener('click', () => {
                resetAccordion()
                itemSection.classList.add('active')
                itemSection.querySelector('button').ariaExpanded = true
                app.querySelector('.image-container img').src = item.image
            })
        })
    })
    
})