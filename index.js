 gsap.registerPlugin(ScrollTrigger);

        // Animação da Hero Section na entrada
        gsap.from(".hero-content > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Efeito Parallax no fundo da Hero
        gsap.to(".parallax-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".parallax-bg",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Animar elementos revelando no scroll
        const revealElements = document.querySelectorAll(".gs-reveal");
        revealElements.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Botão pulsando (CTA / WhatsApp)
        gsap.to(".btn-pulse", {
            scale: 1.05,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Navbar Glass Effect no Scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('glass', 'bg-white/95');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('bg-white/95', 'glass');
            }
        });

        //carrosel de imagens 
        document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("instagram-carousel");

    // Duplica as imagens
    track.innerHTML += track.innerHTML;

    let currentPosition = 0;
    const speed = 1;

    function animate() {

        currentPosition -= speed;

        if (currentPosition <= -(track.scrollWidth / 2)) {
            currentPosition = 0;
        }

        track.style.transform = `translateX(${currentPosition}px)`;

        requestAnimationFrame(animate);
    }

    animate();
});



document.addEventListener("DOMContentLoaded", function() {
    
    const modal = document.getElementById("modal-agendamento");
    const modalContent = document.getElementById("modal-content");
    const btnAbrir = document.getElementById("btn-abrir-modal");
    const btnFechar = document.getElementById("btn-fechar-modal");
    const btnCancelar = document.getElementById("btn-cancelar");
    const form = document.getElementById("form-agendamento");

    // Número do WhatsApp da Loja
    const numeroWhatsApp = "5511998390134";

    // Função para abrir o modal
    function abrirModal() {
        modal.classList.remove("opacity-0", "pointer-events-none");
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
        }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.add("opacity-0", "pointer-events-none");
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
    }

    // Event Listeners de Abertura e Fechamento
    if (btnAbrir) {
    btnAbrir.addEventListener("click", function(e) {
        e.preventDefault();
        abrirModal();
    });
}
    btnFechar.addEventListener("click", fecharModal);
    btnCancelar.addEventListener("click", fecharModal);

    // Fechar ao clicar fora do modal (no backdrop escuro)
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Submissão do Formulário
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita recarregar a página

        // Coleta dos dados
        const tutor = document.getElementById("tutor").value;
        const pet = document.getElementById("pet").value;
        const telefone = document.getElementById("telefone").value;
        const tipoPet = document.getElementById("tipo-pet").value;
        const servico = document.getElementById("servico").value;
        
        // Formatar data de AAAA-MM-DD para DD/MM/AAAA
        const rawDate = document.getElementById("data").value;
        const splitDate = rawDate.split("-");
        const dataFormatada = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
        
        const horario = document.getElementById("horario").value;
        const observacoes = document.getElementById("observacoes").value;

        // Construção da Mensagem
        let mensagem = `Olá! Gostaria de agendar um horário para meu pet.\n\n`;
        mensagem += `👤 *Tutor:* ${tutor}\n`;
        mensagem += `🐶 *Pet:* ${pet}\n`;
        mensagem += `📞 *Telefone:* ${telefone}\n`;
        mensagem += `🐕 *Tipo de Pet:* ${tipoPet}\n`;
        mensagem += `✂️ *Serviço:* ${servico}\n`;
        mensagem += `📅 *Data:* ${dataFormatada}\n`;
        mensagem += `⏰ *Horário:* ${horario}\n`;
        
        if(observacoes.trim() !== "") {
            mensagem += `📝 *Observações:* ${observacoes}\n`;
        }

        mensagem += `\nAguardo confirmação. Obrigado!`;

        // Codificação para URL
        const mensagemCodificada = encodeURIComponent(mensagem);

        // URL do WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        // Abre em uma nova aba
        window.open(urlWhatsApp, "_blank");

        // Opcional: Fecha o modal e reseta o formulário após enviar
        fecharModal();
        setTimeout(() => form.reset(), 300); // Aguarda a animação de fechar para limpar
    });

    // Formatação de data mínima para o input de data (não permitir dias passados)
    const dataInput = document.getElementById("data");
    const today = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', today);
});
document.addEventListener("DOMContentLoaded", () => {});
    
    // ==========================================
    // 1. MENU HAMBÚRGUER (MOBILE)
    // ==========================================
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMobileMenu = document.getElementById('icon-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (btnMobileMenu && mobileMenu) {
        // Abrir/Fechar ao clicar no botão hambúrguer
        btnMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Troca o ícone de Barras para X
            if (mobileMenu.classList.contains('hidden')) {
                iconMobileMenu.classList.remove('fa-xmark');
                iconMobileMenu.classList.add('fa-bars');
            } else {
                iconMobileMenu.classList.remove('fa-bars');
                iconMobileMenu.classList.add('fa-xmark');
            }
        });

        // Fechar o menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconMobileMenu.classList.remove('fa-xmark');
                iconMobileMenu.classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // 2. MODAL DE AGENDAMENTO
    // ==========================================
    const btnAbrirModal = document.getElementById('btn-abrir-modal');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnCancelar = document.getElementById('btn-cancelar');
    const modalAgendamento = document.getElementById('modal-agendamento');
    const formAgendamento = document.getElementById('form-agendamento');

    function toggleModal() {
        if (!modalAgendamento) return;
        
        // Verifica se está escondido (possui pointer-events-none)
        if (modalAgendamento.classList.contains('pointer-events-none')) {
            modalAgendamento.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden'; // Impede o scroll do fundo
        } else {
            modalAgendamento.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'auto'; // Restaura o scroll
        }
    }

    if(btnAbrirModal) btnAbrirModal.addEventListener('click', toggleModal);
    if(btnFecharModal) btnFecharModal.addEventListener('click', toggleModal);
    if(btnCancelar) btnCancelar.addEventListener('click', toggleModal);

    // Envio do formulário do Modal para o WhatsApp
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Pega os valores
            const tutor = document.getElementById('tutor').value;
            const pet = document.getElementById('pet').value;
            const servico = document.getElementById('servico').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            
            // Monta a mensagem
            const mensagem = `Olá, meu nome é ${tutor}. Gostaria de agendar um ${servico} para o meu pet ${pet} no dia ${data} às ${horario}.`;
            
            // Troque esse número pelo WhatsApp da loja (exemplo: 5511999999999)
            const numeroWhatsapp = '5511999999999';
            const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
            
            window.open(url, '_blank');
            toggleModal(); // Fecha o modal após enviar
            formAgendamento.reset(); // Limpa o formulário
        });
    }

    // ==========================================
    // 3. ANIMAÇÕES SCROLL (GSAP)
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const revealElements = document.querySelectorAll(".gs-reveal");
        revealElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 50 }, 
                { 
                    duration: 0.8, 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%", // Inicia quando o topo do elemento atinge 85% da tela
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    };