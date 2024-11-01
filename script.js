function toggleLightMode() {
        document.body.classList.toggle("light-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("body > *:not(header):not(#rodapé)");

    elements.forEach(element => element.classList.add("hidden"));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-slide");
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    elements.forEach(element => observer.observe(element));
});

document.querySelectorAll('.projetos > div').forEach((projeto) => {
    projeto.addEventListener('mouseenter', () => {
        projeto.style.transform = 'translateY(-10px)';
        projeto.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });

    projeto.addEventListener('mouseleave', () => {
        projeto.style.transform = 'translateY(0)';
        projeto.style.boxShadow = 'none';
    });
});
