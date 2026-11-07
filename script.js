/**
 * ============================================================================
 * ÉLORA — L'ÉLÉGANCE AU QUOTIDIEN
 * Boutique de Prêt-à-Porter & Accessoires à Abidjan, Côte d'Ivoire
 * JavaScript Vanilla Interactif & Fonctionnalités Modernes
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ------------------------------------------------------------------------
    // CONSTANTES ET CONFIGURATION
    // ------------------------------------------------------------------------
    const WHATSAPP_PHONE = '2250101395018'; // +225 01 01 39 50 18

    // Données des produits pour la vue rapide (Quick View) et la commande personnalisée
    const PRODUCTS_DATA = {
        '1': {
            id: '1',
            title: 'Ensemble chic femme',
            category: 'Collection Femme',
            price: '25 000 FCFA',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
            description: 'Ensemble deux pièces coordonné d’une élégance rare, confectionné dans une étoffe soyeuse et respirante adaptée au climat d’Abidjan. Coupe tailleur moderne, finitions raffinées et silhouette cintrée.',
            sizes: ['S', 'M', 'L', 'XL']
        },
        '2': {
            id: '2',
            title: 'Chemise oversize',
            category: 'Collection Homme',
            price: '15 000 FCFA',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
            description: 'Tissage lin et coton aéré d’une douceur incomparable. Col chemise décontracté et coupe ample oversize pour une prestance décontractée et résolument sophistiquée.',
            sizes: ['M', 'L', 'XL', 'XXL']
        },
        '3': {
            id: '3',
            title: 'Robe élégante',
            category: 'Collection Femme',
            price: '22 000 FCFA',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80',
            description: 'Robe midi à la coupe sculpturale dans les nuances terre cuite et beige chaud. Décolleté subtil, ceinture amovible et tombé fluide d’une grâce absolue.',
            sizes: ['S', 'M', 'L']
        },
        '4': {
            id: '4',
            title: 'Ensemble casual homme',
            category: 'Collection Homme',
            price: '28 000 FCFA',
            image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80',
            description: 'Duo pantalon fluide chino et surchemise ton sur ton. Allure décontractée mais résolument haut de gamme pour les sorties en ville, rendez-vous ou soirées branchées.',
            sizes: ['M', 'L', 'XL']
        },
        '5': {
            id: '5',
            title: 'Sac à main',
            category: 'Accessoires',
            price: '18 000 FCFA',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
            description: 'Maroquinerie d’exception en cuir souple marron noisette. Bijouterie dorée inaltérable, double poignée et bandoulière amovible. L’accessoire signature par excellence.',
            sizes: ['Taille Unique']
        },
        '6': {
            id: '6',
            title: 'Sneakers tendance',
            category: 'Chaussures & Accessoires',
            price: '30 000 FCFA',
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
            description: 'Sneakers épurées en cuir blanc cassé et empiècements beige sable. Semelle ergonomique amortissante pour allier démarche assurée et confort souverain tout au long de la journée.',
            sizes: ['39', '40', '41', '42', '43', '44']
        }
    };

    // ------------------------------------------------------------------------
    // 1. GESTION DU HEADER STICKY & SCROLL EFFECT
    // ------------------------------------------------------------------------
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleWindowScroll = () => {
        const scrollPosition = window.scrollY;

        // Transformation du header lors du scroll
        if (scrollPosition > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Affichage du bouton retour en haut
        if (scrollPosition > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // Clic sur le bouton retour en haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------------------------------------
    // 2. MENU HAMBURGER MOBILE & DRAWER
    // ------------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-shop-btn');

    const openMobileMenu = () => {
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        menuOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement arrière-plan
    };

    const closeMobileMenu = () => {
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        menuOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Fermer le drawer au clic sur n'importe quel lien mobile
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Fermer au clavier avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileDrawer.classList.contains('open')) {
                closeMobileMenu();
            }
            closeQuickViewModal();
        }
    });

    // ------------------------------------------------------------------------
    // 3. NAVIGATION LIENS ACTIFS AU SCROLL (SCROLLSPY) & SMOOTH SCROLL
    // ------------------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    const updateActiveNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

    // Smooth scroll avec prise en compte du header fixe
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------------
    // 4. ANIMATIONS D'APPARITION AU SCROLL (Intersection Observer)
    // ------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback si IntersectionObserver n'est pas supporté
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // ------------------------------------------------------------------------
    // 5. FILTRAGE DYNAMIQUE DES PRODUITS PAR CATÉGORIE
    // ------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    const filterProducts = (filterValue) => {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');
            filterProducts(filterValue);
        });
    });

    // Navigation depuis les boutons "Explorer" de la section Collections
    document.querySelectorAll('.btn-collection').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoryToFilter = btn.getAttribute('data-filter');
            if (categoryToFilter) {
                const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${categoryToFilter}"]`);
                if (targetFilterBtn) {
                    targetFilterBtn.click();
                }
            }
        });
    });

    // ------------------------------------------------------------------------
    // 6. MODAL QUICK VIEW (Aperçu Rapide du Produit)
    // ------------------------------------------------------------------------
    const quickViewModal = document.getElementById('quick-view-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalImg = document.getElementById('modal-product-img');
    const modalCat = document.getElementById('modal-product-cat');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-desc');
    const modalOrderBtn = document.getElementById('modal-order-btn');
    const sizePillsContainer = document.querySelector('.size-pills');

    let currentSelectedProduct = null;
    let currentSelectedSize = 'M';

    const updateModalWhatsAppLink = () => {
        if (!currentSelectedProduct) return;
        const msg = `Bonjour ÉLORA, je souhaite commander l'article : ${currentSelectedProduct.title} (${currentSelectedProduct.price}) en taille ${currentSelectedSize}. Pouvez-vous me confirmer la disponibilité et la livraison à Abidjan ?`;
        const encodedUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        modalOrderBtn.setAttribute('href', encodedUrl);
    };

    const openQuickViewModal = (productId) => {
        const product = PRODUCTS_DATA[productId];
        if (!product) return;

        currentSelectedProduct = product;
        currentSelectedSize = product.sizes[0] || 'Standard';

        modalImg.src = product.image;
        modalImg.alt = product.title;
        modalCat.textContent = product.category;
        modalTitle.textContent = product.title;
        modalPrice.textContent = product.price;
        modalDesc.textContent = product.description;

        // Génération des boutons de taille
        sizePillsContainer.innerHTML = '';
        product.sizes.forEach((size, index) => {
            const sizeBtn = document.createElement('button');
            sizeBtn.type = 'button';
            sizeBtn.className = `size-pill ${index === 0 ? 'active' : ''}`;
            sizeBtn.textContent = size;
            sizeBtn.setAttribute('data-size', size);
            sizeBtn.addEventListener('click', () => {
                document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
                sizeBtn.classList.add('active');
                currentSelectedSize = size;
                updateModalWhatsAppLink();
            });
            sizePillsContainer.appendChild(sizeBtn);
        });

        updateModalWhatsAppLink();

        quickViewModal.classList.add('open');
        quickViewModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeQuickViewModal = () => {
        if (!quickViewModal) return;
        quickViewModal.classList.remove('open');
        quickViewModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Écouteur pour tous les boutons d'aperçu rapide
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            openQuickViewModal(id);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeQuickViewModal);
    }

    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                closeQuickViewModal();
            }
        });
    }

    // ------------------------------------------------------------------------
    // 7. SYSTÈME DE NOTIFICATION TOAST
    // ------------------------------------------------------------------------
    const toast = document.getElementById('toast-notification');

    const showToast = (message, duration = 4000) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, duration);
    };

    // ------------------------------------------------------------------------
    // 8. FORMULAIRE NEWSLETTER VIP & FEEDBACK TOAST
    // ------------------------------------------------------------------------
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = newsletterEmail.value.trim();
            if (val) {
                showToast(`✦ Bienvenue au Cercle ÉLORA ! Vous recevrez nos nouveaux arrivages en exclusivité.`);
                newsletterEmail.value = '';
            }
        });
    }

    // ------------------------------------------------------------------------
    // 9. FEEDBACK CLIC SUR BOUTON DE COMMANDE WHATSAPP
    // ------------------------------------------------------------------------
    document.querySelectorAll('.whatsapp-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            showToast(`Redirection vers WhatsApp pour commander : ${productName}...`);
        });
    });

    console.log('ÉLORA Abidjan — Site vitrine initialisé avec succès.');
});

