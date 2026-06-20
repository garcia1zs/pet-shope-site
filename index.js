   
        document.addEventListener("DOMContentLoaded", () => {
            
            /* ==========================================
               1. MENU HAMBÚRGUER E NAVBAR
            ========================================== */
            const btnMobileMenu = document.getElementById('btn-mobile-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const iconMobileMenu = document.getElementById('icon-mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const navbar = document.getElementById('navbar');

            if (btnMobileMenu && mobileMenu) {
                btnMobileMenu.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                    if (mobileMenu.classList.contains('hidden')) {
                        iconMobileMenu.classList.replace('fa-xmark', 'fa-bars');
                    } else {
                        iconMobileMenu.classList.replace('fa-bars', 'fa-xmark');
                    }
                });

                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                        iconMobileMenu.classList.replace('fa-xmark', 'fa-bars');
                    });
                });
            }

            // Otimização de Scroll Listener usando RequestAnimationFrame passivo
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        if (window.scrollY > 50) {
                            navbar.classList.add('shadow-md');
                            navbar.classList.replace('glass', 'bg-white/95');
                        } else {
                            navbar.classList.remove('shadow-md');
                            navbar.classList.replace('bg-white/95', 'glass');
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });

            /* ==========================================
               2. MODAL DE AGENDAMENTO
            ========================================== */
            const modal = document.getElementById("modal-agendamento");
            const modalContent = document.getElementById("modal-content");
            const btnAbrir = document.getElementById("btn-abrir-modal");
            const btnFechar = document.getElementById("btn-fechar-modal");
            const btnCancelar = document.getElementById("btn-cancelar");
            const form = document.getElementById("form-agendamento");
            const numeroWhatsApp = "5511998390134";

            function toggleModal() {
                if (!modal) return;
                const isHidden = modal.classList.contains('pointer-events-none');
                
                if (isHidden) {
                    modal.classList.remove("opacity-0", "pointer-events-none");
                    modalContent.classList.replace("scale-95", "scale-100");
                    document.body.style.overflow = 'hidden';
                } else {
                    modal.classList.add("opacity-0", "pointer-events-none");
                    modalContent.classList.replace("scale-100", "scale-95");
                    document.body.style.overflow = 'auto';
                }
            }

            if(btnAbrir) btnAbrir.addEventListener("click", toggleModal);
            if(btnFechar) btnFechar.addEventListener("click", toggleModal);
            if(btnCancelar) btnCancelar.addEventListener("click", toggleModal);

            modal.addEventListener("click", (e) => {
                if (e.target === modal) toggleModal();
            });

            // Set Min Date
            const dataInput = document.getElementById("data");
            if(dataInput){
                dataInput.setAttribute('min', new Date().toISOString().split('T')[0]);
            }

            if(form) {
                form.addEventListener("submit", (e) => {
                    e.preventDefault();

                    const tutor = document.getElementById("tutor").value;
                    const pet = document.getElementById("pet").value;
                    const telefone = document.getElementById("telefone").value;
                    const tipoPet = document.getElementById("tipo-pet").value;
                    const servico = document.getElementById("servico").value;
                    const rawDate = document.getElementById("data").value.split("-");
                    const dataFormatada = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`;
                    const horario = document.getElementById("horario").value;
                    const observacoes = document.getElementById("observacoes").value;

                    let mensagem = `Olá! Gostaria de agendar um horário para meu pet.\n\n👤 *Tutor:* ${tutor}\n🐶 *Pet:* ${pet}\n📞 *Telefone:* ${telefone}\n🐕 *Tipo:* ${tipoPet}\n✂️ *Serviço:* ${servico}\n📅 *Data:* ${dataFormatada}\n⏰ *Horário:* ${horario}`;
                    if(observacoes.trim() !== "") mensagem += `\n📝 *Obs:* ${observacoes}`;
                    mensagem += `\n\nAguardo confirmação!`;

                    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
                    
                    toggleModal();
                    setTimeout(() => form.reset(), 300);
                });
            }

            /* ==========================================
               3. CARROSSEL OTIMIZADO (PAUSA SE OFF-SCREEN)
            ========================================== */
            const track = document.getElementById("instagram-carousel");
            if(track) {
                const originalHTML = track.innerHTML; // Melhor que innerHTML += innerHTML
                track.insertAdjacentHTML('beforeend', originalHTML);

                let currentPosition = 0;
                let isCarouselVisible = false;
                let animationId;

                // Só anima se o carrossel estiver visível na tela do celular (Poupa Bateria)
                const observer = new IntersectionObserver((entries) => {
                    isCarouselVisible = entries[0].isIntersecting;
                }, { threshold: 0.1 });
                observer.observe(track);

                function animateCarousel() {
                    let lastTime = 0;

        function animateCarousel(timestamp) {

            if (timestamp - lastTime > 25) {

                if (isCarouselVisible) {
                    currentPosition -= 1;

                    if (currentPosition <= -(track.scrollWidth / 2)) {
                        currentPosition = 0;
                    }

                    track.style.transform =
                        `translate3d(${currentPosition}px,0,0)`;
                }

                lastTime = timestamp;
            }

    requestAnimationFrame(animateCarousel);
}
                    animationId = requestAnimationFrame(animateCarousel);
                }
                animationId = requestAnimationFrame(animateCarousel);
            }

            /* ==========================================
               4. GSAP ANIMAÇÕES (CARREGAMENTO PREGUIÇOSO)
            ========================================== */
            // Espera carregar o script do GSAP (já que usamos defer)
            const initGSAP = setInterval(() => {
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    clearInterval(initGSAP);
                    gsap.registerPlugin(ScrollTrigger);
                    
                    gsap.from(".hero-content > *", {
                        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2
                    });

                    gsap.to(".parallax-bg", {
                        yPercent: 30, ease: "none",
                        scrollTrigger: { trigger: ".parallax-bg", start: "top top", end: "bottom top", scrub: true }
                    });

                    document.querySelectorAll(".gs-reveal").forEach((el) => {
                        gsap.from(el, {
                            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
                            y: 40, opacity: 0, duration: 0.4, ease: "power2.out"
                        });
                    });

                    gsap.to(".btn-pulse", { scale: 1.05, duration: 0.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
                }
            }, 100);
        });
