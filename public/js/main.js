const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".grid-item");
hiddenElements.forEach((el) => {
	el.style.opacity = "0";
	el.style.transition = "all 1s";
	observer.observe(el);
});

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const val = card.getAttribute('data-product');
			
        const checkbox = document.querySelector(`input[name="interes"][value="${val}"]`);
        
        if (checkbox) {
            checkbox.checked = !checkbox.checked; //  Activa/desactiva al hacer clic
            
            // Efecto visual: si está marcado, resaltamos el borde de la tarjeta
					card.classList.toggle("selected", checkbox.checked);
        }
    });
});

document.querySelector('form').addEventListener('submit', (e) => {
    const seleccionados = document.querySelectorAll('input[name="interes"]:checked');
    if (seleccionados.length === 0) {
        e.preventDefault();
        alert("Por favor, selecciona al menos un material para tu cotización.");
    }
});
