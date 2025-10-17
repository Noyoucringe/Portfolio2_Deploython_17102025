// Mobile menu toggle
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggleBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Smooth scroll + close menu on click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
    }
  });
});

// Active link on scroll
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];
function setActiveLink() {
  const pos = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach(s => {
    if (pos >= s.offsetTop) current = s.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Tabs (About)
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // panels
    const id = tab.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p => {
      const show = p.id === id;
      p.toggleAttribute('hidden', !show);
      p.classList.toggle('show', show);
    });
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// See more (append simple project placeholders)
document.getElementById('seeMore')?.addEventListener('click', () => {
  const grid = document.querySelector('.projects');
  if (!grid) return;
  for (let i = 0; i < 3; i++) {
    const art = document.createElement('article');
    art.className = 'project card';
    art.innerHTML = `
      <div class="thumb">
        <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=900&auto=format&fit=crop" alt="Extra project">
        <div class="overlay">
          <h3>Extra Project</h3>
          <p>More work samples.</p>
          <a class="project-link" href="#" target="_blank" rel="noopener">Open</a>
        </div>
      </div>`;
    grid.appendChild(art);
  }
});

// Contact form submit (Formspree)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.textContent = 'Sending...';
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn?.setAttribute('disabled', '');

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      formMsg.textContent = 'Thanks! I will reply soon.';
      form.reset();
    } else {
      formMsg.textContent = 'Sorry, something went wrong. Please try again.';
    }
  } catch (err) {
    formMsg.textContent = 'Network error. Please check your connection.';
  } finally {
    submitBtn?.removeAttribute('disabled');
  }
});

// Download CV buttons
function downloadCVHandler(e){
  const file = e.currentTarget.dataset.cv || 'cv.pdf';
  const a = document.createElement('a');
  a.href = file;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
document.getElementById('downloadCV')?.addEventListener('click', downloadCVHandler);
document.getElementById('downloadCV2')?.addEventListener('click', downloadCVHandler);